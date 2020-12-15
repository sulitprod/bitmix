import Coins from '../Coins';
import Photo from '../Photo';

const winners = [
	{
		photo_50: 'favicon.png',
	},
	{
		photo_50: 'favicon.png',
	},
	{
		photo_50: 'favicon.png',
	},
	{
		photo_50: 'favicon.png',
	},
	{
		photo_50: 'favicon.png',
	},
];

export default function FooterPanel() {
	const Domination = {
		players: [
			{
				photo_50: 'favicon.png',
				percent: 30,
				count: 150,
				color: 'hsl(17, 100%, 75%)' // rndColor()
			},
			{
				photo_50: 'favicon.png',
				percent: 20,
				count: 100,
				color: 'hsl(152, 100%, 75%)'
			},
			{
				photo_50: 'favicon.png',
				percent: 50,
				count: 250, 
				color: 'hsl(67, 100%, 75%)'
			}
		]
	}

	return (
		<>
			<div className="footerPanel">
				<div className="winners">
					<ul>
						{winners.map(({ photo_50 }, key) => (
							<li key={key}>
								<Photo src={photo_50} />
							</li>
						))}
					</ul>
					<p className="separator">•</p>
					<p>Последние победители</p>
				</div>
				<div className="sum">
					<p>Общая сумма</p>
					<p className="separator">•</p>
					<Coins value={Domination.players.reduce((all, { count }) => all + count, 0)} />
				</div>
			</div>
			<style jsx>{`
				@import 'public/variables.scss';

				.footerPanel {
					align-items: center;
					display: flex;
					justify-content: space-between;
					width: 998px;
					color: $white;

					> div {
						align-items: center;
						display: flex;

						> .separator {
							padding: 0 $pg8;
						}
					}

					> .winners {
						> ul {
							display: flex;

							> li {
								margin-right: $pg8;

								&:nth-last-child(1) {
									margin-right: 0;
								}
							}
						}
					}
				}
			`}</style>
		</>
	);
}