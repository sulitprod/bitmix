import cn from 'classnames';

function Bit({ color }) {
	return (
		<>
			<p />
			<style jsx>{`
				p {
					background: ${color};
				}
			`}</style>
		</>
	);
}

export default function Grid({ Domination }) {
	return (
		<>
			<div className={cn('grid', { stageAwait: Domination.players.length, stageNo: !Domination.players.length })}>
				{Domination.cells.map((id, key) => {
					const { color } = Domination.players[id];

					return <Bit {...{key, color}} />;
				})}
			</div>
			<style jsx global>{`
				@import 'public/variables.scss';

				@keyframes awaitGradient {
					0% {
					  background-position: 0% 0%;
					}
					50% {
					  background-position: 93% 100%;
					}
					100% {
					  background-position: 0% 0%;
					}
				 }
				 .grid {
					width: 1000px;
					height: 118px;
					background: $bodyBackground;
					color: $bodyBackground;
					border-top: 1px solid;
					border-left: 1px solid; 
					display: flex;
					flex-flow: column wrap;
					box-sizing: border-box;
					
					> p {
						width: 9px;
  						height: 9px;
						margin: 0px;
						border-right: 1px solid;
						border-bottom: 1px solid;
					}

					&.stageNo {
						animation: linear alternate awaitGradient;
						animation-iteration-count: infinite;
						animation-duration: 4s;
						animation-delay: 5s;
						background: linear-gradient(
						-45deg,
						rgb(58, 58, 58),
						$gray,
						rgb(58, 58, 58)
						);
						background-size: 400% 400%;
							
							> p {
								background: transparent;
							}
					}
				}
			`}</style>
			{/* <style jsx>{`
				.grid {
					> p:nth-child(722) {
						box-shadow: 0 0 10px 4px black;
						z-index: 2;
					}
				}
			`}</style> */}
		</>
	);
}
