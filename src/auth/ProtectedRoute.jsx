import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
  // Check if user is logged in (gutters_user exists in localStorage)
  const user = JSON.parse(localStorage.getItem("gutters_user"))
  // If not logged in, redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />
  }
  // If logged in, render the child routes
  return <Outlet />
}