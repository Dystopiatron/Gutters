import React, { useState } from "react"
import { NewClubPost } from "./CreateClub"

export const CreateClubForm = ({ onClubCreated }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newClub = { name, description }
    NewClubPost(newClub).then(() => {
      setName("")
      setDescription("")
      if (onClubCreated) onClubCreated()
    })
  }

  return (
    <form className="list-container" onSubmit={handleSubmit}>
      <h2>Create a New Club</h2>
      <div>
        <label>
          Club Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            
          />
        </label>
      </div>
        <div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required    
          />
        </label>
      </div>
      <button className="btn-primary" type="submit">
        Create Club
      </button>
    </form>
  )
}