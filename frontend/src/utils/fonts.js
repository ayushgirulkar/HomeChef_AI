import NotoSansDevanagari from "../assets/fonts/NotoSansDevanagari-Regular";

export function registerFonts(doc) {
  // Register font in jsPDF virtual file system
  doc.addFileToVFS(
    "NotoSansDevanagari-Regular.ttf",
    NotoSansDevanagari
  );

  // IMPORTANT: Identity-H is REQUIRED for Hindi/Marathi
  doc.addFont(
    "NotoSansDevanagari-Regular.ttf",
    "NotoDeva",
    "normal",
    "Identity-H"
  );
}
