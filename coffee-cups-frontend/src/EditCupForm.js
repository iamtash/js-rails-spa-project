class EditCupForm  {
    constructor (objType, cup) {
        this.type = objType
        this.cup = cup
        this.formNode = this.buildFormNode()
        this.fieldset = this.buildFieldset()
        this.inputFields = this.buildInputFields()
        this.assembleFormElements()
    }

    assembleFormElements() {
        this.fieldset.appendChild(this.inputFields)
        this.fieldset.appendChild(this.buildSubmit())
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

    buildInputFields() {
        const objTypes = ['brew', 'roaster', 'coffee']
        const inputFields = document.createElement('div')
        inputFields.className = 'input-fields'
        objTypes.forEach(objType => inputFields.appendChild(ModelSelect.generateObjsDropdown(objType, null, this.cup)))
        inputFields.appendChild(RatingSelect.generateRatingSelect(this.cup))
        return inputFields
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
            this.removeForm(editCupForm, cupId)
        })

        exitOption.appendChild(exitText)
        exitOption.appendChild(button)
        return exitOption
    }

    static removeForm(editCupForm, cupId) {
        editCupForm.disabled = 'true'
        editCupForm.style.display = 'none'
        document.querySelector(`div.cup-card[data-id='${cupId}`).appendChild(editCupForm)
        document.querySelector('button#new-cup-button').style.display = 'block'
        cupsContainer.style.display = 'block'
    }

    static submitEditedCup(e) {
        e.preventDefault()
        const editCupForm = e.target.parentNode
        const cupId = e.target.dataset.id
        this.removeForm(editCupForm, cupId)
        
        const configObj = { 
            ...Form.submitObjConfigObj('PATCH'), 
            ...EditCupForm.editCupConfigObjBody(e, editCupForm) 
        }

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
            this.renderForm(editCupForm)
        }
    }

    static renderForm(editCupForm) {
        editCupForm.style.display = 'block'
        editCupForm.disabled = 'false'
        document.querySelector('button#new-cup-button').style.display = 'none'
        cupsContainer.style.display = 'none'
        outerContainer.appendChild(editCupForm)
    }

    static fetchEditedCup(configObj, cupId, editCupForm) {
        const cupURL = `${CUPS_URL}/${cupId}`
        fetch(cupURL, configObj)
            .then(resp => resp.json())
            .then(updatedCup => this.updateCupInDOM(updatedCup)) 
            .catch(error => {
                console.log(error.message)
                this.renderForm(editCupForm)
            })
    }

    static updateCupInDOM(cupAttributes) {
        const cup = new Cup(cupAttributes)
        const oldCupCard = document.querySelector(`div.cup-card[data-id='${cupAttributes.id}`)
        cupsContainer.replaceChild(cup.renderCup(), oldCupCard)
        revealHomeView()
    }
}