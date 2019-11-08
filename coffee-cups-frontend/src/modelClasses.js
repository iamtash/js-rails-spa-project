class Cup {
    constructor(id, user, brew, coffee, rating, createdAt) {
        this.id = id 
        this.user = user
        this.brew = brew
        this.coffee = coffee
        this.rating = rating
        this.createdAt = createdAt
    }

    static buildCupObjects(cups) {
        return cups.map((cup) => {
            return new Cup(cup.id, cup.user, cup.brew, cup.coffee, cup.rating, cup.created_at)
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
        cupText.innerHTML = `${this.userName} had ${this.aOrAn} ${this.brew.method} on ${this.postDate}.` + '<br>' + `Coffee: ${this.coffee.name}` + '<br>' + `Roaster: ${this.coffee.roaster.name}` + '<br>' + `Rating: ${this.rating.rating}`
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

    get aOrAn() {let vowels = /[aeiouAEIOU]/
        if (vowels.test(this.brew.method.charAt(0))) return 'an'
        return 'a'
    }

    get userName() {
        return this.user.name.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')
    }
}

class User {
    constructor(id, name, email) {
        this.id = id
        this.name = name
        this.email = email
    }
}


