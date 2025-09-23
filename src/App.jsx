import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import SearchBar from './components/Searchbar'

import './App.css'

import AnimeView from './AnimeView'
import SearchView from './SearchView'

function App() {
	return (
		<BrowserRouter>

			<span id='search-bar-container'>
				<SearchBar></SearchBar>
			</span>

			<Routes>
				<Route path='/' element={<></>}></Route>
				<Route path='/search' element={<SearchView />}></Route>
				<Route path='/anime/:id' element={<AnimeView />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
