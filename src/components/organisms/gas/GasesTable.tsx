import useCO from "@/hooks/useCO";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { format } from "date-fns";

export default function GasesTable() {

    const {allGases, isLoading, isError, error, setPage, totalPages} = useCO();

  return (
    <>
      <div className="flex justify-center">
        <Pagination
          className="mt-6"
          showControls
          color="success"
          total={totalPages}
          onChange={(val) => setPage(val)}
        />
      </div>
      <Table aria-label="Gases" className="w-11/12 mx-auto my-6">
        <TableHeader>
          <TableColumn>Nivel de gas</TableColumn>
          <TableColumn>Fuente</TableColumn>
          <TableColumn>Fecha</TableColumn>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={3}>Loading...</TableCell>
            </TableRow>
          )}
          {isError && (
            <TableRow>
              <TableCell colSpan={3}>Error: {error?.message}</TableCell>
            </TableRow>
          )}
          {allGases?.map((gas: any) => (
            <TableRow key={gas.id}>
              <TableCell>{gas.airQuality} ppm</TableCell>
              <TableCell>{gas.source}</TableCell>
              <TableCell>
                {format(new Date(gas.createdAt), "h:mmaaa, d/M/yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
