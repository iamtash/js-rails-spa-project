class Select {
    constructor(objType) {
        this.type = objType
        this.buildSelectNode(objType)
    }

    buildSelectNode(objType) {
        this.selectNode = document.createElement('select')
        this.selectNode.name = objType
        this.selectNode.id = `${objType}-dropdown`
        this.selectNode.appendChild(this.constructor.renderOption(objType))
    }

    static renderOption(objType, obj, rating) {
        let option = document.createElement('option')
    
        if (objType) option.label = `No ${objType} selected`
        else if (obj) {
            option.value = obj.id
            if (obj.method) option.label = obj.method
            else if (obj.name) option.label = obj.name 
        } else option.value = option.label = rating
    
        return option
    }

    static generateObjsDropdown(objType, roasterId) {
        let selectObj = new Select(objType)
        selectObj.fetchSelectOptions(roasterId) 
        
        if (objType === 'roaster') {
            selectObj.selectNode.addEventListener('change', (e) => { 
                this.generateOrUpdateCoffeeSelect(e)
            })
        }
    
        return selectObj.labeledDropdown
    }

    fetchSelectOptions(roasterId) {
        let url
        
        if (roasterId) url = `${BASE_URL}/roasters/${roasterId}/${this.type}s`
        else url = `${BASE_URL}/${this.type}s`
    
        function renderObjOptions(objs) {
            objs.forEach((obj) => {
                this.selectNode.appendChild(this.constructor.renderOption(null, obj)) 
            })
        }
        
        fetch(url)
        .then(resp => resp.json())
        .then(json => renderObjOptions.call(this, json))
    }

    static generateOrUpdateCoffeeSelect(e) {
        let roasterId = e.target.value
        
        let newCoffeeSelect = this.generateObjsDropdown('coffee', roasterId)
        newCoffeeSelect.addEventListener('change', (e) => { 
            if (!document.querySelector('div .rating-select')) this.generateRatingSelect(e)
        }, {once: true})
    
        let oldCoffeeSelect = document.querySelector('div .coffee-select')
        if (oldCoffeeSelect) oldCoffeeSelect.parentNode.replaceChild(newCoffeeSelect, oldCoffeeSelect)
        else e.target.parentNode.parentNode.appendChild(newCoffeeSelect)
    }

    static generateRatingSelect(e) {
        let ratingSelectObj = new Select('rating')
        const ratings = [1, 2, 3, 4, 5]
        ratings.forEach(rating => ratingSelectObj.selectNode.appendChild(this.renderOption(null, null, rating)))
        e.target.parentNode.parentNode.appendChild(ratingSelectObj.labeledDropdown)
    }

    get labeledDropdown() {
        let labeledDropdown = document.createElement('div')
        labeledDropdown.className = `${this.type}-select`
        labeledDropdown.appendChild(this.selectLabel)
        labeledDropdown.appendChild(this.selectNode)
        return labeledDropdown
    }
    
    get selectLabel() {
        let selectLabel = document.createElement('label')
        selectLabel.for = `${this.type}-dropdown`
    
        if (this.type === 'brew') selectLabel.innerHTML = 'Select a brew method.' + '<br>'
        else if (this.type === 'rating') selectLabel.innerHTML = 'Rate your cup!' + '<br>'
        else selectLabel.innerHTML = `Select a ${this.type}.` + '<br>'

        return selectLabel
    }
}