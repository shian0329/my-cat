export function renderCards(cats: string[]) {
    const app = document.getElementById('app')!
    app.innerHTML = '<h2>Swipe your cats!</h2>'

    // Card container
    const cardContainer = document.createElement('div')
    cardContainer.className = 'card-container'

    cats.forEach((url, index) => {
        const card = document.createElement('div')
        card.className = 'card'
        card.style.zIndex = String(cats.length - index)

        const img = document.createElement('img')
        img.src = url
        img.style.width = '100%'
        img.style.height = '100%'
        img.style.objectFit = 'cover'

        card.appendChild(img)
        cardContainer.appendChild(card)
    })

    app.appendChild(cardContainer)
}

export function showSummary(likedCats: string[]) {
    const app = document.getElementById('app')!
    app.innerHTML = `
    <h2>You liked ${likedCats.length} cats 🐱❤️</h2>
    <div class="liked-gallery"></div>
  `

    const gallery = app.querySelector('.liked-gallery') as HTMLElement

    likedCats.forEach(url => {
        const img = document.createElement('img')
        img.src = url
        img.style.width = '100px'
        img.style.margin = '8px'
        img.style.borderRadius = '8px'
        gallery.appendChild(img)
    })
}