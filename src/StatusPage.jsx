import './StatusPage.css'

function LoadingPage() {
	return (
		<div id="center">
			<h1>Loading...</h1>
		</div>
	)
}

function FailurePage(reason) {
	return (
		<div id="center">
			<h1>Failed to load the page</h1>
			<p>{reason}</p>
			<p style={{fontStyle: "italic"}}>See the console for more information</p>
		</div>
	)
}

export { LoadingPage, FailurePage }