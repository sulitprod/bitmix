import Photo from '../Photo';
import { rndColor } from '../../../utils';
import Icon from '../Icon';

function Player({ photo_50, percent, color }) {
	return (
		<>
			<div className="player">
				<div className="line">
					<div />
				</div>
				<Photo src={photo_50} />
			</div>
			<style jsx>{`
				.player {
					> .line {
						> div {
							background: ${color};
							height: ${percent}px;
							width: 100%;
						}
					}
				} 
			`}</style>
		</>
	);
}

export default function Players() {
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
			<div className="players">
				{Domination.players.length ? Domination.players.map((player, key) => (
					<Player key={key} {...player} />
				)) : 
				<div className="giftText">
					<Icon src="gift" width={64} />
					<p>Добавьте к игре биты первым и получите дополнительные 2% при выигрыше!</p>
				</div>}
			</div>
			<style jsx global>{`
				@import 'public/variables.scss';
				
				.players {
					display: flex;
					height: 140px;

					> .giftText {
						text-align: center;
						color: $lightGray;
						display: flex;
						flex-direction: column;
						justify-content: center;
						
						> .icon {
							fill: $lightGray;
						}
						> * {
							padding: $pg8;
						}
					}

					.player {
						display: flex;
						flex-direction: column;
						margin-right: $pg8;
						width: 40px;

						> .line {
							align-items: flex-end;
							display: flex;
							height: 100px;
							width: 100%;
						}

						&:nth-last-child(1) {
							margin-right: 0;
						}
					}
				}
			`}</style>
		</>
	);
}
