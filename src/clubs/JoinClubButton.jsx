import React from "react"

export const JoinClubButton = ({ clubId, onJoined }) => {
  // Get the current user from localStorage
  const user = JSON.parse(localStorage.getItem("gutters_user"))

  const handleJoin = () => {
    fetch("http://localhost:8088/memberships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        clubId: clubId
      })
    })
      .then(res => res.json())
      .then(() => {
        if (onJoined) onJoined()
        alert("You joined the club!")
      })
  }

  return (
    <button className="btn-secondary" onClick={handleJoin}>
      Join Club
    </button>
  )
}