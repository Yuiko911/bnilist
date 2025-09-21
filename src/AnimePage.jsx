import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import RankingComponent from "./components/RankingComponent"
import './AnimePage.css'

export default function AnimePage() {
	const { id } = useParams()

	// TODO: Mettre dans un fichier à part
	const query = `query Query ($id: Int) {
	  Media (id: $id) {
	    id

	    title {
	      english
	      native
	    }
	    description

	    coverImage {
	      large
	    }
	    bannerImage

	    seasonYear
	    season
	    startDate {
	      day
	      month
	      year
	    }
	    endDate {
	      day
	      month
	      year
	    }

	    rankings {
	      type
	      rank
	      season
	      allTime
	      year
	    }
	    meanScore

	    studios(isMain: true) {
	      edges {
	        node {
	          name
	        }
	      }
	    }

	    genres
	    episodes
	    duration
	  }
	}
		`

	let [animedata, setAnimeData] = useState(null)

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
					id: id
				}
			})
		}

		setAnimeData(null)

		// TODO: Error handling
		fetch('https://graphql.anilist.co', options)
			.then(result => result.json())
			.then((json) => {
				if (!ignore) {
					setAnimeData(json['data']['Media']);
				}
			})


		return () => {
			ignore = true;
		};
	}, [id])

	if (animedata === null) return LoadingAnimePage()

	// Helper functions
	function dateAsString(d, m, y) {
		const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		return `${d} ${month[m]} ${y}`
	}

	function capitalize(t) {
		return String(t).charAt(0).toUpperCase() + String(t).slice(1).toLocaleLowerCase();
	}

	let title = animedata.title.english || animedata.title.native

	let startDate = dateAsString(animedata.startDate.day, animedata.startDate.month, animedata.startDate.year)
	let endDate = dateAsString(animedata.endDate.day, animedata.endDate.month, animedata.endDate.year)

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
						{/* TODO: Go to anilist on click + animation */}
						<img src={animedata.coverImage.large} alt="" />
					</div>

					<div id="top-info">
						<div id="top-metadata">
							<div id="top-name-and-studio">
								{/* TODO: Switch title type on click */}
								<h1>{title}</h1>
								<h2>{animedata.studios.edges[0] ? animedata.studios.edges[0].node.name : ""}</h2>
								{/* TODO: Add genres */}
							</div>
							<div id="top-rating">
								<span id="top-rating-rating">⭐ {animedata.meanScore / 10}</span><span id="top-rating-outof">/10</span>
							</div>

						</div>
						{/*  >:3c  */}
						<div id="top-description" dangerouslySetInnerHTML={({ __html: animedata.description })} />
					</div>
				</div>
			</div>

			<div id="bottom-section">
				<div id="bottom-content">

					<div id="bottom-timedata">
						<p className="timedata-sub-title">Season</p>
						<p className="timedata-text">{capitalize(animedata.season)} {animedata.seasonYear}</p>

						<p className="timedata-sub-title">Start date</p>
						<p className="timedata-text">{startDate}</p>

						<p className="timedata-sub-title">End date</p>
						<p className="timedata-text">{endDate}</p>

						<p className="timedata-sub-title">Episodes</p>
						<p className="timedata-text">{animedata.episodes} episodes</p>

						<p className="timedata-sub-title">Episode Duration</p>
						<p className="timedata-text">{animedata.duration} minutes</p>
					</div>
					<div id="bottom-staff">
						{/* <h3>Staff</h3> */}

					</div>
					<div id="bottom-ranking">
						{/* TODO: top margin */}
						{animedata.rankings.map((ranking, i) => <RankingComponent key={i} ranking={ranking} />)}
					</div>
				</div>
			</div>

		</>
	)
}

function LoadingAnimePage() {
	return (
		<>
		
		</>
	)
}