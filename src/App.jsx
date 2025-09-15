import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import AnimePage from './Anime'

function App() {
	const [userRequest, setUserRequest] = useState('')

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>

			<input type="text" onChange={(e) => setUserRequest(e.target.value)}/>
			<p>{userRequest}</p>

			<AnimePage />
		</>
	)
}

export default App
