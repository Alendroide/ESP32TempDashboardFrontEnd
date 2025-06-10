import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import 'chartjs-adapter-date-fns';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend
);

export default function TempChart({data} : {data : any}){
    return(
        <Line data={data} options={{
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
          maxTicksLimit: 5,
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
  }}/>
    )
}