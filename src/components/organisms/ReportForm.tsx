import useGeneral from "@/hooks/useGeneral";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useRef, useState } from "react";
import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Report from "./Report";

export default function ReportForm() {
  const reportRef = useRef(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { getStats } = useGeneral();

  const [tempFrom, setTempFrom] = useState("");
  const [tempTo, setTempTo] = useState("");

  const [data, setData] = useState<any>({});

  async function handleTempReport(e: any) {
    e.preventDefault();
    const stats = await getStats(tempFrom, tempTo);
    setData(stats);
    onOpen();
  }

  async function downloadPDF() {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: -window.scrollY,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [987, 700],
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("informe-temperaturas.pdf");
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="outside" size="5xl" >
        <ModalContent>
          <Report
            ref={reportRef}
            {...data}
            from={tempFrom}
            to={tempTo}
          />
          <div className="flex justify-end m-4 gap-4">
            <Button color="danger" onPress={onOpenChange}>Cerrar</Button>
            <Button color="success" onPress={downloadPDF} className="text-white">
              Descargar PDF
            </Button>
          </div>
        </ModalContent>
      </Modal>
      <form
        onSubmit={handleTempReport}
        className="flex flex-col w-11/12 mx-auto"
      >
        <p className="text-2xl font-bold mt-6">Report generator</p>
        <Input
          onChange={(e) => setTempFrom(new Date(e.target.value).toISOString())}
          type="datetime-local"
          className="w-11/12 mx-auto mt-6 block"
          required
        />
        <Input
          onChange={(e) => setTempTo(new Date(e.target.value).toISOString())}
          type="datetime-local"
          className="w-11/12 mx-auto mt-6 block"
          required
        />
        <Button color="primary" className="w-11/12 mx-auto mt-6" type="submit">
          Generar reporte
        </Button>
      </form>
    </>
  );
}
