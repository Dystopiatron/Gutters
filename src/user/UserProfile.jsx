import React, { useEffect, useState } from "react"
import "../ListStyles.css"
import { leaveClub } from "../clubs/ClubServices"
import { EditClubForm } from "../clubs/EditClubForm"

export const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [joinedClubs, setJoinedClubs] = useState([])
  const [memberships, setMemberships] = useState([])
  const [editingClubId, setEditingClubId] = useState(null)

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("gutters_user"))
    if (localUser?.id) {
      fetch(`http://localhost:8088/users/${localUser.id}`)
        .then(res => res.json())
        .then(setUser)

      fetch(`http://localhost:8088/memberships?userId=${localUser.id}`)
        .then(res => res.json())
        .then(userMemberships => {
          setMemberships(userMemberships)
          fetch("http://localhost:8088/clubs")
            .then(res => res.json())
            .then(clubs => {
              const clubIds = userMemberships.map(member => member.clubId)
              const userClubs = clubs.filter(club => clubIds.includes(club.id))
              setJoinedClubs(userClubs)
            })
        })
    }
  }, [])

  const handleLeave = (membershipId, clubId) => {
    leaveClub(membershipId).then(() => {
      setJoinedClubs(prev => prev.filter(club => club.id !== clubId))
      setMemberships(prev => prev.filter(member => member.id !== membershipId))
    })
  }

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
          {joinedClubs.map(club => {
            const membership = memberships.find(member => member.clubId === club.id)
            const isOwner = club.ownerId === user.id
            return (
              <li key={club.id}>
                {editingClubId === club.id ? (
                  <EditClubForm
                    club={club}
                    onUpdated={() => {
                      setEditingClubId(null)
                      // Refresh clubs and memberships after editing
                      fetch(`http://localhost:8088/memberships?userId=${user.id}`)
                        .then(res => res.json())
                        .then(userMemberships => {
                          setMemberships(userMemberships)
                          fetch("http://localhost:8088/clubs")
                            .then(res => res.json())
                            .then(clubs => {
                              const clubIds = userMemberships.map(member => member.clubId)
                              const userClubs = clubs.filter(club => clubIds.includes(club.id))
                              setJoinedClubs(userClubs)
                            })
                        })
                    }}
                    onCancel={() => setEditingClubId(null)}
                  />
                ) : (
                  <>
                    {club.name}
                    {membership && (
                      <button
                        className="btn-warning"
                        onClick={() => handleLeave(membership.id, club.id)}
                      >
                        Leave Club
                      </button>
                    )}
                    {isOwner && (
                      <button
                        className="btn-primary"
                        onClick={() => setEditingClubId(club.id)}
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}