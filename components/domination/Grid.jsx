import cn from 'classnames';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TIMES } from '../../constant';
import { fillRings } from '../../utils';

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
	transition: background .1s ease;
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

const Grid = ({ domination, remaining }) => {
	const { cells, players, status, randomCells, winner } = domination;
	const currentGrid = () => {
		let current = cells;

		if (status === 2) {
			const id = Math.ceil((TIMES.domination[status] - remaining) / (TIMES.domination[status] / randomCells.length)) - 1;

			current = randomCells[id];
		}
		if (status === 3) current = randomCells[randomCells.length - 1];

		return current.split(':');
	};
	const [ grid, setGrid ] = useState(currentGrid());
	const [ id, setId ] = useState(0);
	const rings = fillRings(grid);

	useEffect(() => {
		if (status === 3 && id <= rings.length - 1) {
			for (const i of rings[id]) grid[i] = winner.player;
			setGrid(grid);
			setId(id + 1);
		}
	}, [status, id]);

	return (
		<Styled className={cn({ stageAwait: players.length, stageNo: !players.length })}>
			{grid.map((id, key) => <Bit {...{key, bg: players.length ? players[id].color : 'transparent'}} />)}
		</Styled>
	);
}

export default Grid;