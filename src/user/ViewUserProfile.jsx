import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileImage } from "./ProfileImage"
import "../ListStyles.css"

export const ViewUserProfile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [joinedClubs, setJoinedClubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      // Fetch user details
      fetch(`http://localhost:8088/users/${userId}`)
        .then(res => res.json())
        .then(setUser)

      // Fetch user's clubs
      fetch(`http://localhost:8088/memberships?userId=${userId}`)
        .then(res => res.json())
        .then(userMemberships => {
          fetch("http://localhost:8088/clubs")
            .then(res => res.json())
            .then(clubs => {
              const clubIds = userMemberships.map(member => member.clubId)
              const userClubs = clubs.filter(club => clubIds.includes(club.id))
              setJoinedClubs(userClubs)
              setLoading(false)
            })
        })
    }
  }, [userId])

  if (loading) return <div className="container-sm">Loading user profile...</div>
  if (!user) return <div className="container-sm">User not found.</div>

  return (
    <div className="container-sm">
      <div className="card">
        <div className="profile-card">
          <ProfileImage user={user} size="large" />
          <div className="profile-info">
            <h3>{user.name}'s Profile</h3>
            {user.email && <p>Email: {user.email}</p>}
            <p>Member since: {new Date().getFullYear()}</p>
          </div>
        </div>

        <h3>Clubs {user.name} has Joined:</h3>
        {joinedClubs.length === 0 ? (
          <p>{user.name} hasn't joined any clubs yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {joinedClubs.map(club => (
              <li key={club.id} className="card" style={{ marginBottom: 'var(--spacing-md)' }}>
                <h4>{club.name}</h4>
                {club.description && <p>{club.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}