import './RankingComponent.css'

export default function RankingComponent({ ranking }) { 

	function capitalize(t) {
		return String(t).charAt(0).toUpperCase() + String(t).slice(1).toLocaleLowerCase();
	}

	const type_rated = ranking.type === "RATED"
	const type_text = type_rated ? "Highest Rated" : "Most Popular"

	let time_text

	if (ranking.allTime) {
		time_text = "All Time" // All Time
	} else if (ranking.season == null) {
		time_text = `${ranking.year}` // Year
	} else {
		time_text = `${capitalize(ranking.season)} ${ranking.year}` // Season
	} 
	
	return (
        <div className='ranking-card'>
			{type_rated ? "⭐" : "❤️"} #<span className="bold">{ranking.rank}</span> {type_text} {time_text}
        </div>
    )
}