import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, createSearchParams } from 'react-router-dom'

// TODO: Style
export default function SearchBar() {
	const [userRequest, setUserRequest] = useState('')
	
	const navigate = useNavigate()
	const params = { query: userRequest };

	// Auto search after timeout
	useEffect(() => {
		if (userRequest == "") return

		let delaySearch = setTimeout(() => {
			navigate({
				pathname: `/search`,
				search: `?${createSearchParams(params)}`
			})
		}, 1500);

		return () => clearTimeout(delaySearch)
	}, [userRequest])

	const goToAnime = () => navigate(`/anime/${userRequest}`)

	return (
		<>
			<nav id='searchbar'>
				<input type="text" onChange={(e) => setUserRequest(e.target.value)} />

				<button onClick={goToAnime}>Go to anime</button>
			</nav>
		</>
	)
}