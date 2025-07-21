import React, { useState } from "react"
import { NewClubPost } from "./CreateClub"

export const CreateClubForm = ({ onClubCreated }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const newClub = (event) => {
    event.preventDefault()
    const user = JSON.parse(localStorage.getItem("gutters_user"))
    const newClub = { name, description, ownerId: user.id }
    NewClubPost(newClub).then(() => {
      setName("")
      setDescription("")
      if (onClubCreated) onClubCreated()
    })
  }

  return (
    <form className="list-container" onSubmit={newClub}>
      <h2>Create a New Club</h2>
      <div>
        <label>
          Club Name:
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
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
            onChange={event => setDescription(event.target.value)}
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