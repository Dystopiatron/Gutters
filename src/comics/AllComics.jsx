import React, { useEffect, useState } from "react"
import { getAllComics } from "./ComicServices"
import "./AllComics.css"
import "../index.css"


export const AllComics = () => {
  const [comics, setComics] = useState([])
  const [selectedComic, setSelectedComic] = useState(null)

  useEffect(() => {
    getAllComics().then(setComics)
  }, [])

  const handleComicClick = (comic) => {
    setSelectedComic(comic)
  }

  const closeModal = () => setSelectedComic(null)

  return (
    <div className="comicsContainer">
      <h2 className="comicsTitle">All Comics</h2>
      <ul className="comicsList">
        {comics.map(comic => (
          <li
            key={comic.id}
            className="comicItem"
            onClick={() => handleComicClick(comic)}
            style={{ cursor: "pointer" }}
          >
            {comic.coverURL && (
              <img
                src={comic.coverURL}
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

      {selectedComic && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={event => event.stopPropagation()}>
            {selectedComic.coverURL && (
              <img
                src={selectedComic.coverURL}
                alt={selectedComic.title}
                className="comicModalImage"
                
              />
            )}
            <div className="modal-text-overlay">
            <h1><strong>{selectedComic.title}</strong></h1>
            <h3><strong>Genre:</strong> {selectedComic.genre}</h3>
            <h3><strong>Author:</strong> {selectedComic.author}</h3>
            <p><strong>Description:</strong> {selectedComic.description || "No description available."}</p> 
            <button className="btn-primary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}