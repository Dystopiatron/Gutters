import React, { useEffect, useState } from "react"
import { getAllComics } from "./ComicServices"
import "./AllComics.css"

export const AllComics = () => {
  const [comics, setComics] = useState([])

  useEffect(() => {
    getAllComics().then(setComics)
  }, [])

  return (
    <div className="comicsContainer">
      <h2 className="comicsTitle">All Comics</h2>
      <ul className="comicsList">
        {comics.map(comic => (
          <li key={comic.id} className="comicItem">
            {comic.imageUrl && (
              <img
                src={comic.imageUrl}
                alt={comic.title}
                className="comicImage"
              />
            )}
            <div>
              <div className="comicTitle">{comic.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}