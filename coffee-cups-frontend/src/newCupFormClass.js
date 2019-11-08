class NewCupForm extends Form {
    constructor (objType) {
        super(objType)

        const objTypes = ['brew', 'roaster']
        objTypes.forEach(objType => this.inputFields.appendChild(Select.generateObjsDropdown(objType)))

        this.assembleFormElements(this.constructor.submitNewObj)
    }

    static submitNewObj(e) {
        super.submitNewObj(e)
        let configObj = Object.assign({}, newObjConfigObj, NewCupForm.newCupConfigObjBody(e))
        NewCupForm.fetchNewCup(configObj)
    }

    static newCupConfigObjBody(e) {
        let data = {
            cup: {
                user_id: currentUser.id,
                brew_id: e.target.form.elements.brew.value,
                coffee_id: e.target.form.elements.coffee.value,
                rating_attributes: {
                    rating: e.target.form.elements.rating.value
                }
            }
        }
        return { body: JSON.stringify(data) }
    }

    static fetchNewCup(configObj) {
        fetch(CUPS_URL, configObj)
            .then(resp => resp.json())
            .then(newCup => this.addNewCupToDOM(newCup)) 
            .catch(error => console.log(error.message))
    }

    static addNewCupToDOM(cup) {
        let newCup = new Cup(cup.id, cup.user, cup.brew, cup.coffee, cup.rating, cup.created_at)
        cupsContainer.prepend(newCup.renderCup())
        document.querySelector('#new-cup-button').style.display = 'block'
        cupsContainer.style.display = 'block'
    }
}