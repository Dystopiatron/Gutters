import React, { useEffect, useState } from "react"
import { getAllClubs, deleteClub } from "./ClubServices"
import { CreateClubForm } from "./CreateClubForm"
import { ClubSignUp } from "./JoinClub"
import "./AllClubs.css"
import { Link } from "react-router-dom"
import { ProfileImage } from "../user/ProfileImage"



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
        const membership = memberships.find(
          member => member.clubId === club.id && member.userId === user?.id
        )
        return (
         <li key={club.id} className="club-list-item">
  <div className="club-info-row">
    <div className="club-info-main">
      <strong>{club.name}</strong>
      <div className="club-members">
        <strong>Members:</strong>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-sm)', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          marginTop: 'var(--spacing-xs)' 
        }}>
          {clubMembers.map((member) => (
            <Link 
              key={member.id}
              to={`/users/${member.id}`}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                textDecoration: 'none',
                padding: 'var(--spacing-xs)',
                borderRadius: 'var(--border-radius)',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--bg-surface)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <ProfileImage user={member} size="small" />
              <span style={{ 
                color: 'var(--text-primary)', 
                fontWeight: '500'
              }}>
                {member.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
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
      <ClubSignUp 
    clubId={club.id} 
    onJoined={fetchMemberships} 
    memberships={memberships} 
/>
      {membership && (
        <button
          className="btn-warning"
          onClick={() => {
            if (window.confirm("Are you sure you want to leave this club?")) {
              fetch(`http://localhost:8088/memberships/${membership.id}`, { method: "DELETE" })
                .then(() => fetchMemberships())
            }
          }}
        >
          Leave Club
        </button>
      )}
    </div>
    <div className="club-description">
      {club.description}
    </div>
  </div>
</li>
        )
      })}
    </ul>
  </div>
)
}