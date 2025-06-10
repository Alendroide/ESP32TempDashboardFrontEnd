import { useEffect, useState, useRef } from "react";
import mqtt from "mqtt";
import { ChartData } from "chart.js";

export default function useTemp() {

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

  const dataRef = useRef<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");

    client.on("connect", () => {
      console.log("✅ Conectado a MQTT");
      client.subscribe("pepe/esp32/temperatura");
    });

    client.on("message", (topic, message) => {
      try {
        console.log(topic);
        const payload = JSON.parse(message.toString());

        const degrees = payload.degrees;
        const createdAt = new Date().toISOString();

        setCurrentTemperature(degrees);

        dataRef.current.labels.push(createdAt);
        dataRef.current.data.push(degrees);

        if (dataRef.current.labels.length > 10) {
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
      } catch (err) {
        console.error("❌ Error al procesar mensaje MQTT", err);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return {chartData, currentTemperature};
}
