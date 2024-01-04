import React, { useState } from "react";
import { QRScanner } from "./QRScanner";

export const App = () => {
  const [user, setUser] = useState(null);

  const userLogin = (data) => {
    setUser(data);
  };

  return (
    <main>
      {!user && (
        <form onSubmit={userLogin}>
          <h2>Please log in</h2>
          <input type="text" placeholder="User" />
          <input type="text" placeholder="Password" />
          <button type="submit">Submit</button>{" "}
        </form>
      )}
      <QRScanner />
    </main>
  );
};
