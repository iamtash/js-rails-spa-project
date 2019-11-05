function generateNewCupForm() {
    let form = document.createElement('form')
    form.id = 'new-cup'
    form.action = '#'
    form.method = 'post'

    let fieldset = document.createElement('fieldset')
    let legend = document.createElement('legend')
    legend.innerHTML = '<h2>' + 'Sip a cup' + '</h2>'
    fieldset.appendChild(legend)
    
    let objTypes = ['brew', 'roaster']
    objTypes.forEach(objType => fieldset.appendChild(Select.generateObjsDropdown(objType)))
    return form.appendChild(fieldset)
}