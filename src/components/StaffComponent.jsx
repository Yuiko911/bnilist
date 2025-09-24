import './StaffComponent.css'

export default function StaffComponent({ id, name, image, role }) {


	return (
		<a className='staff-card' href={`https://anilist.co/staff/${id}`}>
			<div id='staff-image'>
				<img src={image} alt="" />
			</div>

			<div id='staff-data'>
				<div id='staff-name'>
					{name}
				</div>
				<div id='staff-role'>
					{role}
				</div>
			</div>
		</a>
	)
}