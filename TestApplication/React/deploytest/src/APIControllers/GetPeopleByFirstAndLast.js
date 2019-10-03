export default function personHelper(url, firstName, lastName) {
    return fetch(url + '/' + firstName + '/' + lastName, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer'
    })
}