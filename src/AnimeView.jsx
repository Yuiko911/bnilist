import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { LoadingPage, FailurePage } from "./StatusPage"

import RankingComponent from "./components/RankingComponent"
import GenreComponent from "./components/GenreComponent"
import StaffComponent from "./components/StaffComponent"
import './AnimeView.css'

export default function AnimeView() {
	const { id } = useParams()

	const query = `
	query Query ($id: Int) {
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

		staff {
			edges {
				role
				node {
					id
					name {
						full
					}
					image {
						medium
					}
				}
      		}
    	}
	}
}
		`

	let [animedata, setAnimeData] = useState(null)
	let [title, setTitle] = useState('')

	let [requestfailure, setRequestFailure] = useState('')

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

		fetch('https://graphql.anilist.co', options)
			.then(result => {
				if (result.ok) {
					return result
				} else {
					console.log(result)
					throw new Error(result.status)
				}
			})
			.then(result => result.json())
			.then((json) => {
				if (!ignore) {
					setAnimeData(json['data']['Media']);
					console.log(json['data']['Media']);

					if (json['data']['Media'].title.english) {
						setTitle(json['data']['Media'].title.english)
						document.title = `BniList - ${json['data']['Media'].title.english}`;
					} else {
						setTitle(json['data']['Media'].title.native)
						document.title = `BniList - ${json['data']['Media'].title.native}`;
					}

				}
			})
			.catch((reason) => {
				setRequestFailure(reason.message)
			})

		return () => {
			ignore = true;
		};
	}, [id])

	if (requestfailure) return FailurePage(requestfailure)
	if (animedata === null) return LoadingPage()

	// Helper functions
	function dateAsString(d, m, y) {
		if ((d || m || y) == null) return null

		const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		return `${d || ""} ${month[m] || ""} ${y || ""}`
	}

	function capitalize(t) {
		return String(t).charAt(0).toUpperCase() + String(t).slice(1).toLocaleLowerCase();
	}

	const switchTitle = () => {
		if (animedata.title.english == null) {
			setTitle(animedata.title.native)
			return
		}

		if (animedata.title.native == null) {
			setTitle(animedata.title.english)
			return
		}

		console.log("switching")

		setTitle((title == animedata.title.english) ? animedata.title.native : animedata.title.english)
	}


	let startDate = dateAsString(animedata.startDate.day, animedata.startDate.month, animedata.startDate.year)
	let endDate = dateAsString(animedata.endDate.day, animedata.endDate.month, animedata.endDate.year)

	let season = (() => {
		if (!(animedata.season || animedata.seasonYear)) return "Unknown"

		return `${capitalize(animedata.season) || ""} ${animedata.seasonYear || ""}`
	})()

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

					<a id="top-image-container" style={{ pointer: "clicker" }} href={`https://anilist.co/anime/${animedata.id}`}>
						<img src={animedata.coverImage.large} alt="" />
					</a>

					<div id="top-info">
						<div id="top-spacer"></div>
						<div id="top-metadata">
							<div id="top-name-and-studio">
								<h1 onClick={switchTitle}>{title}</h1>
								<h2>{animedata.studios.edges[0] ? animedata.studios.edges[0].node.name : ""}</h2>
								<div id="top-genres">
									{animedata.genres.map((genre, i) => <GenreComponent key={i} name={genre} />)}
								</div>
							</div>
							<div id="top-rating">
								<span id="top-rating-rating">⭐ {animedata.meanScore / 10}</span><span id="top-rating-outof">/10</span>
							</div>

						</div>
						<div id="top-description">
							{/*  >:3c  */}
							<div dangerouslySetInnerHTML={({ __html: animedata.description })}></div>
						</div>
					</div>
				</div>
			</div>

			<div id="bottom-section">
				<div id="bottom-content">

					<div id="bottom-timedata">
						<p className="timedata-sub-title">Season</p>
						<p className="timedata-text">{season}</p>

						<p className="timedata-sub-title">Start date</p>
						<p className="timedata-text">{startDate || "Unknown"}</p>

						<p className="timedata-sub-title">End date</p>
						<p className="timedata-text">{endDate || "Unknown"}</p>

						{animedata.episodes != null ? <>
							<p className="timedata-sub-title">Episodes</p>
							<p className="timedata-text">{animedata.episodes} episodes</p>
						</> : ""}

						{animedata.duration != null ? <>
							<p className="timedata-sub-title">Episode Duration</p>
							<p className="timedata-text">{animedata.duration} minutes</p>
						</> : ""}
					</div>
					<div id="bottom-staff">
						<div id="bottom-staff-container">
							{animedata.staff ? <>
								{animedata.staff.edges.map((staff, i) => <StaffComponent key={i} id={staff.node.id} name={staff.node.name.full} image={staff.node.image.medium} role={staff.role} />)}
							</> : <></>}
						</div>


					</div>
					<div id="bottom-ranking">
						{animedata.rankings ? <>
							{animedata.rankings.map((ranking, i) => <RankingComponent key={i} ranking={ranking} />)}
						</> : <>
							<h2>No ranking</h2>
						</>}
					</div>
				</div>
			</div>

		</>
	)
}
