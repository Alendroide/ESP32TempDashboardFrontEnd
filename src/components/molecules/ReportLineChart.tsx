import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ReportLineChart({ samples, label, type }: any) {

    const labels = samples.map((s: any) =>
        new Date(s.createdAt).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
        })
    );

    const dataPoints = samples.map((s: any) => type === 'temp' ? s.degrees : s.airQuality);

    const data = {
        labels,
        datasets: [
            {
                label: label,
                data: dataPoints,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
            },
        ],
    };

    return (
        <Line data={data} />
    )
}