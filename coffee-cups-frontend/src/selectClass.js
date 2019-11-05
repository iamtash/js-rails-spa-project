class Select {
    constructor(objType) {
        this.type = objType
        this.selectNode = document.createElement('select')
        this.selectNode.name = objType
        this.selectNode.id = `${objType}-dropdown`
        this.selectNode.appendChild(this.constructor.renderObjOption(null, objType))
    }

    static renderObjOption(obj, objType, rating) {
        let option = document.createElement('option')
    
        if (obj) {
            option.value = obj.id
            if (obj.method) option.label = obj.method
            else if (obj.name) option.label = obj.name 
        } else if (rating) option.value = option.label = rating
        else option.label = `No ${objType} selected`
    
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
                this.selectNode.appendChild(this.constructor.renderObjOption(obj)) 
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
        ratings.forEach(rating => ratingSelectObj.selectNode.appendChild(this.renderObjOption(undefined, undefined, rating)))
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