import './style.scss'
import { fetchCats } from './api'
import { renderCards } from './ui'
import { enableSwipe } from './swipe'

async function init() {
	const loading = document.getElementById("loading") as HTMLElement
	loading.style.display = "flex"

	const cats = await fetchCats(10)

	await Promise.all(
		cats.map(
			url =>
				new Promise(resolve => {
					const img = new Image()
					img.src = url
					img.onload = resolve
					img.onerror = resolve
				})
		)
	)

	renderCards(cats)
	enableSwipe(cats)

	loading.style.display = "none"
}

init()