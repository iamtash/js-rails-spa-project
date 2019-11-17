const editObjConfigObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
}

class EditCupForm  {
    constructor (objType, cup) {
        this.type = objType
        this.formNode = this.buildFormNode()
        this.fieldset = this.buildFieldset()
        this.inputFields = document.createElement('div')
        this.inputFields.id = 'input-fields'

        const objTypes = ['brew', 'roaster']
        objTypes.forEach(objType => this.inputFields.appendChild(ModelSelect.generateObjsDropdown(objType, null, cup)))
        this.inputFields.appendChild(ModelSelect.generateObjsDropdown('coffee', cup.coffee.roaster.id, cup))

        const ratingSelectObj = new RatingSelect(new SelectHelper('rating'))
        const ratings = [1, 2, 3, 4, 5]
        const ratingDropdown = ratingSelectObj.selectHelper.selectNode
        ratings.forEach(rating => ratingDropdown.appendChild(ratingSelectObj.selectHelper.renderOption(rating)))
        ratingDropdown.value = cup.rating.rating
        this.inputFields.appendChild(ratingSelectObj.selectHelper.createLabeledDropdown())
        this.assembleFormElements(this.constructor.submitNewObj)
    }

    assembleFormElements(submitNewObjFunc) {
        this.fieldset.appendChild(this.inputFields)
        this.fieldset.appendChild(this.buildSubmit(submitNewObjFunc))
        this.formNode.appendChild(this.fieldset)
    }

    buildFormNode() {
        const form = document.createElement('form')
        form.id = `edit-${this.type}`
        form.action = '#'
        form.method = 'patch'
        form.addEventListener('submit', (e) => this.constructor.submitEditedCup(e))
        return form
    }

    buildFieldset() {
        const fieldset = document.createElement('fieldset')
        const legend = document.createElement('legend')
        legend.innerHTML = '<h2>' + 'Edit your cup' + '</h2>'
        fieldset.appendChild(legend)
        return fieldset
    }

    buildSubmit() {
        const submit = document.createElement('button')
        submit.type = 'submit'
        submit.className = 'submit-button'
        submit.textContent = 'Update'
        return submit
    }

    static exitOption() {
        const exitOption = document.createElement('div')
        exitOption.className = 'exit-option'
        const exitText = document.createElement('h4')
        const button = document.createElement('button')
        button.className = 'exit-option'

        exitText.innerText = 'Nevermind?'
        button.textContent = 'Go back'

        button.addEventListener('click', (e) => {
            const editCupForm = e.target.parentNode.parentNode
            const cupId = editCupForm.dataset.id
            editCupForm.disabled = 'true'
            editCupForm.style.display = 'none'
            document.querySelector(`div.cup-card[data-id='${cupId}`).appendChild(editCupForm)
            document.querySelector('button#new-cup-button').style.display = 'block'
            document.querySelector('div.cups-wrapper').style.display = 'block'
        })

        exitOption.appendChild(exitText)
        exitOption.appendChild(button)
        return exitOption
    }

    static submitEditedCup(e) {
        e.preventDefault()
        const editCupForm = e.target.parentNode
        const cupId = e.target.dataset.id
        editCupForm.disabled = 'true'
        editCupForm.style.display = 'none'
        document.querySelector(`div.cup-card[data-id='${cupId}`).appendChild(editCupForm)
        document.querySelector('button#new-cup-button').style.display = 'block'
        cupsContainer.style.display = 'block'
        const configObj = Object.assign({}, editObjConfigObj, EditCupForm.editCupConfigObjBody(e, editCupForm))
        EditCupForm.fetchEditedCup(configObj, cupId, editCupForm)
    }

    static editCupConfigObjBody(e, editCupForm) {
        try {
            const data = {
                cup: {
                    user_id: currentUser.id,
                    brew_id: e.target.elements.brew.value,
                    coffee_id: e.target.elements.coffee.value,
                    rating_attributes: {
                        rating: e.target.elements.rating.value
                    }
                }
            }
            return { body: JSON.stringify(data) }
        } catch {
            console.log('Issue updating cup')
            editCupForm.style.display = 'block'
            editCupForm.disabled = 'false'
            document.querySelector('button#new-cup-button').style.display = 'none'
            cupsContainer.style.display = 'none'
            outerContainer.appendChild(editCupForm)
        }
    }

    static fetchEditedCup(configObj, cupId, editCupForm) {
        const cupURL = `${CUPS_URL}/${cupId}`
        fetch(cupURL, configObj)
            .then(resp => resp.json())
            .then(updatedCup => {
                console.log(updatedCup)
                this.updateCupInDOM(updatedCup)}
            ) 
            .catch(error => {
                console.log(error.message)
                editCupForm.style.display = 'block'
                editCupForm.disabled = 'false'
                document.querySelector('button#new-cup-button').style.display = 'none'
                cupsContainer.style.display = 'none'
                outerContainer.appendChild(editCupForm)
            })
    }

    static updateCupInDOM(cupAttributes) {
        const cup = new Cup(cupAttributes)
        const oldCupCard = document.querySelector(`div.cup-card[data-id='${cupAttributes.id}`)
        cupsContainer.replaceChild(cup.renderCup(), oldCupCard)
        document.querySelector('#new-cup-button').style.display = 'block'
        cupsContainer.style.display = 'block'
    }
}