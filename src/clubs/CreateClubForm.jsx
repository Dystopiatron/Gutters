import React, { useState, useEffect } from "react"
import { NewClubPost } from "./CreateClub"
import { getAllComics } from "../comics/ComicServices"

export const CreateClubForm = ({ onClubCreated }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [comics, setComics] = useState([])
  const [selectedComicId, setSelectedComicId] = useState("")

  useEffect(() => {
    getAllComics().then(setComics)
  }, [])

  const newClub = (event) => {
    event.preventDefault()
    const user = JSON.parse(localStorage.getItem("gutters_user"))
    const newClub = {
      name,
      description,
      ownerId: user.id,
      comicId: selectedComicId 
    }
    NewClubPost(newClub).then(() => {
      setName("")
      setDescription("")
      setSelectedComicId("")
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
      <div>
        <label>
          Select Comic:
          <select
            value={selectedComicId}
            onChange={e => setSelectedComicId(e.target.value)}
            required
          >
            <option value="">-- Choose a Comic --</option>
            {comics.map(comic => (
              <option key={comic.id} value={comic.id}>
                {comic.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className="btn-primary" type="submit">
        Create Club
      </button>
    </form>
  )
}