import React, { useEffect, useState } from "react"
import { getAllUsers } from "./UserServices"
import "../ListStyles.css"

export const AllUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers().then(setUsers)
  }, [])

  return (
    <div    className="list-container">
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}