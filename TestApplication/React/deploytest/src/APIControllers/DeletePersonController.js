export default function personDeleter(url, data) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    })
}