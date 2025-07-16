import React, { useEffect, useState } from "react"
import { getAllComics } from "./ComicServices"
import "../ListStyles.css"

export const AllComics = () => {
  const [comics, setComics] = useState([])

  useEffect(() => {
    getAllComics().then(setComics)
  }, [])

  return (
    <div className="list-container">
      <h2>All Comics</h2>
      <ul>
        {comics.map(comic => (
          <li key={comic.id}>{comic.title}</li>
        ))}
      </ul>
    </div>
  )
}