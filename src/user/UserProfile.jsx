import React, { useEffect, useState } from "react"
import "../ListStyles.css"

export const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [joinedClubs, setJoinedClubs] = useState([])

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("gutters_user"))
    if (localUser?.id) {
      // Fetch user info
      fetch(`http://localhost:8088/users/${localUser.id}`)
        .then(res => res.json())
        .then(setUser)

      // Fetch memberships for this user
      fetch(`http://localhost:8088/memberships?userId=${localUser.id}`)
        .then(res => res.json())
        .then(memberships => {
          // Get all clubs
          fetch("http://localhost:8088/clubs")
            .then(res => res.json())
            .then(clubs => {
              // Find clubs the user has joined
              const clubIds = memberships.map(m => m.clubId)
              const userClubs = clubs.filter(club => clubIds.includes(club.id))
              setJoinedClubs(userClubs)
            })
        })
    }
  }, [])

  if (!user) return <div className="list-container">Loading profile...</div>

  return (
    <div className="list-container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      {user.email && <p><strong>Email:</strong> {user.email}</p>}

      <h3>Clubs You've Joined:</h3>
      {joinedClubs.length === 0 ? (
        <p>You haven't joined any clubs yet.</p>
      ) : (
        <ul>
          {joinedClubs.map(club => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}