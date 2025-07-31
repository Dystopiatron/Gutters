import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profileImageURL: ""
  })
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    
    fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(createdUser => {
      localStorage.setItem("gutters_user", JSON.stringify(createdUser))
      navigate("/")
    })
  }

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleSubmit}>
          <h1>Sign Up for In The Gutters</h1>
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="form-control"
                placeholder="Name (Case Sensitive)"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="form-control"
                placeholder="Email address (Case Sensitive)"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="url"
                value={user.profileImageURL}
                onChange={(e) => setUser({ ...user, profileImageURL: e.target.value })}
                className="form-control"
                placeholder="Profile Picture URL (optional)"
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign Up
              </button>
            </div>
          </fieldset>
        </form>
        <Link to="/login">Already have an account? Log in</Link>
      </section>
    </main>
  )
}