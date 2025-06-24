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
      className="relative p-6 h-[987px] w-[700px] mx-auto bg-white rounded-2xl shadow-lg space-y-6 flex flex-col items-center justify-center my-6"
    >
      <div className="absolute top-6 left-6 flex gap-2 items-center">
        <img src="/icon.png" alt="icon" className="w-12 h-12" />
        <p className="text-xl font-bold">Pepe's Sensoring App</p>
      </div>

      <div className="flex flex-col gap-4">

      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Informe de Temperaturas
        </h1>
        <p className="text-gray-500">Resumen estadístico de lecturas</p>
        <p className="max-w-[550px] my-3">El siguiente es un informe de temperatura registrado por el sensor DS18B20. Este reporte recopila las mediciones realizadas durante un período determinado, proporcionando datos precisos sobre las variaciones térmicas detectadas por el sensor.</p>
        <p className="text-sm text-gray-400 mt-1">
          {formatDate(from)} — {formatDate(to)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 text-blue-800 rounded-xl p-4 shadow-sm flex flex-col items-center">
          <span className="text-sm uppercase font-semibold">Promedio</span>
          <span className="text-3xl font-bold">{temperature.average.toFixed(2)}°C</span>
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl p-4 shadow-sm flex flex-col items-center">
          <span className="text-sm uppercase font-semibold">Mínimo</span>
          <span className="text-3xl font-bold">{temperature.min.toFixed(2)}°C</span>
        </div>
        <div className="bg-red-100 text-red-800 rounded-xl p-4 shadow-sm flex flex-col items-center">
          <span className="text-sm uppercase font-semibold">Máximo</span>
          <span className="text-3xl font-bold">{temperature.max.toFixed(2)}°C</span>
        </div>
      </div>
      </div>

      <div className="absolute bottom-6 text-gray-500 text-center w-[400px]">Generado en el Centro de Gestión y Desarrollo Sostenible Surcolombiano (CGDSS) – SENA Yamboró.</div>

      <div className="absolute bottom-6 right-6 flex gap-2 items-center">
        <img src="/logosena.png" alt="icon" className="w-12 h-12" />
      </div>
    </div>
  );
});

export default Report;