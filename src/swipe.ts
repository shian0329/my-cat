import { showSummary } from './ui'

let likedCats: string[] = []
let currentIndex = 0

export function enableSwipe(cats: string[]) {
	const cards = document.querySelectorAll<HTMLElement>('.card')

	cards.forEach((card, index) => {
		let startX = 0
		let currentX = 0
		let isDragging = false

		// 👉 Create hint element inside the card
		const hint = document.createElement('div')
		hint.className = 'swipe-hint'
		hint.innerText = 'Swipe'
		card.appendChild(hint)

		// === START (Mouse + Touch) ===
		const start = (x: number) => {
			isDragging = true
			startX = x
			card.style.transition = 'none'
		}

		// === MOVE (Mouse + Touch) ===
		const move = (x: number) => {
			if (!isDragging) return
			currentX = x - startX
			card.style.transform = `translateX(${currentX}px) rotate(${currentX / 20}deg)`

			// 👉 Update hint dynamically
			if (currentX > 0) {
				hint.innerText = 'LIKE 👍'
				hint.style.color = 'green'
				hint.style.opacity = `${Math.min(currentX / 100, 1)}`
			} else {
				hint.innerText = 'NOPE 👎'
				hint.style.color = 'red'
				hint.style.opacity = `${Math.min(Math.abs(currentX) / 100, 1)}`
			}
		}

		// === END (Mouse + Touch) ===
		const end = () => {
			if (!isDragging) return
			isDragging = false
			card.style.transition = '0.3s ease'

			if (currentX > 100) {
				// 👉 Like
				card.style.transform = 'translateX(500px) rotate(15deg)'
				likedCats.push(cats[index])
				currentIndex++
			} else if (currentX < -100) {
				// 👈 Dislike
				card.style.transform = 'translateX(-500px) rotate(-15deg)'
				currentIndex++
			} else {
				// reset
				card.style.transform = ''
				hint.style.opacity = '0'
			}

			// reset values
			currentX = 0
			hint.style.opacity = '0'

			if (currentIndex === cats.length) {
				showSummary(likedCats)
			}
		}

		// === Mouse Events ===
		card.addEventListener("mousedown", (e) => {
			const mouseEvent = e as MouseEvent
			start(mouseEvent.clientX)
		})
		card.addEventListener("mousemove", (e) => {
			const mouseEvent = e as MouseEvent
			move(mouseEvent.clientX)
		})
		card.addEventListener('mouseup', end)
		card.addEventListener('mouseleave', end)

		// === Touch Events ===
		card.addEventListener("touchstart", (e) => {
			const event = e as TouchEvent
			start(event.touches[0].clientX)
		})
		card.addEventListener("touchmove", (e) => {
			const event = e as TouchEvent
			move(event.touches[0].clientX)
		})
		card.addEventListener('touchend', end)
		card.addEventListener('touchcancel', end)

		// === Hint Styling ===
		hint.style.position = 'absolute'
		hint.style.top = '20px'
		hint.style.left = '50%'
		hint.style.transform = 'translateX(-50%)'
		hint.style.fontSize = '1.5rem'
		hint.style.fontWeight = 'bold'
		hint.style.opacity = '0'
		hint.style.transition = 'opacity 0.2s ease'
	})
}