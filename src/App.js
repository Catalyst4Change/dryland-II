import React, { useState } from "react";
import { QRScanner } from "./QRScanner";
import { GAPI } from "./GAPI";

export const App = () => {
  const [user, setUser] = useState(null);

  const setUserName = (userName) => {
    console.log("setUserName()", userName);
    setUser(userName);
  };

  return (
    <main>
      <GAPI user={user} setUserName={setUserName} />
      {user && <QRScanner />}
    </main>
  );
};
