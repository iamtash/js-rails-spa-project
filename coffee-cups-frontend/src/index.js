const BASE_URL = "http://localhost:3000"
const CUPS_URL = `${BASE_URL}/cups`
const BREWS_URL = `${BASE_URL}/brews`
const ROASTERS_URL = `${BASE_URL}/roasters`

let outerContainer = document.querySelector('div.outer-container')
let cupsContainer

document.addEventListener('DOMContentLoaded', function() {
    outerContainer.appendChild(newCupButton())
    generateCupsWrapper()
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
    button.id = 'new-cup'
    button.textContent = 'Sip a cup'
    button.addEventListener('click', function() {
        button.style.display = 'none'
        cupsContainer.style.display = 'none'
        outerContainer.appendChild(generateNewCupForm())
    })
    return button
}

function generateCupsWrapper() {
    cupsContainer = document.createElement('div')
    cupsContainer.className = 'cups-wrapper'
    outerContainer.appendChild(cupsContainer)
}






