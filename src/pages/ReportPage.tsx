import useCO from "@/hooks/useCO";
import useTemp from "@/hooks/useTemp";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { format } from "date-fns";

export default function ReportPage() {

    const { allTemps, isLoading: isTempLoading, isError: isTempError, error: tempError, setPage: setTempPage, totalPages: totalTempPages } = useTemp();
    const { allGases, isLoading: isGasLoading, isError: isGasError, error: gasError, setPage: setGasPage, totalPages: totalGasPages } = useCO();

    return(
        <>
            <div className="flex w-11/12 bg-white min-h-screen rounded-xl shadow-xl mx-auto">
                <div className="w-1/2">
                    <div className="flex justify-center">
                        <Pagination className="mt-6" showControls color="success" total={totalTempPages} onChange={(val) => setTempPage(val)} />
                    </div>
                    <Table className="w-11/12 mx-auto my-6">
                        <TableHeader>
                            <TableColumn>Temperatura</TableColumn>
                            <TableColumn>Fuente</TableColumn>
                            <TableColumn>Fecha</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {isTempLoading && 
                            <TableRow>
                                <TableCell colSpan={3}>Loading...</TableCell>
                            </TableRow>}
                            {isTempError && 
                            <TableRow>
                                <TableCell colSpan={3}>Error: {tempError?.message}</TableCell>
                            </TableRow>}
                            {allTemps?.map((temp: any) => 
                                <TableRow>
                                    <TableCell key={temp.id}>{temp.degrees} C°</TableCell>
                                    <TableCell>{temp.source}</TableCell>
                                    <TableCell>{format(new Date(temp.createdAt), "h:mmaaa, d/M/yyyy")}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="w-1/2">
                    <div className="flex justify-center">
                        <Pagination className="mt-6" showControls color="success" total={totalGasPages} onChange={(val) => setGasPage(val)} />
                    </div>
                    <Table className="w-11/12 mx-auto my-6">
                        <TableHeader>
                            <TableColumn>Nivel de gas</TableColumn>
                            <TableColumn>Fuente</TableColumn>
                            <TableColumn>Fecha</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {isGasLoading && 
                            <TableRow>
                                <TableCell colSpan={3}>Loading...</TableCell>
                            </TableRow>}
                            {isGasError && 
                            <TableRow>
                                <TableCell colSpan={3}>Error: {gasError?.message}</TableCell>
                            </TableRow>}
                            {allGases?.map((gas: any) => 
                                <TableRow>
                                    <TableCell key={gas.id}>{gas.airQuality} ppm</TableCell>
                                    <TableCell>{gas.source}</TableCell>
                                    <TableCell>{format(new Date(gas.createdAt), "h:mmaaa, d/M/yyyy")}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}