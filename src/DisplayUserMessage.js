import React, { useEffect } from "react"
import "./App.css"

export const DisplayUserMessage = ({ userMessage, setUserMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setUserMessage("")
    }, 3000)
  }, [userMessage])

  return <h2 className="center">{userMessage}</h2>
}
