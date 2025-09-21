import { useNavigate } from 'react-router-dom'

import './AnimeCard.css'

export default function AnimeCard({ id, title, coverImage }) {

	let displayTitle = title.english ? title.english : title.romaji

	const navigate = useNavigate()
	const goToAnime = () => navigate(`/anime/${id}`)

	return (
		<div id="card" onClick={goToAnime}>

			<div id='card-background'>
				<img src={coverImage.large} alt="" />
			</div>

			<div id='card-name'>
				<span>
				{displayTitle}
				</span>
			</div>
		</div>
	)
}