class NewCupForm extends Form {
    constructor (objType) {
        super(objType)

        const objTypes = ['brew', 'roaster']
        objTypes.forEach(objType => this.inputFields.appendChild(ModelSelect.generateObjsDropdown(objType)))

        this.assembleFormElements()
    }

    static submitNewObj(e) {
        super.submitNewObj(e)
        const configObj = Object.assign({}, NewCupForm.submitObjConfigObj('POST'), NewCupForm.newCupConfigObjBody(e))
        NewCupForm.fetchNewCup(configObj)
    }

    static newCupConfigObjBody(e) {
        try {
            let data = {
                cup: {
                    user_id: currentUser.id,
                    brew_id: e.target.parentNode.elements.brew.value,
                    coffee_id: e.target.parentNode.elements.coffee.value,
                    rating_attributes: {
                        rating: e.target.parentNode.elements.rating.value
                    }
                }
            }
            return { body: JSON.stringify(data) }
        } catch {
            console.log('Issue submitting new cup data')
            renderNewCupForm()
        }
    }

    static fetchNewCup(configObj) {
        fetch(CUPS_URL, configObj)
            .then(resp => resp.json())
            .then(newCup => this.addNewCupToDOM(newCup)) 
            .catch(error => {
                console.log(error.message)
                renderNewCupForm()
            })
    }

    static addNewCupToDOM(cupAttributes) {
        let newCup = new Cup(cupAttributes)
        cupsContainer.prepend(newCup.renderCup())
        document.querySelector('#new-cup-button').style.display = 'block'
        cupsContainer.style.display = 'block'
    }
}