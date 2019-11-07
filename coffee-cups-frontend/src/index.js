const BASE_URL = "http://localhost:3000"
const CUPS_URL = `${BASE_URL}/cups`
const BREWS_URL = `${BASE_URL}/brews`
const ROASTERS_URL = `${BASE_URL}/roasters`
const USERS_URL = `${BASE_URL}/users`
const SESSIONS_URL = `${BASE_URL}/sessions`

let currentUser
let outerContainer = document.querySelector('div.outer-container')
let cupsContainer

const loginFields = ['email', 'password']
const signupFields = ['name', ...loginFields]

document.addEventListener('DOMContentLoaded', function() {
    renderUserLogin()
})

function renderUserSignup() {
    let newUserForm = new NewUserForm('user', signupFields)
    outerContainer.appendChild(newUserForm.formNode)
    // button with event listener to login
}

function renderUserLogin() {
    let newSessionForm = new NewSessionForm('session', loginFields)
    outerContainer.appendChild(newSessionForm.formNode)
}

function getCups() {
    if (currentUser.id) {
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
    button.id = 'new-cup'
    button.textContent = 'Sip a cup'
    button.addEventListener('click', function() {
        button.style.display = 'none'
        cupsContainer.style.display = 'none'
        let newCupFormObj = new NewCupForm('cup')
        outerContainer.appendChild(newCupFormObj.formNode)
    })
    return button
}

function generateCupsWrapper() {
    cupsContainer = document.createElement('div')
    cupsContainer.className = 'cups-wrapper'
    outerContainer.appendChild(cupsContainer)
}