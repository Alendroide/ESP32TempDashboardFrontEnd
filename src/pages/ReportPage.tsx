import TempsTable from "@/components/organisms/temp/TempsTable";
import ReportForm from "@/components/organisms/ReportForm";
import GasesTable from "@/components/organisms/gas/GasesTable";

export default function ReportPage() {
  return (
    <div className="bg-white rounded-xl shadow-xl w-11/12 min-h-screen mx-auto">
      <ReportForm />
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-1/2">

          <TempsTable />
        </div>

        <div className="w-full xl:w-1/2">

          <GasesTable />
        </div>
      </div>
    </div>
  );
}
