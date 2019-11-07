export default function updatePatient(url, data) {
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