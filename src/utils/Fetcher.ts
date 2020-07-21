interface Data{
    id: string,
    text: string,
    user: string,
    avatar: string,
    userId: string,
    editedAt: string,
    createdAt: string
}

export const fetchData = (url: string, callback: (arg: Array<Data>) => void) => {
    Promise.resolve(fetch(url, {
        method: 'GET',
    }))
        .then(async (response) => callback(await response.json()));
}
