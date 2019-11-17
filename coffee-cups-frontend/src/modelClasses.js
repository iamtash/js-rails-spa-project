const deleteCupConfigObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
}

class Cup {
    constructor(attributes) {
        this.id = attributes.id 
        this.user = new User(attributes.user)
        this.brew = attributes.brew
        this.coffee = attributes.coffee
        this.rating = attributes.rating
        this.createdAt = attributes.created_at
    }

    static buildCupObjects(cups) {
        return cups.map((cupAttributes) => {
            return new Cup(cupAttributes)
        })
    }

    renderCup() {
        const cupDiv = document.createElement('div')
        cupDiv.className = 'cup-card'
        cupDiv.dataset.id = this.id
        cupDiv.dataset.userId = this.user.id
        let cupContent = document.createElement('div')
        cupContent.className = 'cup-content'
        const cupText = document.createElement('span')
        cupText.className = 'text'
        cupText.innerHTML = this.getCupText()
        cupDiv.appendChild(cupContent).appendChild(cupText)
        
        if (this.user.id === currentUser.id) {
            let buttons = document.createElement('div')
            buttons.className = 'buttons'
            buttons.appendChild(this.createCupEditButton())
            buttons.appendChild(this.createCupDeleteButton())
            cupContent.appendChild(buttons)
            cupDiv.appendChild(this.createCupEditForm())
        }

        return cupDiv
    }

    createCupEditForm() {
        const cupEditDiv = document.createElement('div')
        cupEditDiv.className = 'edit-cup-div'
        cupEditDiv.dataset.id = this.id
        cupEditDiv.disabled = 'true'
        cupEditDiv.style.display = 'none'

        let editCupFormObj = new EditCupForm('cup', this)
        editCupFormObj.formNode.className = 'edit-cup-form'
        editCupFormObj.formNode.dataset.id = this.id

        cupEditDiv.appendChild(editCupFormObj.formNode)
        cupEditDiv.appendChild(EditCupForm.exitOption())

        return cupEditDiv
    }

    getCupText() {
        return `${this.user.capitalizedName} had ${this.aOrAn} ${this.brew.method} on ${this.postDate}.` + '<br>' + `Coffee: ${this.coffee.name}` + '<br>' + `Roaster: ${this.coffee.roaster.name}` + '<br>' + `Rating: ${this.rating.rating}`
    }

    static renderCups(cups) {
        const reverseSortedCups = cups.sort((a,b) => Date.parse(`${b.createdAt}`) - Date.parse(`${a.createdAt}`))
        reverseSortedCups.forEach((cup) => {
            cupsContainer.appendChild(cup.renderCup())
        })
    }

    createCupEditButton() {
        let button = document.createElement('button')
        button.type = 'submit'
        button.textContent = 'Edit'
        button.className = 'edit-cup-button'
        button.dataset.id = this.id

        button.addEventListener('click', (e) => {
            renderEditCupForm(e)
            let editCupForm = document.querySelector(`div.edit-cup-div[data-id='${e.target.dataset.id}']`)
            editCupForm.disabled = 'false'
            editCupForm.style.display = 'block'
            outerContainer.appendChild(editCupForm)
        })

        return button
    }

    createCupDeleteButton() {
        let form = this.createDeleteForm()
        let submit = this.createDeleteFormSubmit()
        form.appendChild(submit)

        form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.deleteConfirmPopup(e)
        })

        return form
    }

    createDeleteForm() {
        let form = document.createElement('form')
        form.name = 'cup'
        form.action = '#'
        form.method = 'delete'
        form.className = 'delete-cup-form'
        form.dataset.id = this.id
        form.dataset.userId = this.user.id
        return form
    }

    createDeleteFormSubmit() {
        let submit = document.createElement('input')
        submit.type = 'submit'
        submit.value = 'Delete'
        submit.className = 'delete-cup-button'
        return submit
    }

    deleteConfirmPopup(e) {
        if (confirm(`${currentUser.capitalizedName}, are you sure you want to delete this cup?`)) {
            this.constructor.deleteCup(e)
        } else {
            console.log('Cup deletion cancelled')
            return null
        }
    }

    static deleteCup(e) {
        const cupURL = `${CUPS_URL}/${e.target.dataset.id}`
        const configObj = Object.assign({}, deleteCupConfigObj, this.deleteCupConfigObjBody(e))
        fetch(cupURL, configObj)
            .then(resp => resp.json())
            .then(deletedCup => this.removeCupFromDOM(deletedCup))
            .catch(error => {
                console.log(error.message)
                console.log('Cup deletion failed')
            })
        }

    static deleteCupConfigObjBody(e) {
        let bodyValue = {
            cup: {id: e.target.dataset.id}
        }
        return { body: JSON.stringify(bodyValue) }
    }

    static removeCupFromDOM(cup) {
        document.querySelector(`div[data-id='${cup.id}']`).remove()
    }

    get postDate() {
        let date = new Date(`${this.createdAt}`)
        return date.toDateString()
    }

    get postTime() {
        this.createdAt.split('T')[1]
    }

    get aOrAn() {
        const vowels = /[aeiouAEIOU]/
        return vowels.test(this.brew.method.charAt(0)) ? 'an' :'a'
    }
}

class User {
    constructor(attributes) {
        this.id = attributes.id
        this.name = attributes.name
        this.email = attributes.email
    }

    get capitalizedName() {
        return this.name.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')
    }
}


