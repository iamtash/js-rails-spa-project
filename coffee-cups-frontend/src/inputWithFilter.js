class InputWithFilter {
    constructor(objType) {
        this.type = objType
        this.defineAttribute()
        this.inputDiv = this.buildInputDiv(objType)
        this.fetchObjects()
    }

    defineAttribute() {
        if (this.type === 'brew') this.attribute = 'method'
        else this.attribute = 'name'
    }

    buildInputDiv(objType) {
        let inputDiv = document.createElement('div')
        inputDiv.id = `${objType}-input-div`

        let input = this.buildInput()
        
        let datalist = document.createElement('datalist')
        datalist.id = `${objType}-suggestions`
        input.setAttribute('list', `${objType}-suggestions`)

        inputDiv.appendChild(input)
        inputDiv.appendChild(datalist)
        return inputDiv
    }

    buildInput() {
        let input = document.createElement('input')
        input.type = 'text'
        input.name = input.placeholder = this.type
        input.id = `${this.type}-input`
        input.className = 'text-input'
        input.addEventListener('keydown', (e) => this.filterObjects(e))
        return input
    }

    fetchObjects() {
        this[`${this.type}s`] = []
        let url = `${BASE_URL}/${this.type}s`

        const saveObjects = (objs) => {
            objs.forEach(obj => this[`${this.type}s`].push(obj))
        }
        
        fetch(url)
        .then(resp => resp.json())
        .then(json => saveObjects(json)) 
        .catch(error => console.log(error.message))
    }

    filterObjects(e) {
        let filteredObjects = this[`${this.type}s`].filter(obj => {
            return obj[this.attribute].toLowerCase().includes(e.target.value.toLowerCase())
        })
        this.renderOptions(filteredObjects)
    }

    renderOptions(objs) {
        let datalist = document.querySelector(`datalist#${this.type}-suggestions`)
        datalist.innerHTML = ''
        objs.forEach(obj => datalist.appendChild(this.renderOption(obj)))
    }

    renderOption(obj) {
        let option = document.createElement('option')
        option.dataset.id = obj.id
        option.value = obj[this.attribute]
        return option
    }
}