const newObjConfigObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
}

class Form {
    constructor (objType) {
        this.type = objType
        this.formNode = this.buildFormNode()
        this.fieldset = this.buildFieldset()

        this.inputFields = document.createElement('div')
        this.inputFields.id = 'input-fields'
    }

    buildFormNode() {
        let form = document.createElement('form')
        form.id = `new-${this.type}`
        form.action = '#'
        form.method = 'post'
        return form
    }

    buildFieldset() {
        let fieldset = document.createElement('fieldset')
        let legend = document.createElement('legend')
        let legendText

        if (this.type === 'cup') legendText = 'Sip a cup'
        else if (this.type === 'user') legendText = 'User Signup'

        legend.innerHTML = '<h2>' + legendText + '</h2>'
        
        fieldset.appendChild(legend)
        return fieldset
    }

    static buildSubmit(submitNewObjFunc) {
        let submit = document.createElement('input')
        submit.type = 'submit'
        submit.value = 'Post'
        submit.addEventListener('click', (e) => submitNewObjFunc(e))
        return submit
    }
}