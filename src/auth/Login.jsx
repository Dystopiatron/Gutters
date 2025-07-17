import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../user/UserServices"
export const Login = () => {
  const [email, set] = useState("email@example.com")//uses useState to manage the email input state
  const navigate = useNavigate()// useNavigate is a hook that allows you to navigate to different routes in your application

  const handleLogin = (event) => {
    event.preventDefault()
    getUserByEmail(email).then((foundUsers) => {  // Assuming getUserByEmail returns an array of users (email) means it is searching by email
      if (foundUsers.length === 1) {    // Check if exactly one user is found
        const user = foundUsers[0]// Get the first user from the array
        localStorage.setItem(
          "gutters_user",
          JSON.stringify({//stringify converts a JavaScript object into a JSON string
            id: user.id,
            isUser: user.isUser,
          })//
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Welcome to In The Gutters!</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(event) => set(event.target.value)}// this sets the email state
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}
