import DefaultLayout from "@/layouts/DefaultLayout";

import TempChart from "@/components/molecules/TempChart";
import useTemp from "@/hooks/useTemp";



export default function IndexPage() {

  const { currentTemperature, chartData } = useTemp();

  return (
    <DefaultLayout>
      <div className="flex h-full">

        <div className="w-7/12 h-96 bg-white p-3 rounded-3xl shadow-xl flex justify-center">
          <TempChart data={chartData} />
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
