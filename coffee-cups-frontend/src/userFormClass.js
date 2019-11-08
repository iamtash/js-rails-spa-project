class UserForm extends Form {
    constructor (objType, fields) {
        super(objType)

        fields.forEach(field => this.inputFields.appendChild(this.constructor.buildUserInput(field)))
  
        this.assembleFormElements(this.constructor.submitNewObj)
    }

    static buildUserInput(field) {
        let inputField = document.createElement('input')
        if (field === 'name') inputField.type = 'text'
        else inputField.type = field
        inputField.name = field
        inputField.placeholder = field
        inputField.className = 'text-input'
        return inputField
    }

    static submitNewObj(e) {
        super.submitNewObj(e)
        document.querySelector('div.exit-option').remove()
    }

    static userConfigObjBody(e, fields) {
        let data = { user: {} }
        fields.forEach(field => data.user[field] = e.target.form.elements[field].value)
        return { body: JSON.stringify(data) }
    }

    static fetchUser(url, configObj, catchFunc, failure) {
        fetch(url, configObj)
        .then(resp => resp.json())
        .then(user => currentUser = user)
        .then(() => getCups())
        .catch(error => {
            console.log(`${failure} FAILED`)
            console.log(error.message)
            catchFunc()
        })
    }

    get exitOption() { // refactor this
        let exitOption = document.createElement('div')
        exitOption.className = 'exit-option'
        let exitText = document.createElement('h4')
        let button = document.createElement('button')
        button.className = 'exit-option'
        button.addEventListener('click', () => {
            if (this.type === 'user') renderUserLogin()
            else if (this.type === 'session') renderUserSignup()
        })

        if (this.type === 'user') {
            exitText.innerText = 'Already have an account?'
            button.textContent = 'Log in'
        } else if (this.type === 'session') {
            exitText.innerText = "Don't have an account?"
            button.textContent = 'Sign up'
        }

        exitOption.appendChild(exitText)
        exitOption.appendChild(button)
        return exitOption
    }
}



