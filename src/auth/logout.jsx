export const logout = (navigate) => {
  localStorage.removeItem("gutters_user")
  navigate("/login")
}