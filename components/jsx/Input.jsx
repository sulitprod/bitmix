export default function Input({ 
	left, 
	right, 
	placeholder, 
	value, 
	onChange 
}) {
	return (
		<>
			<div className="input">
				{left && <div className="component left">{left}</div>}
				<input {...{ placeholder, value, onChange }} />
				{right && <div className="component right">{right}</div>}
			</div>
			<style jsx>{`
				@import 'public/variables.scss';

				.input {
					background: $gray;
					color: $white;
					display: block;
					text-align: left;

					> div {
						display: inline-block;
						line-height: 0;
						vertical-align: middle;
					}

					.component {
						&.left {
							margin-right: $pg8;
						}

						&.right {
							margin-left: $pg8;
						}
					}

					> input {
						background: transparent;
						color: unset;
						padding: $pg8;
					}
				}
			`}</style>
		</>
	);
}
