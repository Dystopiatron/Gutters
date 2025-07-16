import React, { useEffect, useState } from "react"
import { getAllClubs } from "./ClubServices"
import { CreateClubForm } from "./CreateClubForm"
import "../ListStyles.css"
import { JoinClubButton } from "./JoinClubButton"
import { LeaveClubButton } from "./LeaveClubButton"


export const AllClubs = () => {
  const [clubs, setClubs] = useState([])
  const [memberships, setMemberships] = useState([])
  const [users, setUsers] = useState([])

  const user = JSON.parse(localStorage.getItem("gutters_user"))

  const getMembershipForUser = (clubId, userId) =>
    memberships.find(member => member.clubId === clubId && member.userId === userId)


  const fetchClubs = () => {
    getAllClubs().then(setClubs)
  }

  const fetchMemberships = () => {
    fetch("http://localhost:8088/memberships")
      .then(res => res.json())
      .then(setMemberships)
  }

  useEffect(() => {
    fetchClubs()
    fetchMemberships()
    fetch("http://localhost:8088/users").then(res => res.json()).then(setUsers)
  }, [])

  const getClubMembers = (clubId) => {
    const memberIds = memberships.filter(member => member.clubId === clubId).map(member => member.userId)
    return users.filter(user => memberIds.includes(user.id))
  }

  return (
    <div>
      <CreateClubForm onClubCreated={fetchClubs} />
      <div className="list-container">
        <h2>All Clubs</h2>
        <ul>
          {clubs.map(club => (
            <li key={club.id}>
              <strong>{club.name}</strong>
              <div>{club.description}</div>
              <JoinClubButton clubId={club.id} onJoined={fetchMemberships} />
              <div>
                <strong>Members:</strong>
                <ul>
                  {getClubMembers(club.id).length === 0
                    ? <li>No members yet.</li>
                    : getClubMembers(club.id).map(member => {
                        const membership = getMembershipForUser(club.id, member.id)
                        return (
                          <li key={member.id}>
                            {member.name}
                            {user && member.id === user.id && membership && (
                              <LeaveClubButton
                                membershipId={membership.id}
                                onLeft={fetchMemberships}
                              />
                            )}
                          </li>
                        )
                      })
                  }
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}