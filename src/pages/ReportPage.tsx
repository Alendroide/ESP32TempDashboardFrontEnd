import TempsTable from "@/components/organisms/temp/TempsTable";
import TempReportForm from "@/components/organisms/temp/TempReportForm";
import GasesTable from "@/components/organisms/gas/GasesTable";

export default function ReportPage() {
  return (
    <>
      <div className="flex flex-col xl:flex-row w-11/12 bg-white min-h-screen rounded-xl shadow-xl mx-auto">
        <div className="w-full xl:w-1/2">
          <TempReportForm />

          <TempsTable />
        </div>

        <div className="w-full xl:w-1/2">
          <GasesTable />
        </div>
      </div>
    </>
  );
}
