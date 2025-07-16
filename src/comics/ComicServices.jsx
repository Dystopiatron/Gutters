export const getAllComics = () => {
    return fetch (`http://localhost:8088/comics`).then((res) => res.json())
}

