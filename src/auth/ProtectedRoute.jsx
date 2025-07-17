import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
  
  const user = JSON.parse(localStorage.getItem("gutters_user"))
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}