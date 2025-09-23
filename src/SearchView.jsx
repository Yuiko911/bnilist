import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import AnimeCard from './components/AnimeCard'

import './SearchView.css'

export default function SearchView() {

	const location = useLocation()
	const urlParams = new URLSearchParams(location.search)
	const userSearch = urlParams.get('query')

	const query = `query Media($page: Int, $mediaSearch: String) {
		Page(page: $page, perPage: 18) {
			media(search: $mediaSearch, type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
				id
				title {
					english
					romaji
				}
				coverImage {
					large
				}
			}
		}
	}
	`

	let [animelist, setAnimeList] = useState(null)
	let [requestfailure, setRequestFailure] = useState('')

	useEffect(() => {
		let ignore = false

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				query: query,
				variables: {
					page: 1,
					mediaSearch: userSearch
				}
			})
		}

		setAnimeList(null)

		// TODO: Error handling
		fetch('https://graphql.anilist.co', options)
			.then(result => result.json())
			.then((json) => {
				if (!ignore) {
					setAnimeList(json['data']['Page']['media']);
					console.log(userSearch)
					console.log(json['data']['Page']['media'])
				}
			})
			.catch((reason) => setRequestFailure(reason))

		return () => {
			ignore = true;
		};
	}, [userSearch])

	// TODO: Better loading screen
	if (animelist === null) return

	return (
		<>
			<div id="cards-container">
				{animelist.map((e, i) => <AnimeCard key={i} {...e} />)}
			</div>
		</>
	)
}