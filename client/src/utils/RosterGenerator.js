import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async () => {
  // Fetch the table HTML element
  const tableElement = document.getElementById("roster-table");

  if (tableElement) {
    // Use html2canvas to capture the table as an image
    const canvas = await html2canvas(tableElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Create jsPDF instance (landscape mode)
    const pdf = new jsPDF("landscape", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Add the image of the table to the PDF
    pdf.addImage(imgData, "PNG", 10, 10, pageWidth - 20, pageHeight - 20);

    // Save the PDF
    pdf.save("roster.pdf");
  } else {
    console.error("Table element not found!");
  }
};
