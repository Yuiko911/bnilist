import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'

import AnimePage from './AnimePage'
import SearchPage from './SearchPage'

function App() {
	const [userRequest, setUserRequest] = useState('')

	return (
		<BrowserRouter>

			{/* <nav id='searchbar'>
				<input type="text" onChange={(e) => setUserRequest(e.target.value)} />
				<Link to={"/search"}>Go to search</Link> | {""}
				<Link to={"/anime"}>Go to anime</Link>
			</nav> */}

			<Routes>
				<Route path='/' element={<></>}></Route>
				<Route path='/search' element={<SearchPage id={userRequest} />}></Route>
				<Route path='/anime' element={<AnimePage id={userRequest} />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
