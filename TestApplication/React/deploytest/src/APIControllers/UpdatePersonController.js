export default function personUpdater(url, data) {
    console.log('new info')
    console.log(JSON.stringify(data))
    return fetch(url, {
        method: 'PATCH',
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