import React, { useState } from "react";
import QrReader from "react-qr-scanner";

export const QRScanner = () => {
  const [delay, setDelay] = useState(100);
  const [scanResult, setScanResult] = useState("test");
  // const [scanComplete, setScanComplete] = useState(false);

  const handleScan = (data) => {
    console.log("scanning");
    if (data) {
      setScanResult(data);
      console.log("scan", data);
    }
  };

  const handleError = (err) => {
    console.error("error", err);
  };

  return (
    <main>
      <div className="scanner-window">
        <QrReader delay={delay} onError={handleError} onScan={handleScan} />
      </div>
    </main>
  );
};
