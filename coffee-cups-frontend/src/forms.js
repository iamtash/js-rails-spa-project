// const newObjConfigObj = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     }
// }

// function generateNewCupForm() {
//     let form = buildForm()
//     let fieldset = buildFieldset()
//     let inputFields = document.createElement('div')
//     inputFields.id = 'input-fields'
    
//     const objTypes = ['brew', 'roaster']
//     objTypes.forEach(objType => inputFields.appendChild(Select.generateObjsDropdown(objType)))

//     fieldset.appendChild(inputFields)
//     fieldset.appendChild(buildSubmit())
//     form.appendChild(fieldset)
//     return form
// }

// function buildForm() {
//     let form = document.createElement('form')
//     form.id = 'new-cup'
//     form.action = '#'
//     form.method = 'post'
//     return form
// }

// function buildFieldset() {
//     let fieldset = document.createElement('fieldset')
//     let legend = document.createElement('legend')
//     legend.innerHTML = '<h2>' + 'Sip a cup' + '</h2>'
//     fieldset.appendChild(legend)
//     return fieldset
// }

// function buildSubmit() {
//     let submit = document.createElement('input')
//     submit.type = 'submit'
//     submit.value = 'Post'
//     submit.addEventListener('click', (e) => submitNewCup(e))
//     return submit
// }

// function submitNewCup(e) {
//     e.preventDefault()
//     e.target.form.remove()
//     let configObj = Object.assign({}, newObjConfigObj, buildConfigObjBody(e))
//     fetchNewCup(configObj)
// }

// function buildConfigObjBody(e) {
//     let data = {
//         cup: {
//             user_id: currentUser.id,
//             brew_id: e.target.form.elements.brew.value,
//             coffee_id: e.target.form.elements.coffee.value,
//             rating_attributes: {
//                 rating: e.target.form.elements.rating.value
//             }
//         }
//     }
//     return { body: JSON.stringify(data) }
// }

// function fetchNewCup(configObj) {
//     fetch(CUPS_URL, configObj)
//         .then(resp => resp.json())
//         .then(newCup => addNewCupToDOM(newCup)) 
//         .catch(error => console.log(error.message))
// }

// function addNewCupToDOM(cup) {
//     let newCup = new Cup(cup.id, cup.user, cup.brew, cup.coffee, cup.rating, cup.created_at)
//     cupsContainer.prepend(newCup.renderCup())
//     document.querySelector('button#new-cup').style.display = 'block'
//     cupsContainer.style.display = 'block'
// }