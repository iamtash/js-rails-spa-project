class Form {
    constructor (objType) {
        this.type = objType
        this.formNode = this.buildFormNode()
        this.fieldset = this.buildFieldset()
        this.inputFields = document.createElement('div')
        this.inputFields.id = 'input-fields'
    }

    assembleFormElements() {
        this.fieldset.appendChild(this.inputFields)
        this.fieldset.appendChild(this.buildSubmit())
        this.formNode.appendChild(this.fieldset)
        this.formNode.appendChild(this.exitOption())
    }

    buildFormNode() {
        const div = document.createElement('div')
        div.id = `new-${this.type}-div`
        let form = document.createElement('form')
        form.id = `new-${this.type}`
        form.action = '#'
        form.method = 'post'
        div.appendChild(form)
        return div
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

    buildSubmit() {
        let submit = document.createElement('input')
        submit.type = 'submit'
        submit.className = 'submit-button'
        submit.value = this.submitButtonText
        submit.addEventListener('click', (e) => this.constructor.submitNewObj(e))
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
        e.target.parentNode.parentNode.remove() 
    }

    exitOption() { 
        function addButtonEventListener(renderOtherView) {
            button.addEventListener('click', () => renderOtherView())
        }

        let exitOption = document.createElement('div')
        exitOption.className = 'exit-option'
        let exitText = document.createElement('h4')
        let button = document.createElement('button')
        button.className = 'exit-option'

        let exitOptionContent = this.exitOptionContent()
        exitText.innerText = exitOptionContent.exitText
        button.textContent = exitOptionContent.buttonText
        addButtonEventListener(exitOptionContent.renderFunc)

        exitOption.appendChild(exitText)
        exitOption.appendChild(button)
        return exitOption
    }

    exitOptionContent() {
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
                exitOptionContent.renderFunc = function() {removeNewCupForm(); revealHomeView()}
                return exitOptionContent
        }
    }

    static submitObjConfigObj(method) {
        return {
            method: method,
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            }
        }
    }


}



