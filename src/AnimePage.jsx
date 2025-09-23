import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import RankingComponent from "./components/RankingComponent"
import './AnimePage.css'
import GenreComponent from "./components/GenreComponent"

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
	let [title, setTitle] = useState('')

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

					setTitle(json['data']['Media'].title.english)
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

	// let title = animedata.title.english || animedata.title.native

	const switchTitle = () => {
		console.log("switching")

		if (animedata.title.english == null) setTitle(animedata.title.native) 
		if (animedata.title.native == null) setTitle(animedata.title.english) 

		setTitle(title == animedata.title.english ? animedata.title.native : animedata.title.english)
	}


	let startDate = dateAsString(animedata.startDate.day, animedata.startDate.month, animedata.startDate.year)
	let endDate = dateAsString(animedata.endDate.day, animedata.endDate.month, animedata.endDate.year)

	// TODO: Handle unreleased anime

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

				{/* TODO: Content fill background */}
				<div id="top-content">

					<a id="top-image-container" style={{pointer: "clicker"}} href={`https://anilist.co/anime/${animedata.id}`}>
						<img src={animedata.coverImage.large} alt="" />
					</a>

					<div id="top-info">
						<div id="top-metadata">
							<div id="top-name-and-studio">
								<h1 onClick={switchTitle}>{title}</h1>
								<h2>{animedata.studios.edges[0] ? animedata.studios.edges[0].node.name : ""}</h2>
								<div id="top-genres">
									{animedata.genres.map((genre, i) => <GenreComponent key={i} name={genre}/>)}
								</div>
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
						{/* TODO: Staff */}

					</div>
					<div id="bottom-ranking">
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