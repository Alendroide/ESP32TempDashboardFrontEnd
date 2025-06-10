import DefaultLayout from "@/layouts/DefaultLayout";

import TempChart from "@/components/molecules/TempChart";
import useTemp from "@/hooks/useTemp";
import COChart from "@/components/molecules/COChart";
import useCO from "@/hooks/useCO";

export default function IndexPage() {

  const { currentTemperature, chartData: chartDataTemp } = useTemp();
  const { currentCO, chartData : chartDataCO } = useCO();

  return (
    <DefaultLayout>
      <div className="flex gap-6">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
            <div className=" bg-white px-3 mb-4 rounded-3xl shadow-xl flex justify-center items-center w-24 h-24 font-semibold">
              {currentCO} ppm
            </div>
            <div className=" bg-white p-3 rounded-3xl shadow-xl flex justify-center w-full h-96 items-center">
              <COChart data={chartDataCO} />
            </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
            <div className=" bg-white px-3 mb-4 rounded-3xl shadow-xl flex justify-center items-center w-24 h-24 font-semibold">
              {currentTemperature}°C
            </div>
            <div className=" bg-white p-3 rounded-3xl shadow-xl flex justify-center w-full h-96 items-center">
              <TempChart data={chartDataTemp} />
            </div>
        </div>

      </div>
    </DefaultLayout>
  );
}
