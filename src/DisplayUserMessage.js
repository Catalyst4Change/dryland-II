import React, { useEffect } from "react"
import "./App.css"

export const DisplayUserMessage = ({ userMessage, setUserMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setUserMessage("")
    }, 3000)
  }, [userMessage])

  return <span className="center">{userMessage || ""}</span>
}
