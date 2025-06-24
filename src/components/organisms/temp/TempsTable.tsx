import useTemp from "@/hooks/useTemp";
import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { format } from "date-fns";

export default function TempsTable() {
  const { allTemps, isLoading, isError, error, setPage, totalPages } =
    useTemp();
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

      <Table aria-label="Temperatures" className="w-11/12 mx-auto my-6">
        <TableHeader>
          <TableColumn>Temperatura</TableColumn>
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
          {allTemps?.map((temp: any) => (
            <TableRow key={temp.id}>
              <TableCell>{temp.degrees} C°</TableCell>
              <TableCell>{temp.source}</TableCell>
              <TableCell>
                {format(new Date(temp.createdAt), "h:mmaaa, d/M/yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
