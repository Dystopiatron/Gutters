export const getAllClubs = () => {
    return fetch (`http://localhost:8088/clubs`).then((res) => res.json())
}

export const deleteClub = (clubId) => {
  return fetch(`http://localhost:8088/clubs/${clubId}`, {
    method: "DELETE"
  })
}

export const leaveClub = (membershipId) => {
  return fetch(`http://localhost:8088/memberships/${membershipId}`, {
    method: "DELETE"
  })
}

export const editClub = (club) => { 
  return fetch(`http://localhost:8088/clubs/${club.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(club)
  })
}

export const joinClub = (clubId, userId) => {
  return fetch (`http://localhost:8088/memberships`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      clubId: clubId,
      userId: userId
    })
  })
}

