function renderObjOption(obj, objType, rating) {
    let option = document.createElement('option')

    if (obj) {
        option.value = obj.id
        if (obj.method) option.label = obj.method
        else if (obj.name) option.label = obj.name 
    } else if (rating) option.value = option.label = rating
    else option.label = `No ${objType} selected`

    return option
}

function initializeSelect(objType) {
    let dropdown = document.createElement('select')
    dropdown.name = objType
    dropdown.id = `${objType}-dropdown`
    dropdown.appendChild(renderObjOption(null, objType))
    return dropdown
}

function selectWithOptions(objType, roasterId) {
    let url
    
    if (roasterId) url = `${BASE_URL}/roasters/${roasterId}/${objType}s`
    else url = `${BASE_URL}/${objType}s`

    let dropdown = initializeSelect(objType)

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
    selectLabel = document.createElement('label')
    selectLabel.for = `${objType}-dropdown`

    if (objType === 'brew') selectLabel.innerHTML = 'Select a brew method.' + '<br>'
    else if (objType === 'rating') selectLabel.innerHTML = 'Rate your cup!' + '<br>'
    else selectLabel.innerHTML = `Select a ${objType}.` + '<br>'

    return selectLabel
}

function labelTheDropdown(objType, dropdown) {
    let labeledDropdown = document.createElement('div')
    labeledDropdown.className = `${objType}-select`
    labeledDropdown.appendChild(buildSelectLabel(objType))
    labeledDropdown.appendChild(dropdown)
    return labeledDropdown
}

function generateRatingSelect(e) {
    let ratingDropdown = initializeSelect('rating')
    const ratings = [1, 2, 3, 4, 5]
    ratings.forEach(rating => ratingDropdown.appendChild(renderObjOption(undefined, undefined, rating)))
    e.target.parentNode.parentNode.appendChild(labelTheDropdown('rating', ratingDropdown))
}

function generateOrUpdateCoffeeSelect(e) {
    roasterId = e.target.value
    
    let newCoffeeSelect = generateObjsDropdown('coffee', roasterId)
    newCoffeeSelect.addEventListener('change', (e) => { 
        if (!document.querySelector('div .rating-select')) generateRatingSelect(e)
    }, {once: true})

    let oldCoffeeSelect = document.querySelector('div .coffee-select')
    if (oldCoffeeSelect) oldCoffeeSelect.parentNode.replaceChild(newCoffeeSelect, oldCoffeeSelect)
    else e.target.parentNode.parentNode.appendChild(newCoffeeSelect)
}

function generateObjsDropdown(objType, roasterId) {
    let dropdown = selectWithOptions(objType, roasterId)
    
    if (objType === 'roaster') {
        dropdown.addEventListener('change', (e) => { 
            generateOrUpdateCoffeeSelect(e)
        })
    }
    return labelTheDropdown(objType, dropdown)
}

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
    objTypes.forEach(objType => fieldset.appendChild(generateObjsDropdown(objType)))
    return form.appendChild(fieldset)
}