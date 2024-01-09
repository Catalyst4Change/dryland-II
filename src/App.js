import React, { useState } from "react";
import { QRScanner } from "./QRScanner";
import { LogIn } from "./LogIn";

export const App = () => {
  const [user, setUser] = useState(null);

  const setUserName = (userName) => {
    console.log("setUserName()", userName);
    setUser(userName);
  };

  return (
    <main>
      <LogIn user={user} setUserName={setUserName} />
      {user && <QRScanner />}
    </main>
  );
};
