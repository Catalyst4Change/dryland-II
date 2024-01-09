import React, { useState } from "react";
import { QRScanner } from "./QRScanner";
import { GAPI } from "./GAPI";

export const App = () => {
  return (
    <main>
      <GAPI />
      {/* <QRScanner /> */}
    </main>
  );
};
