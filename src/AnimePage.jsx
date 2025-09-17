import { data } from "./assets/testresponse.json"

import './AnimePage.css'

export default function AnimePage({ id }) {

	const animedata = data['Media']

	return (
		<>
			<div id="top-section">
				<div id="top-background">
					<span id="banner-image-container">
						<img src={animedata.bannerImage} alt="" />
						<div id="banner-image-effects"></div>
					</span>
					<div id="white-description-background"> </div>
				</div>

				<div id="top-content">

					<div id="top-image-container">
						<img src={animedata.coverImage.large} alt="" />
					</div>

					<div id="top-info">
						<div id="top-metadata">
							<div id="top-name-and-studio">
								<h1>{animedata.title.english}</h1>
								<h2>{animedata.studios.edges[0].node.name}</h2>
								{/* TODO: Add genres */}
							</div>
							<div id="top-rating">
								<span id="top-rating-rating">{animedata.meanScore/10}</span><span id="top-rating-outof">/10</span>
							</div>

						</div>
						<div id="top-description">
							{animedata.description}
						</div>
					</div>
				</div>
			</div>

			<div id="bottom-section">
				<div>
					{/* <h3>Duration</h3> */}
					{/* <p>{animedata.season} {animedata.seasonYear}</p>
					<p>From {animedata.startDate.day}/{animedata.startDate.month}/{animedata.startDate.year}</p>
					<p>To {animedata.endDate.day}/{animedata.endDate.month}/{animedata.endDate.year}</p>
					<p>{animedata.episodes} episodes</p> */}

				</div>
				<div>
					{/* <h3>Rankings</h3>
					{animedata.rankings.map((ranking, i) => <span key={i}>{ranking.rank} | </span>)} */}
				</div>
				<div>
					{/* <h3>Staff</h3> */}

				</div>
			</div>

		</>
	)
}