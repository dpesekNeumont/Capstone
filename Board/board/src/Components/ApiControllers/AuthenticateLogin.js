import Base64 from 'base-64'

export default async function AuthenticateUser(url, username, password) {
    let base = Base64.encode(username + ':' + password)
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base}`
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer'
    });
}