import cn from 'classnames';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TIMES } from '../../constant';
import { fillRings } from '../../utils';

const gradientKeys = keyframes`
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
const bitKeys = keyframes`
	0% {
		opacity: 0.1;
	}
	100% {
		opacity: 1;
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
		animation: ${bitKeys} linear alternate;
		animation-duration: 1s;
	}
	&.stageNo {
		animation: ${gradientKeys} linear alternate;
		animation-iteration-count: infinite;
		animation-duration: 4s;
		animation-delay: 3s;
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
		if (status === 2) {
			const id = Math.ceil((TIMES.domination[status] - remaining) / (TIMES.domination[status] / randomCells.length)) - 1;

			return randomCells[id].split(':');
		}
		if (status === 3) return randomCells[randomCells.length - 1].split(':');

		return cells.split(':');
	};
	const [ grid, setGrid ] = useState(currentGrid());
	const [ id, setId ] = useState(0);
	const rings = (status === 3) ? fillRings(grid) : null;
	const addRing = () => {
		for (const i of rings[id]) grid[i] = winner.player;
		setGrid(grid);
		setId(id + 1);
	}

	useEffect(() => {
		setGrid(currentGrid());
		if (status === 3) {
			if (!id) addRing(); 
			else setId(0);
		}
	}, [status, cells]);

	useEffect(() => {
		if (status === 2) setGrid(currentGrid());
	}, [remaining]);

	// if (status === 3 && id <= rings.length - 1) addRing();

	// useEffect(() => {
		// setGrid(currentGrid());
		// setId(0);
		// if (status === 3) addRing();
	// }, [status]);
	
	useEffect(() => {
		if (status === 3 && id <= rings.length - 1) addRing();
	}, [id]);

	return (
		<Styled className={cn({ stageAwait: players.length, stageNo: !players.length })}>
			{grid.map((id, key) => <Bit {...{key, bg: players.length ? players[id].color : 'transparent'}} />)}
		</Styled>
	);
}

export default Grid;