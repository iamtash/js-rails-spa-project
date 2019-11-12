class InputWithFilter {
    constructor(objType) {
        this.type = objType
        this.fetchObjects()
        this.input = this.buildInput(objType)
    }

    buildInput(objType) {
        let inputDiv = document.createElement('div')
        inputDiv.id = `${objType}-input-div`
        let inputNode = document.createElement('input')
        inputNode.type = 'text'
        inputNode.name = objType
        inputNode.id = `${objType}-input`
        inputNode.className = 'text-input'
        inputNode.placeholder = this.type
        let datalist = document.createElement('datalist')
        datalist.id = `${objType}-suggestions`
        inputNode.setAttribute('list', `${objType}-suggestions`)
        inputNode.addEventListener('keydown', (e) => this.filterObjects(e))
        inputDiv.appendChild(inputNode)
        inputDiv.appendChild(datalist)
        return inputDiv
    }

    fetchObjects() {
        this.objects = []
        let url = `${BASE_URL}/${this.type}s`

        const saveObjects = (objs) => {
            objs.forEach(obj => this.objects.push(obj))
        }
        
        fetch(url)
        .then(resp => resp.json())
        .then(json => saveObjects(json)) 
        .catch(error => console.log(error.message))
    }

    filterObjects(e) {
        let filteredObjects = this.objects.filter(obj => obj.method.includes(e.target.value))
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
        option.value = obj.method
        return option
    }
}