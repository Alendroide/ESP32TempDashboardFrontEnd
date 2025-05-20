import DefaultLayout from "@/layouts/DefaultLayout";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import {format} from 'date-fns';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import 'chartjs-adapter-date-fns';
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend
);

export default function IndexPage() {
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [], // timestamps
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  // Usamos ref para no perder los datos anteriores
  const dataRef = useRef<{ labels: string[]; data: number[] }>({ labels: [], data: [] });

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);

    socket.on("new-temperature", (data : {degrees : number, createdAt : string}) => {
      setCurrentTemperature(data.degrees);

      // Agregar nueva entrada
      dataRef.current.labels.push(data.createdAt);
      dataRef.current.data.push(data.degrees);

      // Limitar a los últimos 20 puntos (opcional)
      if (dataRef.current.labels.length > 20) {
        dataRef.current.labels.shift();
        dataRef.current.data.shift();
      }

      setChartData({
        labels: [...dataRef.current.labels],
        datasets: [
          {
            label: "Temperatura (°C)",
            data: [...dataRef.current.data],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'HH:mm:ss',
          unit: 'second',
          displayFormats: {
            second: "ss"
          }
        },
        ticks: {
          callback: (value) => {
            const date = new Date(Number(value));
            return format(date, 'ss') + ' seg.';
          }
        },
        title: {
          display: true,
          text: 'Hora',
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: '°C',
        },
      },
    },
  };

  return (
    <DefaultLayout>
      <div className="flex h-full">

        <div className="w-7/12 h-96 bg-white p-3 rounded-3xl shadow-xl flex justify-center">
          <Line data={chartData} options={options} />
        </div>

        <div className="w-5/12 box-border p-6 ms-3">
          <div className="bg-white inline-block p-6 rounded-3xl shadow-xl">
            <h1 className="text-3xl">Temperatura:</h1>
            <p className="text-6xl font-bold">{currentTemperature}°C</p>
          </div>
        </div>

      </div>
    </DefaultLayout>
  );
}
