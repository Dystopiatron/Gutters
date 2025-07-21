import React, { useEffect, useState } from "react"
import { getAllClubs, deleteClub } from "./ClubServices"
import { CreateClubForm } from "./CreateClubForm"
import { ClubSignUp } from "./JoinClub"
import "../ListStyles.css"

export const AllClubs = () => {
  const [clubs, setClubs] = useState([])
  const [memberships, setMemberships] = useState([])
  const [users, setUsers] = useState([])

  const user = JSON.parse(localStorage.getItem("gutters_user"))


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
    <div className="all-clubs-container">
      <h2>All Clubs</h2>
      <ul className="club-list">
        {clubs.map(club => (
          <li key={club.id} className="club-list-item">
            <div>
              <strong>{club.name}</strong>
              <div>Members: {getClubMembers(club.id).map(member => member.name).join(", ")}</div>
            </div>
            <ClubSignUp clubId={club.id} onJoined={fetchMemberships} />
          </li>
          ))}
    </ul>
      </div >
    )
  }