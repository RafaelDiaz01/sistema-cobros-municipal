import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import ConfiguracionService from "./configuracionService.js";

// ===== FUNCIONES =====
function normalizeText(text) {
  return typeof text === "string" ? text.normalize("NFC") : "";
}

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
}

export async function generarReciboPDF(pago) {
  const config = await ConfiguracionService.obtenerConfiguracion();
  const pdfDoc = await PDFDocument.create();

  // ===== PAGINA HORIZONTAL =====
  const page = pdfDoc.addPage([612, 396]);
  const { width, height } = page.getSize();

  // ===== FUENTES =====
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ===== UTILIDADES =====
  const drawRoundedBox = (x, y, w, h) => {
    page.drawRectangle({
      x,
      y,
      width: w,
      height: h,
      borderWidth: 1.2,
      borderRadius: 12,
      borderColor: rgb(0, 0, 0),
    });
  };

  const drawField = (label, value, x, y, w) => {
    drawRoundedBox(x, y - 18, w, 22);

    page.drawText(normalizeText(label), {
      x: x + 8,
      y: y - 8,
      size: 8,
      font: bold,
    });

    page.drawText(normalizeText(value || ""), {
      x: x + 60,
      y: y - 8,
      size: 9,
      font,
    });
  };

  // ===== CONTENEDOR PRINCIPAL =====
  const margin = 20;
  drawRoundedBox(margin, margin, width - margin * 2, height - margin * 2);

  // ===== HEADER =====
  const headerY = height - 50;
  const logoPath = path.join(process.cwd(), config.logo_url.replace(/^\//, ""));
  const logoBytes = fs.readFileSync(logoPath);
  const logo = await pdfDoc.embedPng(logoBytes);

  page.drawImage(logo, {
    x: margin + 20,
    y: headerY - 25,
    width: 40,
    height: 40,
  });

  page.drawText(normalizeText("MUNICIPIO DE IXTLÁN DE JUÁREZ, OAX."), {
    x: width / 2 - 130,
    y: headerY,
    size: 12,
    font: bold,
  });

  page.drawText(normalizeText("TESORERIA MUNICIPAL"), {
    x: width / 2 - 75,
    y: headerY - 14,
    size: 10,
    font: bold,
  });

  // ===== FILA 1 =====
  let y = headerY - 40;

  drawField(
    "NOMBRE:",
    `${pago.contribuyente.nombre} ${pago.contribuyente.apellido_paterno} ${pago.contribuyente.apellido_materno}`,
    margin + 10,
    y,
    340,
  );
  drawField("FECHA:", formatDate(pago.fecha_pago), width - 180, y, 150);

  // ===== FILA 2 =====
  y -= 30;

  drawField(
    "DIRECCIÓN:",
    `${pago.contribuyente.calle} ${pago.contribuyente.numero_calle} ${pago.contribuyente.barrio}`,
    margin + 10,
    y,
    340,
  );
  drawField("FOLIO:", pago.folio, width - 180, y, 150);

  y -= 30;

  // ===== BLOQUE IZQUIERDO =====
  const leftBoxX = margin + 10;
  const leftBoxY = height - 260;

  if (config.qr_path) {
    const qrPath = path.join(process.cwd(), config.qr_path.replace(/^\//, ""));
    const qrBytes = fs.readFileSync(qrPath);
    const qr = await pdfDoc.embedPng(qrBytes);

    page.drawImage(qr, {
      x: leftBoxX + 10,
      y: leftBoxY + 10,
      width: 90,
      height: 90,
    });
  }

  // ===== BLOQUE DERECHO (DETALLE) =====
  const detailX = leftBoxX + 120;
  const detailY = leftBoxY;
  drawRoundedBox(detailX, detailY, width - detailX - 30, 110);

  let textY = detailY + 85;

  page.drawText(normalizeText(`CONCEPTO: ${pago.concepto_pago}`), {
    x: detailX + 10,
    y: textY,
    size: 9,
    font: bold,
  });

  page.drawText(normalizeText("IMPORTE:"), {
    x: width - 130,
    y: textY,
    size: 9,
    font: bold,
  });

  textY -= 18;

  page.drawText(normalizeText(`DESCRIPCIÓN: ${pago.descripcion}`), {
    x: detailX + 10,
    y: textY,
    size: 9,
    font: bold,
  });

  textY -= 18;

  page.drawText(normalizeText(`MÉTODO DE PAGO: ${pago.metodo_pago}`), {
    x: detailX + 10,
    y: textY,
    size: 9,
    font: bold,
  });

  page.drawText(normalizeText(`$${Number(pago.monto).toFixed(2)}`), {
    x: width - 120,
    y: detailY + 15,
    size: 11,
    font: bold,
  });

  // ===== CANTIDAD EN TEXTO =====
  const amountY = detailY - 30;

  drawRoundedBox(margin + 10, amountY, width - 60, 22);

  page.drawText(normalizeText(`CANTIDAD: ${pago.monto}`), {
    x: margin + 20,
    y: amountY + 6,
    size: 9,
    font,
  });

  // ===== CAJERO =====
  const cashierY = amountY - 30;

  drawRoundedBox(margin + 10, cashierY, width - 60, 22);

  page.drawText(normalizeText(`CAJERO: ${pago.usuario.nombre_usuario}`), {
    x: margin + 20,
    y: cashierY + 6,
    size: 9,
    font,
  });

  if (pago.estado === "CANCELADO") {
    page.drawText(normalizeText("RECIBO INVÁLIDO"), {
      x: width / 2 - 70,
      y: margin + 20,
      size: 16,
      font: bold,
      color: rgb(0.85, 0.33, 0.31),

    });
  } else {
    // ===== FOOTER =====
    page.drawText(normalizeText("“TUS PAGOS GENERAN MEJORAS”"), {
      x: width / 2 - 90,
      y: margin + 8,
      size: 9,
      font,
    });
  }

  return await pdfDoc.save();
}
