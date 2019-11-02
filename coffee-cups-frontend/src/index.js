const BASE_URL = "http://localhost:3000"
const CUPS_URL = `${BASE_URL}/cups`
const BREWS_URL = `${BASE_URL}/brews`
const ROASTERS_URL = `${BASE_URL}/roasters`

let outerContainer = document.querySelector('div.outer-container')
let cups

document.addEventListener('DOMContentLoaded', function() {
    outerContainer.appendChild(newCupButton())
    fetch(CUPS_URL)
        .then(resp => resp.json())
        .then(json => Cup.buildCupObjects(json))
        .then(cupObjs => {
            Cup.renderCups(cupObjs)
            cups = cupObjs
        })
})

function newCupButton() {
    let button = document.createElement('button')
    button.textContent = 'Sip a cup'
    button.addEventListener('click', function() {
        outerContainer.innerHTML = ''
        outerContainer.appendChild(generateNewCupForm())
    })
    return button
}






