import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import "./App.css";

export const LogIn = ({ user, setUserName }) => {
  // Google Auth info
  const CLIENT_ID =
    "972542105-n3s9l6ea9ajihtfjacm8m8fq66q9hdpq.apps.googleusercontent.com";
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];
  const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

  // Connect to google API
  const initClient = () => {
    return gapi.client
      .init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        () => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        },
        (error) => {
          console.log("Error loading Google API client! ", error);
        }
      );
  };

  //App user signs in to google
  const updateSignInStatus = (isSignedIn) => {
    if (isSignedIn) {
      const profile = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile();
      const userName = profile.getName();
      setUserName(userName);
    }
  };

  const handleSignInClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
    setUserName(null);
  };

  // Avoids reload errors by ensuring user stays logged in
  useEffect(() => {
    gapi.load("client:auth2", () => {
      initClient().then(() => {
        // After the client is initialized, check if the user is already signed in
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        updateSignInStatus(isSignedIn);
      });
    });
  }, []);

  return (
    <div className="center">
      {!user && (
        <div>
          <h2>Please Log In to continue.</h2>
          <button onClick={handleSignInClick}>Log In</button>
        </div>
      )}
      {user && (
        <div>
          <h2>Welcome, {user}!</h2>
          <button onClick={handleSignOutClick}>Log Out</button>
        </div>
      )}
    </div>
  );
};
