import cn from 'classnames';
import styled, { keyframes } from 'styled-components';
import { shuffleArr } from '../../utils';

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
	}
`;

const Grid = ({ domination }) => {
	const { cells, players } = domination;
	// const ere = shuffleArr(cells);
	// const [ grid, setGrid ] = useState(cells);

	return (
		<Styled className={cn({ stageAwait: players.length, stageNo: !players.length })}>
			{cells.map((id, key) => <Bit {...{key, bg: players.length ? players[id].color : 'transparent'}} />)}
		</Styled>
	);
}

export default Grid;