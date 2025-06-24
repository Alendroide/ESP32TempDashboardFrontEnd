import { useEffect, useState, useRef } from "react";
import mqtt from "mqtt";
import { ChartData } from "chart.js";
import { axiosAPI } from "@/api/axiosAPI";
import { useQuery } from "@tanstack/react-query";

export default function useCO() {

  const [currentCO, setCurrentCO] = useState(0);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [], // timestamps
    datasets: [
      {
        label: "CO2 (ppm)",
        data: [],
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        tension: 0.1,
      },
    ],
  });

  const dataRef = useRef<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");

    client.on("connect", () => {
      console.log("✅ Conectado a MQTT");
      client.subscribe("pepe/esp32/aire");
    });

    client.on("message", (topic, message) => {
      try {
        console.log(topic);
        const payload = JSON.parse(message.toString());

        const co = payload.airQuality;
        const createdAt = new Date().toISOString();

        setCurrentCO(co);

        dataRef.current.labels.push(createdAt);
        dataRef.current.data.push(co);

        if (dataRef.current.labels.length > 10) {
          dataRef.current.labels.shift();
          dataRef.current.data.shift();
        }

        setChartData({
          labels: [...dataRef.current.labels],
          datasets: [
            {
              label: "CO2 (ppm)",
              data: [...dataRef.current.data],
              fill: false,
              borderColor: "rgb(255, 0, 0)",
              tension: 0.1,
            },
          ],
        });
      } catch (err) {
        console.error("❌ Error al procesar mensaje MQTT", err);
      }
    });

    return () => {
      client.end();
    };
  }, []);

    const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function getAllGases() {
    try{
      const response = await axiosAPI.get(`air/?page=${page}`);
      setTotalPages(response.data.pagination.totalPages);
      return response.data.data;
    }
    catch(error){
      console.log(error);
    }
  }

  const {data: allGases, isLoading, isError, error} = useQuery({
    queryKey: ['allGases', page],
    queryFn: getAllGases
  })

  return {chartData, currentCO, allGases, isLoading, isError, error, setPage, totalPages, setTotalPages, page};
}
