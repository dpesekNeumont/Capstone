export default function deletePatient(url, id) {
    url += '/' + id
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer'
    })
}