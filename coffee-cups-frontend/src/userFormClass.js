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
    }

    static userConfigObjBody(e, fields) {
        let data = { user: {} }
        fields.forEach(field => data.user[field] = e.target.form.elements[field].value)
        return { body: JSON.stringify(data) }
    }

    static fetchUser(url, configObj, catchFunc, failure) {
        fetch(url, configObj)
        .then(resp => resp.json())
        .then(user => currentUser = new User(user.id, user.name, user.email))
        .then(() => getCups())
        .catch(error => {
            console.log(`${failure} FAILED`)
            console.log(error.message)
            catchFunc()
        })
    }
}



