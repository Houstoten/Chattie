
export const fetchData = <T>(url: string, callback: (arg: Array<T>) => void) => {
    Promise.resolve(fetch(url, {
        method: 'GET',
    }))
        .then(async (response) => callback(await response.json()));
}
