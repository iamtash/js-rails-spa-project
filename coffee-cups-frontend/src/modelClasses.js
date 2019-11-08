class Cup {
    constructor(attributes) {
        this.id = attributes.id 
        this.user = new User(attributes.user)
        this.brew = attributes.brew
        this.coffee = attributes.coffee
        this.rating = attributes.rating
        this.createdAt = attributes.created_at
    }

    static buildCupObjects(cups) {
        return cups.map((cupAttributes) => {
            return new Cup(cupAttributes)
        })
    }

    renderCup() {
        const cupDiv = document.createElement('div')
        cupDiv.className = 'cup-card'
        cupDiv.dataset.id = this.id
        cupDiv.dataset.userId = this.user.id
        const cupText = document.createElement('span')
        cupText.className = 'text'
        cupDiv.appendChild(cupText)
        cupText.innerHTML = `${this.user.capitalizedName} had ${this.aOrAn} ${this.brew.method} on ${this.postDate}.` + '<br>' + `Coffee: ${this.coffee.name}` + '<br>' + `Roaster: ${this.coffee.roaster.name}` + '<br>' + `Rating: ${this.rating.rating}`
        // add buttons and event listeners
        return cupDiv
    }

    static renderCups(cups) {
        const reverseSortedCups = cups.sort((a,b) => Date.parse(`${b.createdAt}`) - Date.parse(`${a.createdAt}`))
        reverseSortedCups.forEach((cup) => {
            cupsContainer.appendChild(cup.renderCup())
        })
    }

    get postDate() {
        let date = new Date(`${this.createdAt}`)
        return date.toDateString()
    }

    get postTime() {
        this.createdAt.split('T')[1]
    }

    get aOrAn() {
        const vowels = /[aeiouAEIOU]/
        return vowels.test(this.brew.method.charAt(0)) ? 'an' :'a'
    }
}

class User {
    constructor(attributes) {
        this.id = attributes.id
        this.name = attributes.name
        this.email = attributes.email
    }

    get capitalizedName() {
        return this.name.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')
    }
}


