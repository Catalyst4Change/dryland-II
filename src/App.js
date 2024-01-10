import React, { useState } from "react";
import { QRScanner } from "./QRScanner";
import { LogIn } from "./LogIn";
import logo from "./Assets/DrylandLogo.png";
export const App = () => {
  const [user, setUser] = useState(null);

  const setUserName = (userName) => {
    console.log("setUserName()", userName);
    setUser(userName);
  };

  return (
    <main>
      <div className="logo_conatiner">
        <img src={logo} alt="Drayland Distillery Logo" />
      </div>
      <LogIn user={user} setUserName={setUserName} />
      {user && <QRScanner user={user} />}
    </main>
  );
};
