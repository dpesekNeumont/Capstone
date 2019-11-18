export default function updatePatient(url, data) {
    return fetch(`${url}/${data}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer'
    })
}