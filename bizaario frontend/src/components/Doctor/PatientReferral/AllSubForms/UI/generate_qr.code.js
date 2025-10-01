import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({ value, size = 124.19 }) => {
  const qrValue = "https://your-website.com"; // any text, URL, or ID you want

  return (
    <div className=" bg-white flex items-center justify-center  relative p-1">
      <QRCodeCanvas 
        value={qrValue} 
        size={size}            // size of QR
        // bgColor="#ffffff"
        fgColor="#000000"     // QR code color
        level="H"             // error correction (L, M, Q, H)
        includeMargin={true}  // extra white border
      />
    </div>
  );
};

export default QRCodeGenerator;
