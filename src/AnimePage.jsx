import { data } from "./assets/testresponse.json"

export default function AnimePage({ id }) {

	const animedata = data['Media']

	return (
		<>
			<p>ID : {animedata.id}</p>

			<div id="top-section">
				<div>
					<img src={animedata.bannerImage} alt="" />
					<div id="left">
						<h1>{animedata.title.english}</h1>
						<h2>{animedata.studios.edges[0].node.name}</h2>
						{animedata.genres.map((genre, i) => <p key={i}>{genre}</p>)}
					</div>
					<div id="right">
						<p>{animedata.meanScore/10}/10</p>
					</div>
				</div>

				<div>
					<img src={animedata.coverImage.large} alt="" />
					<p>{animedata.description}</p>
				</div>
			</div>

			<div id="bottom-section">
				<div>
					<h3>Duration</h3>
					<p>{animedata.season} {animedata.seasonYear}</p>
					<p>From {animedata.startDate.day}/{animedata.startDate.month}/{animedata.startDate.year}</p>
					<p>To {animedata.endDate.day}/{animedata.endDate.month}/{animedata.endDate.year}</p>
					<p>{animedata.episodes} episodes</p>

				</div>
				<div>
					<h3>Rankings</h3>
					{animedata.rankings.map((ranking, i) => <span key={i}>{ranking.rank} | </span>)}
				</div>
				<div>
					<h3>Staff</h3>
				</div>
			</div>
		</>
	)
}