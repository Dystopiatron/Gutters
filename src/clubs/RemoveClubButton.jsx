import React, { useEffect, useState } from "react"
import { getAllClubs, deleteClub } from "./ClubServices"
import { CreateClubForm } from "./CreateClubForm"
import "../ListStyles.css"


  
export const RemoveClub = () => { 
  const [clubs, setClubs] = useState([])

  const handleDelete = (clubId) => {
    if (window.confirm("Are you sure you want to remove this club?")) {
      deleteClub(clubId).then(fetchClubs)
    }
  }

  const fetchClubs = () => {
    getAllClubs().then((data) => {
      setClubs(data)
    })
  }

  useEffect(() => {
    fetchClubs()
  }, [])

  return (
    <div className="remove-club-container">
      <h2>Remove Club</h2>
      <CreateClubForm fetchClubs={fetchClubs} />
      <ul className="club-list">
        {clubs.map((club) => (
          <li key={club.id} className="club-item">
            {club.name}
            <button onClick={() => handleDelete(club.id)} className="delete-button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}