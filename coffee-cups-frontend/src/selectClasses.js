class SelectHelper {
    constructor(objType) { 
        this.type = objType
        this.buildSelectNode(objType)
    }

    buildSelectNode(objType) {
        this.selectNode = document.createElement('select')
        this.selectNode.name = objType
        this.selectNode.id = `${objType}-dropdown`
        this.selectNode.appendChild(this.renderOption())
    }

    renderOption(obj) {
        let option = document.createElement('option')
        option.label = this.optionLabel(obj)
        option.value = this.optionValue(obj)
        return option
    }

    optionLabel(obj) { 
        if (!obj) return `No ${this.type} selected`
        else if (this.type === 'brew') return obj.method
        else if (this.type === 'rating') return obj
        return obj.name
    }

    optionValue(obj) {
        if (!obj) return '' 
        else if (obj.id) return obj.id 
        return obj
    }

    createLabeledDropdown() { 
        let labeledDropdown = document.createElement('div')
        labeledDropdown.className = `${this.type}-select`
        labeledDropdown.appendChild(this.createSelectLabel())
        labeledDropdown.appendChild(this.selectNode)
        return labeledDropdown
    }
    
    createSelectLabel() { 
        let selectLabel = document.createElement('label')
        selectLabel.for = `${this.type}-dropdown`
    
        if (this.type === 'brew') selectLabel.innerHTML = 'Select a brew method.' + '<br>'
        else if (this.type === 'rating') selectLabel.innerHTML = 'Rate your cup!' + '<br>'
        else selectLabel.innerHTML = `Select a ${this.type}.` + '<br>'

        return selectLabel
    }
}

class ModelSelect {
    constructor(selectHelper, cup) {
        this.selectHelper = selectHelper
        this.cup = cup
    }
    
    static generateObjsDropdown(objType, roasterId, cup) { 
        let selectObj = new ModelSelect(new SelectHelper(objType), cup)
        if (cup && objType === 'coffee') roasterId = cup.coffee.roaster.id
        selectObj.fetchSelectOptions(roasterId) 
    
        if (objType === 'roaster' && !selectObj.cup) {
            selectObj.selectHelper.selectNode.addEventListener('change', (e) => { 
                this.generateOrUpdateCoffeeSelect(e)
            })
        }
    
        return selectObj.selectHelper.createLabeledDropdown()
    }
    
    fetchSelectOptions(roasterId) {
        let url
        
        if (roasterId) url = `${BASE_URL}/roasters/${roasterId}/${this.selectHelper.type}s`
        else url = `${BASE_URL}/${this.selectHelper.type}s`
    
        const renderObjOptions = (objs) => {
            objs.forEach((obj) => {
                this.selectHelper.selectNode.appendChild(this.selectHelper.renderOption(obj)) 
            })
        }
        
        fetch(url)
        .then(resp => resp.json())
        .then(json => renderObjOptions(json)) 
        .then(() => this.preselectOption())
        .catch(error => console.log(error.message))
    }

    preselectOption() {
        if (this.cup) {
            if (['brew', 'coffee'].includes(this.selectHelper.type)) {
                document.querySelector(`div.edit-cup-div[data-id='${this.cup.id}'] select#${this.selectHelper.type}-dropdown`).value = this.cup[this.selectHelper.type].id
            }
            else if (this.selectHelper.type === 'roaster') {
                document.querySelector(`div.edit-cup-div[data-id='${this.cup.id}'] select#${this.selectHelper.type}-dropdown`).value = this.cup.coffee[this.selectHelper.type].id
            }
        }
    }


    static generateOrUpdateCoffeeSelect(e) { 
        let roasterId = e.target.value
        
        let newCoffeeSelect = this.generateObjsDropdown('coffee', roasterId)
        newCoffeeSelect.addEventListener('change', (e) => { 
            if (!document.querySelector('div#new-cup-div div.rating-select')) RatingSelect.renderRatingSelect(e)
        }, {once: true})
    
        let oldCoffeeSelect = document.querySelector('div#new-cup-div div.coffee-select')
        if (oldCoffeeSelect) oldCoffeeSelect.parentNode.replaceChild(newCoffeeSelect, oldCoffeeSelect)
        else e.target.parentNode.parentNode.appendChild(newCoffeeSelect)
    }
} 

class RatingSelect {
    constructor(selectHelper) {
        this.selectHelper = selectHelper
    }

    static generateRatingSelect(cup) {
        const ratingSelectObj = new RatingSelect(new SelectHelper('rating'))
        const ratings = [1, 2, 3, 4, 5]
        ratings.forEach(rating => ratingSelectObj.selectHelper.selectNode.appendChild(ratingSelectObj.selectHelper.renderOption(rating)))
        if (cup) ratingSelectObj.selectHelper.selectNode.value = cup.rating.rating
        return ratingSelectObj.selectHelper.createLabeledDropdown()
    }

    static renderRatingSelect(e) { 
        e.target.parentNode.parentNode.appendChild(this.generateRatingSelect())
    }
}