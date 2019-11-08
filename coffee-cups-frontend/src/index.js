const BASE_URL = "http://localhost:3000"
const CUPS_URL = `${BASE_URL}/cups`
const BREWS_URL = `${BASE_URL}/brews`
const ROASTERS_URL = `${BASE_URL}/roasters`
const USERS_URL = `${BASE_URL}/users`
const SESSIONS_URL = `${BASE_URL}/sessions`

const outerContainer = document.querySelector('div.outer-container')
let currentUser
let cupsContainer

const loginFields = ['email', 'password']
const signupFields = ['name', ...loginFields]

document.addEventListener('DOMContentLoaded', function() {
    renderUserLogin()
})

function renderUserSignup() {
    let newUserFormObj = new NewUserForm('user', signupFields)
    outerContainer.innerHTML = ''
    outerContainer.appendChild(newUserFormObj.formNode)
    outerContainer.appendChild(newUserFormObj.exitOption)
}

function renderUserLogin() {
    let newSessionFormObj = new NewSessionForm('session', loginFields)
    outerContainer.innerHTML = ''
    outerContainer.appendChild(newSessionFormObj.formNode)
    outerContainer.appendChild(newSessionFormObj.exitOption)
}

function getCups() {
    if (currentUser.id) {
        outerContainer.innerHTML = ''
        outerContainer.appendChild(newCupButton())
        generateCupsWrapper()
        fetch(CUPS_URL)
            .then(resp => resp.json())
            .then(json => Cup.buildCupObjects(json))
            .then(cupObjs => Cup.renderCups(cupObjs))
            .catch(error => console.log(error.message))
    } else renderUserSignup()
}

function newCupButton() {
    let button = document.createElement('button')
    button.id = 'new-cup-button'
    button.textContent = 'Sip a cup'
    button.addEventListener('click', () => renderNewCupForm())
    return button
}

function renderNewCupForm() {
    document.querySelector('button#new-cup-button').style.display = 'none'
    cupsContainer.style.display = 'none'
    let newCupFormObj = new NewCupForm('cup')
    outerContainer.appendChild(newCupFormObj.formNode)
    outerContainer.appendChild(newCupFormObj.exitOption)
}

function generateCupsWrapper() {
    cupsContainer = document.createElement('div')
    cupsContainer.className = 'cups-wrapper'
    outerContainer.appendChild(cupsContainer)
}

function revealButtonAndCups() {
    document.querySelector('form#new-cup').remove()
    document.querySelector('div.exit-option').remove()
    document.querySelector('button#new-cup-button').style.display = 'block'
    cupsContainer.style.display = 'block'
}