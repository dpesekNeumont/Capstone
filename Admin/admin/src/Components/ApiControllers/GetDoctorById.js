export default function doctorHelper(url, id) {
    let searchString = `${url}/${id}`
    return fetch(searchString)
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        return myJson
    })
}