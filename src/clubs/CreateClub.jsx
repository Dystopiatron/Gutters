export const NewClubPost = (club) => {
  return fetch("http://localhost:8088/clubs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(club),
  })
}

