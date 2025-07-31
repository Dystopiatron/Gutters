import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllUsers } from "./UserServices"
import { ProfileImage } from "./ProfileImage"
import "../ListStyles.css"

export const AllUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers().then(setUsers)
  }, [])

  return (
    <div className="container-sm">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">All Users</h2>
        </div>
        
        <div className="grid grid-2">
          {users.map(user => (
            <Link 
              key={user.id}
              to={`/users/${user.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="profile-card">
                <ProfileImage user={user} size="medium" />
                <div className="profile-info">
                  <h3>{user.name}</h3>
                  <p>View Profile →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}