import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import SearchBar from './components/Searchbar'

import './App.css'

import AnimePage from './AnimePage'
import SearchPage from './SearchPage'

function App() {
	return (
		<BrowserRouter>

			<span id='search-bar-container'>
				<SearchBar></SearchBar>
			</span>

			<Routes>
				<Route path='/' element={<></>}></Route>
				<Route path='/search' element={<SearchPage />}></Route>
				<Route path='/anime/:id' element={<AnimePage />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
