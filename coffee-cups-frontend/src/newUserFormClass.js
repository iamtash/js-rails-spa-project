class NewUserForm extends Form {
    constructor (objType) {
        super(objType)

        const attributes = ['name', 'email', 'password']
        attributes.forEach(attr => this.inputFields.appendChild(this.constructor.buildNewUserInput(attr)))
  
        this.assembleFormElements(this.constructor.submitNewUser)
    }

    static buildNewUserInput(attr) {
        let inputField = document.createElement('input')
        if (attr === 'name') inputField.type = 'text'
        else inputField.type = attr
        inputField.name = attr
        inputField.placeholder = attr
        inputField.className = 'text-input'
        return inputField
    }

    static submitNewUser(e) {
        e.preventDefault()
        e.target.form.remove() 
        let configObj = Object.assign({}, newObjConfigObj, NewUserForm.newUserConfigObjBody(e))
        NewUserForm.fetchNewUser(configObj)
    }

    static newUserConfigObjBody(e) {
        let data = {
            user: {
                name: e.target.form.elements.name.value,
                email: e.target.form.elements.email.value,
                password: e.target.form.elements.password.value
            }
        }
        return { body: JSON.stringify(data) }
    }

    static fetchNewUser(configObj) {
        fetch(USERS_URL, configObj)
            .then(resp => resp.json())
            .then(newUser => currentUser = newUser) 
            .then(() => getCups())
            .catch(error => console.log(error.message))
    }
}