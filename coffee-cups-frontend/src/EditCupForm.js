const editObjConfigObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
}

class EditCupForm extends Form {
    constructor (objType, e) {
        super(objType)

        const objTypes = ['brew', 'roaster']
        objTypes.forEach(objType => this.inputFields.appendChild(ModelSelect.generateObjsDropdown(objType)))
        
        this.constructor.getCurrentAttributes(e)

        this.assembleFormElements(this.constructor.submitNewObj)
    }

    static getCurrentAttributes(e) {
        const cupURL = `${CUPS_URL}/${e.target.dataset.id}`
        fetch(cupURL)
            .then(resp => resp.json())
            .then(json => console.log(json))
            //.then(cupAttributes => preselectAttributes(cupAttributes))
            .catch(error => console.log(error))
    }

    // static submitNewObj(e) {
    //     super.submitNewObj(e)
    //     const configObj = Object.assign({}, editObjConfigObj, NewCupForm.editCupConfigObjBody(e))

    //     NewCupForm.fetchNewCup(configObj)
    // }

    // static editCupConfigObjBody(e) {
    //     try {
    //         let data = {
    //             cup: {
    //                 user_id: currentUser.id,
    //                 brew_id: e.target.form.elements.brew.value,
    //                 coffee_id: e.target.form.elements.coffee.value,
    //                 rating_attributes: {
    //                     rating: e.target.form.elements.rating.value
    //                 }
    //             }
    //         }
    //         return { body: JSON.stringify(data) }
    //     } catch {
    //         console.log('Issue submitting new cup data')
    //         renderNewCupForm()
    //     }
    // }

    // static fetchEditedCup(configObj) {
    //     fetch(CUPS_URL, configObj)
    //         .then(resp => resp.json())
    //         .then(newCup => this.addNewCupToDOM(newCup)) 
    //         .catch(error => {
    //             console.log(error.message)
    //             renderNewCupForm()
    //         })
    // }

    // static addNewCupToDOM(cupAttributes) {
    //     let newCup = new Cup(cupAttributes)
    //     cupsContainer.prepend(newCup.renderCup())
    //     document.querySelector('#new-cup-button').style.display = 'block'
    //     cupsContainer.style.display = 'block'
    // }
}