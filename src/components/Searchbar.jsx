import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, createSearchParams } from 'react-router-dom'

import './SearchBar.css'

export default function SearchBar() {
	const [userRequest, setUserRequest] = useState('')
	
	const navigate = useNavigate()
	const params = { query: userRequest };

	// Auto search after timeout
	useEffect(() => {
		if (userRequest.trim() == "") return

		let delaySearch = setTimeout(() => {
			navigate({
				pathname: `/search`,
				search: `?${createSearchParams(params)}`
			})
		}, 750);

		return () => clearTimeout(delaySearch)
	}, [userRequest])

	return (
		<>
			<div id='search-bar'>
				<div id='search-bar-left'>
					<span id='search-bar-icon'>🔎</span>
				</div>
				<div id='search-bar-input'>
					<input type="text" placeholder='Search BniList' onChange={(e) => setUserRequest(e.target.value)} />
				</div>
			</div>
		</>
	)
}