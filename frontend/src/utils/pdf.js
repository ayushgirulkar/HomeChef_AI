import { jsPDF } from "jspdf";
import { registerFonts } from "./fonts";

export function downloadPDF(title, content, language = "english") {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4"
  });

  registerFonts(doc);

  // 🔥 Unicode-safe font selection
  if (language === "hindi" || language === "marathi") {
    doc.setFont("NotoDeva", "normal");
  } else {
    doc.setFont("helvetica", "normal");
  }

  doc.setFontSize(16);
  doc.text(title, 10, 15);

  doc.setFontSize(11);

  // IMPORTANT: splitTextToSize MUST be after font set
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 30);

  doc.save(`${title}.pdf`);
}
