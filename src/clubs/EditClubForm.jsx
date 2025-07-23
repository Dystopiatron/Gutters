import React, { useState } from "react"
import { editClub } from "./ClubServices"

export const EditClubForm = ({ club, onUpdated, onCancel }) => {
    const [name, setName] = useState(club.name)
    const [description, setDescription] = useState(club.description)

    const handleSubmit = (event) => {
        event.preventDefault()
        editClub({ ...club, name, description }).then(() => {
            if (onUpdated) onUpdated()
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={event => setName(event.target.value)}
                required
                placeholder="Club Name"
            />
            <input
                value={description}
                onChange={event => setDescription(event.target.value)}
                required
                placeholder="Description"
            />
            <button type="submit" className="btn-primary"  >Save</button>
            <button type="button" className="btn-warning" onClick={onCancel}>Cancel</button>
        </form>
    )
}