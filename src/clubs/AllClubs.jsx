import React, { useEffect, useState } from "react"
import { getAllClubs, deleteClub } from "./ClubServices"
import { CreateClubForm } from "./CreateClubForm"
import { ClubSignUp } from "./JoinClub"
import "../ListStyles.css"
import "./AllClubs.css"



export const AllClubs = () => {
  const [clubs, setClubs] = useState([])
  const [memberships, setMemberships] = useState([])
  const [users, setUsers] = useState([])
  const [comics, setComics] = useState([])

  const user = JSON.parse(localStorage.getItem("gutters_user"))


  const fetchClubs = () => {
    getAllClubs().then(setClubs)
  }

  const fetchMemberships = () => {
    fetch("http://localhost:8088/memberships")
      .then(res => res.json())
      .then(setMemberships)
  }

  const fetchComics = () => {
    fetch("http://localhost:8088/comics")
      .then(res => res.json())
      .then(setComics)
  }

  useEffect(() => {
    fetchClubs()
    fetchMemberships()
    fetchComics()
    fetch("http://localhost:8088/users").then(res => res.json()).then(setUsers)
  }, [])

  const getClubMembers = (clubId) => {
    const memberIds = memberships.filter(member => member.clubId === clubId).map(member => member.userId)
    return users.filter(user => memberIds.includes(user.id))
  }

  return (
  <div className="all-clubs-container">
    <h2>All Clubs</h2>
    <CreateClubForm onClubCreated={fetchClubs} />
    <ul className="club-list">
      {clubs.map(club => {
        const clubMembers = getClubMembers(club.id)
        const clubComic = comics.find(comic => comic.id === club.comicId)
        const isOwner = club.ownerId === user?.id
        return (
          <li key={club.id} className="club-list-item">
            <div>
              <strong>{club.name}</strong>
              <div>Members: {clubMembers.map(member => member.name).join(", ")}</div>
              {clubComic && (
                <div>
                  <span>Comic: {clubComic.title}</span>
                  {clubComic.coverURL && (
                    <img className="comicImage"
                      src={clubComic.coverURL}
                      alt={clubComic.title}
                    />
                  )}
                </div>
              )}
              {isOwner && (
                <button
                  className="btn-warning"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this club?")) {
                      deleteClub(club.id).then(fetchClubs)
                    }
                  }}
                >
                  Delete Club
                </button>
              )}
            </div>
            <ClubSignUp clubId={club.id} onJoined={fetchMemberships} />
          </li>
        )
      })}
    </ul>
  </div>
)
}