export default function Leaders({ info }) {
	return (
		<>
			<main>
				<div className="info">
					
				</div>
				<div className="content">
					
				</div>
			</main>
			<style jsx>{`
			
			`}</style>
		</>
	)
}

export async function getServerSideProps() {
	const props = {
		info: [
			{
				photo_50: 'favicon.png',
				name: 'Алена',
				count: 15032
			},
			{
				photo_50: 'favicon.png',
				name: 'Павел',
				count: 8062
			},
			{
				photo_50: 'favicon.png',
				name: 'Супер-убийца',
				count: 3044
			}
		]
	}

	return { props }
}