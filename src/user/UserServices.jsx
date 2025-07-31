export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`).then((res) => res.json())
}
export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users`)
    .then(res => res.json())
    .then(users => users.filter(user => user.email.toLowerCase() === email.toLowerCase()))
}