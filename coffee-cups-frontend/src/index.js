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
    renderUserForm(new NewUserForm('user', signupFields))
}

function renderUserLogin() {
    renderUserForm(new NewSessionForm('session', loginFields))
}

function renderUserForm(formObj) {
    outerContainer.innerHTML = ''
    outerContainer.appendChild(formObj.formNode)
    outerContainer.appendChild(formObj.exitOption())
}

function getCups() {
    if (currentUser.id) {
        getDOMReadyForCups()
        fetch(CUPS_URL)
            .then(resp => resp.json())
            .then(json => Cup.buildCupObjects(json))
            .then(cupObjs => Cup.renderCups(cupObjs))
            .catch(error => console.log(error.message))
    } else renderUserSignup()
}

function getDOMReadyForCups() {
    outerContainer.innerHTML = ''
    outerContainer.appendChild(newCupButton())
    generateCupsWrapper()
}

function newCupButton() {
    let button = document.createElement('button')
    button.id = 'new-cup-button'
    button.textContent = 'Sip a cup'
    button.addEventListener('click', () => renderNewCupForm())
    return button
}

function generateCupsWrapper() {
    cupsContainer = document.createElement('div')
    cupsContainer.className = 'cups-wrapper'
    outerContainer.appendChild(cupsContainer)
}

function renderNewCupForm() {
    document.querySelector('button#new-cup-button').style.display = 'none'
    cupsContainer.style.display = 'none'
    removeNewCupForm() // prevent duplicate forms
    let newCupFormObj = new NewCupForm('cup')
    outerContainer.appendChild(newCupFormObj.formNode)
    outerContainer.appendChild(newCupFormObj.exitOption())
    makeHeaderClickable()
}

function renderEditCupForm(e) {
    document.querySelector('button#new-cup-button').style.display = 'none'
    cupsContainer.style.display = 'none'
    let newCupFormObj = new EditCupForm('cup', e)
    outerContainer.appendChild(newCupFormObj.formNode)
    outerContainer.appendChild(newCupFormObj.exitOption())
    makeHeaderClickable()
}

function removeNewCupForm() {
    let currentNewCupForm = document.querySelector('form#new-cup')
    let currentExitOption = document.querySelector('div.exit-option')
    if (currentNewCupForm) currentNewCupForm.remove()
    if (currentExitOption) currentExitOption.remove()
}

function makeHeaderClickable() {
    document.querySelector('header').addEventListener('click', () => {
        removeNewCupForm()
        revealHomeView()
    })
}

function revealHomeView() {
    removeNewCupForm()
    document.querySelector('button#new-cup-button').style.display = 'block'
    cupsContainer.style.display = 'block'
}