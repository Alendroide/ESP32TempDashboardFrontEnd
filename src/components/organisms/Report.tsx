import { format } from "date-fns";
import { es } from "date-fns/locale";
import { forwardRef } from "react";

interface ReportCardProps {
  temperature: {
    average: number;
    min: number;
    max: number;
  },
  air: {
    average: number;
    min: number;
    max: number;
  }
  from: string; // ISO string
  to: string;   // ISO string
}



const Report = forwardRef<HTMLDivElement, ReportCardProps>(({ temperature, air, from, to }, ref) => {
  
  const formatDate = (iso: string) => format(new Date(iso), "d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <div
      ref={ref}
      className="relative p-6 h-[700px] w-[987px] mx-auto bg-white rounded-2xl shadow-lg space-y-6 flex justify-center my-6"
    >
      <div className="absolute top-6 left-6 flex gap-2 items-center">
        <img src="/icon.png" alt="icon" className="w-12 h-12" />
        <p className="text-xl font-bold">Pepe's Sensoring App</p>
      </div>

      <div className="flex flex-col gap-4">

      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-800">
          📊 Informe de Sensores
        </h1>
        <p className="text-gray-500 text-sm mb-1">Resumen estadístico de sensores</p>
        <p className="max-w-[900px] text-justify text-xs">El siguiente es un informe ambiental generado a partir de datos registrados por los sensores MQ135 y DS18B20. Este reporte recopila mediciones de calidad del aire y temperatura realizadas durante un período determinado, proporcionando información precisa sobre las variaciones en las condiciones ambientales detectadas por los sensores.</p>
        <p className="text-xs text-gray-400">
          {formatDate(from)} — {formatDate(to)}
        </p>
      </div>

      <div className="w-full flex flex-row">

        {/* INFORME TEMPERATURA */}
        <div className="w-1/2">
          <p className="text-md text-center font-semibold mb-6">Temperatura</p>
          <div className="flex">
            <div className="flex flex-col w-[70px] h-[242px] overflow-hidden gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-xl py-2 shadow-sm flex flex-col items-center">
                <span className="text-xs uppercase font-semibold">Promedio</span>
                <span className="text-sm font-bold">{temperature.average.toFixed(2)}°C</span>
              </div>
              <div className="bg-green-100 text-green-800 rounded-xl py-2 shadow-sm flex flex-col items-center">
                <span className="text-xs uppercase font-semibold">Mínimo</span>
                <span className="text-sm font-bold">{temperature.min.toFixed(2)}°C</span>
              </div>
              <div className="bg-red-100 text-red-800 rounded-xl py-2 shadow-sm flex flex-col items-center">
                <span className="text-xs uppercase font-semibold">Máximo</span>
                <span className="text-sm font-bold">{temperature.max.toFixed(2)}°C</span>
              </div>
            </div>
            </div>
          </div>

        {/* INFORME TEMPERATURA */}
        <div className="w-1/2">
          <p className="text-md text-center font-semibold mb-6">Gas</p>
          <div className="flex">
            <div className="flex flex-col w-[90px] h-[242px] overflow-hidden gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-xl py-2 shadow-sm flex flex-col items-center">
                <span className="text-xs uppercase font-semibold">Promedio</span>
                <span className="text-sm font-bold">{air.average.toFixed(2)} ppm</span>
              </div>
              <div className="bg-green-100 text-green-800 rounded-xl py-2 shadow-sm flex flex-col items-center">
                <span className="text-xs uppercase font-semibold">Mínimo</span>
                <span className="text-sm font-bold">{air.min.toFixed(2)} ppm</span>
              </div>
              <div className="bg-red-100 text-red-800 rounded-xl py-2 shadow-sm flex flex-col items-center">
                <span className="text-xs uppercase font-semibold">Máximo</span>
                <span className="text-sm font-bold">{air.max.toFixed(2)} ppm</span>
              </div>
            </div>
            </div>
          </div>

      </div>

      </div>
      <div className="absolute bottom-6 text-gray-500 text-center w-[400px] text-xs">Generado en el Centro de Gestión y Desarrollo Sostenible Surcolombiano (CGDSS) – SENA Yamboró.</div>

      <div className="absolute bottom-6 right-6 flex gap-2 items-center">
        <img src="/logosena.png" alt="icon" className="w-12 h-12" />
      </div>
    </div>
  );
});

export default Report;