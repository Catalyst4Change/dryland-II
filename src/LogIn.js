import React, { useEffect } from "react"
import { gapi } from "gapi-script"
import logo from "./Assets/DrylandLogo.png"
import "./App.scss"

export const LogIn = ({ user, setUserName, setUserMessage }) => {
  // Google Auth info
  const CLIENT_ID =
    "163552366472-ksvonit6g3vu3j483rbaavto8i5rhlhf.apps.googleusercontent.com"
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ]
  const SCOPES = "https://www.googleapis.com/auth/spreadsheets"

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
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus)
        },
        (error) => {
          setUserMessage("Error loading Google API client! ", error)
        }
      )
  }

  //App user signs in to google
  const updateSignInStatus = (isSignedIn) => {
    if (isSignedIn) {
      const profile = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
      const userName = profile.getName()
      setUserName(userName)
    }
  }

  const handleSignInClick = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .catch((error) => {
        if (error.error === "popup_closed_by_user") {
          setUserMessage("User canceled login.")
        } else if (error.error === "access_denied") {
          setUserMessage("Access denied. Please request access.")
        } else {
          setUserMessage("Login error: " + error)
        }
      })
  }

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut()
    setUserName(null)
  }

  // Avoids reload errors by ensuring user stays logged in
  useEffect(() => {
    gapi.load("client:auth2", () => {
      initClient().then(() => {
        // After the client is initialized, check if the user is already signed in
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        updateSignInStatus(isSignedIn)
      })
    })
  }, [])

  return (
    <div className="center">
      <div className="logo_container">
        <img src={logo} alt="Dry Land Distillery Logo" />
      </div>

      {!user && (
        <div>
          <h3>Please Log In to continue.</h3>
          <button className="button positive" onClick={handleSignInClick}>
            Log In
          </button>
        </div>
      )}
    </div>
  )
}
