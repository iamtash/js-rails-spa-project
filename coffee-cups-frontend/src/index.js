const BASE_URL = "http://localhost:3000"
const CUPS_URL = `${BASE_URL}/cups`

fetch(CUPS_URL)
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    