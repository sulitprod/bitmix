import Icon from './Icon';

export default function Coins({ value }) {
	return (
		<>
			<div className="coins">
				<Icon src="coins" />
				<p>{value}</p>
			</div>
			<style jsx global>{`
				@import 'public/variables.scss';

				.coins {
					color: $white;
					display: inline-block;
					line-height: 0;
					white-space: nowrap;

					> * {
						display: inline-block;
						vertical-align: middle;
					}

					> .icon {
						margin-right: $pg4;
					}

					> p {
						font-weight: 600;
						line-height: 16px;
					}
				}
			`}</style>
		</>
	);
}
