import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import "./QRScanner.scss";

export const QRScanner = () => {
  const [scanResult, setScanResult] = useState("test");
  const [delay, setDelay] = useState(100);

  const handleScan = (data) => {
    setScanResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <main>
      <div className="scanner-window">
        <QrReader delay={delay} onError={handleError} onScan={handleScan} />
      </div>
    </main>
  );
};
