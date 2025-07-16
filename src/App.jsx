import { Routes, Route, Outlet } from "react-router-dom"
import { AllComics } from "./comics/AllComics"
import { AllUsers } from "./user/AllUsers"
import { AllClubs } from "./clubs/AllClubs"
import { NavBar } from "./nav/NavBar"
import { WelcomePage } from "./welcome/WelcomePage"
import { Login } from "./auth/Login"
import { ProtectedRoute } from "./auth/ProtectedRoute"
import { UserProfile } from "./user/UserProfile"


export const App = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />


      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Outlet />
            </>
          }
        >
         <Route index element={<WelcomePage />} />
<Route path="comics" element={<AllComics />} />
<Route path="user" element={<AllUsers />} />
<Route path="clubs" element={<AllClubs />} />
<Route path="profile" element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  )
}