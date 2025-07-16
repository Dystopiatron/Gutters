import React from "react"
import { leaveClub } from "./ClubServices"

export const LeaveClubButton = ({ membershipId, onLeft }) => {
  const handleLeave = () => {
    leaveClub(membershipId).then(() => {
      if (onLeft) onLeft()
      alert("You left the club.")
    })
  }

  return (
    <button className="btn-warning" onClick={handleLeave}>
      Leave Club
    </button>
  )
}