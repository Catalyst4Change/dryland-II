import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

export const GAPI = () => {
  const [user, setUser] = useState(null);

  const setUserName = (userName) => {
    console.log("setUserName()", userName);
    setUser(userName);
  };

  const CLIENT_ID =
    "972542105-n3s9l6ea9ajihtfjacm8m8fq66q9hdpq.apps.googleusercontent.com";
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];
  const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

  const initClient = () => {
    console.log("initClient()");
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

  const updateSignInStatus = (isSignedIn) => {
    console.log("updateSignInStatus()");
    if (isSignedIn) {
      console.log("updateSignInStatus: ", isSignedIn);
      const profile = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile();
      const userName = profile.getName();
      console.log("userName: ", userName);
      setUserName(userName);
      // make API calls
    } else {
      // handle sign in process
    }
  };

  const handleSignInClick = () => {
    console.log("handleSignInClick()");
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

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
    <div>
      <h2>GAPI</h2>
      {!user && <button onClick={handleSignInClick}>Sign In</button>}
      {user && (
        <div>
          <p>Welcome, {user}!</p>
          <button onClick={handleSignOutClick}>Sign Out</button>
        </div>
      )}
    </div>
  );
};
