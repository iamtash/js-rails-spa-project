function generateNewCupForm() {
    let form = document.createElement('form')
    form.id = 'new-cup'
    form.action = '#'
    form.method = 'post'

    let fieldset = document.createElement('fieldset')
    let legend = document.createElement('legend')
    legend.innerHTML = '<h2>' + 'Sip a cup' + '</h2>'
    fieldset.appendChild(legend)

    form.appendChild(fieldset).appendChild(generateObjsDropdown('brew'))
    form.appendChild(fieldset).appendChild(generateObjsDropdown('roaster'))

    return form
}

function generateObjsDropdown(objType) {
    let objDropdownLabel = document.createElement('label')

    if (objType === 'brew') {
        objDropdownLabel.innerHTML = 'Select a brew method.' + '<br>'
    } else if (objType === 'roaster') {
        objDropdownLabel.innerHTML = 'Select a roaster.' + '<br>'
    }

    let dropdown = document.createElement('select')
    dropdown.name = objType
    dropdown.id = `${objType}-dropdown`

    function renderObjOptions(objs) {
        objs.forEach((obj) => {
            dropdown.appendChild(renderObjOption(obj))
        })
    }

    fetch(`${BASE_URL}/${objType}s`)
        .then(resp => resp.json())
        .then(json => renderObjOptions(json))
    
    objDropdownLabel.appendChild(dropdown)
    return objDropdownLabel
}

function renderObjOption(obj) {
    let option = document.createElement('option')
    option.value = obj.id

    if (obj.method) option.label = obj.method
    else if (obj.name) option.label = obj.name

    return option
}
