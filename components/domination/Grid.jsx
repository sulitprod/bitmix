import cn from 'classnames';
import styled, { keyframes } from 'styled-components';

const gradient = keyframes`
	0% {
		background-position: 0% 0%;
	}
	50% {
		background-position: 93% 100%;
	}
	100% {
		background-position: 0% 0%;
	}
`;
const Bit = styled.p`
	background: ${p => p.bg};
`;
const Styled = styled.div`
	width: 1000px;
	height: 118px;
	color: ${({theme}) => theme.bodyBackground};
	border-top: 1px solid;
	border-left: 1px solid; 
	display: flex;
	flex-flow: column wrap;

	> p {
		width: 9px;
		height: 9px;
		border-right: 1px solid;
		border-bottom: 1px solid;
	}
	&.stageNo {
		animation: ${gradient} linear alternate;
		animation-iteration-count: infinite;
		animation-duration: 4s;
		animation-delay: 5s;
		background: linear-gradient(
		-45deg,
		rgb(58, 58, 58),
		${({theme}) => theme.gray},
		rgb(58, 58, 58)
		);
		background-size: 400% 400%;
			
			> p {
				background: transparent;
			}
	}
`;

// > p:nth-child(722) {
// 	box-shadow: 0 0 10px 4px black;
// 	z-index: 2;
// }

const Grid = ({ Domination }) => (
		<Styled className={cn({ stageAwait: Domination.players.length, stageNo: !Domination.players.length })}>
			{Domination.cells.map((id, key) => {
				const { color } = Domination.players[id];

				return <Bit {...{key, bg: color}} />;
			})}
		</Styled>
);

export default Grid;