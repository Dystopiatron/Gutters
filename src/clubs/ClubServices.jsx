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