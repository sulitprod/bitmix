export default function Photo({ src, width = 40, height }) {
	height = height || width;

	return (
		<>
			<div className="photo" />
			<style jsx global>{`
				.photo {
					background-image: url(img/${src});
					background-size: cover;
					display: block;
					height: ${height}px;
					width: ${width}px;
				}
			`}</style>
		</>
	);
}
