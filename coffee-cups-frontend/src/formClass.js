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

    assembleFormElements(submitNewObjFunc) {
        this.fieldset.appendChild(this.inputFields)
        this.fieldset.appendChild(this.buildSubmit(submitNewObjFunc))
        this.formNode.appendChild(this.fieldset)
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
        let legendText = this.fieldsetLegendText

        legend.innerHTML = '<h2>' + legendText + '</h2>'
        
        fieldset.appendChild(legend)
        return fieldset
    }

    get fieldsetLegendText() {
        switch (this.type) {
            case 'cup':
                return 'Sip a cup'
            case 'user':
                return 'User Signup'
            case 'session':
                return 'User Login'
        }
    }

    buildSubmit(submitNewObjFunc) {
        let submit = document.createElement('button')
        submit.type = 'submit'
        submit.className = 'submit-button'
        submit.textContent = this.submitButtonText
        submit.addEventListener('click', (e) => submitNewObjFunc(e))
        return submit
    }

    get submitButtonText() {
        switch (this.type) {
            case 'cup':
                return 'Post'
            case 'user':
                return 'Sign up'
            case 'session':
                return 'Log in'
        }
    }

    static submitNewObj(e) {
        e.preventDefault()
        e.target.form.remove() 
        document.querySelector('div.exit-option').remove()
    }

    get exitOption() { 
        function addButtonEventListener(renderOtherView) {
            button.addEventListener('click', () => renderOtherView())
        }

        let exitOption = document.createElement('div')
        exitOption.className = 'exit-option'
        let exitText = document.createElement('h4')
        let button = document.createElement('button')
        button.className = 'exit-option'

        exitText.innerText = this.exitOptionContent.exitText
        button.textContent = this.exitOptionContent.buttonText
        addButtonEventListener(this.exitOptionContent.renderFunc)

        exitOption.appendChild(exitText)
        exitOption.appendChild(button)
        return exitOption
    }

    get exitOptionContent() {
        let exitOptionContent = {}
        switch (this.type) {
            case 'user':
                exitOptionContent.exitText = 'Already have an account?'
                exitOptionContent.buttonText = 'Log in'
                exitOptionContent.renderFunc = renderUserLogin
                return exitOptionContent
            case 'session':
                exitOptionContent.exitText = "Don't have an account?"
                exitOptionContent.buttonText = 'Sign up'
                exitOptionContent.renderFunc = renderUserSignup
                return exitOptionContent
            case 'cup':
                exitOptionContent.exitText = 'Nevermind?'
                exitOptionContent.buttonText = 'Go back'
                exitOptionContent.renderFunc = revealButtonAndCups
                return exitOptionContent
        }
    }


}



