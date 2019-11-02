let fieldset

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
    fieldset.appendChild(generateObjsDropdown('roaster'))

    return form
}



function generateObjsDropdown(objType, roasterId) {
    function buildSelectElement(objType, roasterId) {
        let url
        
        if (roasterId) url = `${BASE_URL}/roasters/${roasterId}/${objType}s`
        else url = `${BASE_URL}/${objType}s`
    
        let dropdown = document.createElement('select')
        dropdown.name = objType
        dropdown.id = `${objType}-dropdown`
    
        function renderObjOptions(objs) {
            objs.forEach((obj) => {
                dropdown.appendChild(renderObjOption(obj))
            })
        }
    
        fetch(url)
        .then(resp => resp.json())
        .then(json => renderObjOptions(json))

        return dropdown
    }

    function buildSelectLabel(objType) {
        labeledDropdown = document.createElement('label')
    
        if (objType === 'brew') {
            labeledDropdown.innerHTML = 'Select a brew method.' + '<br>'
        } else {
            labeledDropdown.innerHTML = `Select a ${objType}.` + '<br>'
        }

        return labeledDropdown
    }

    let dropdown = buildSelectElement(objType, roasterId)
    
    if (objType === 'roaster') {
        (function () { 
            dropdown.addEventListener('change', (e) => { 
                roasterId = e.target.value
                e.target.parentNode.appendChild(buildSelectLabel('coffee')).appendChild(generateObjsDropdown('coffee', roasterId))
            })}
        )()
    }
    
    return buildSelectLabel(objType).appendChild(dropdown)
}

function renderObjOption(obj) {
    let option = document.createElement('option')
    option.value = obj.id

    if (obj.method) option.label = obj.method
    else if (obj.name) option.label = obj.name

    return option
}

