import { useEffect, useRef, useState, useContext } from 'react';
import cn from 'classnames';
import styled, { keyframes, ThemeContext } from 'styled-components';
import { CELLS, TIMES } from '../../constant';
import { fillRingsStages } from '../../utils';

const [ cols, rows ] = CELLS.fullSize;

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
const Styled = styled.div`
	width: 1000px;
	height: 118px;
	color: ${({theme}) => theme.bodyBackground};
	border: 1px solid;
	border-radius: 4px;
	overflow: hidden;

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
	const { bodyBackground } = useContext(ThemeContext);
	const canvas = useRef(null);
	const [focus, setFocus] = useState(true);
	const currentGrid = () => {
		if (status === 2) {
			const id = Math.ceil((TIMES.domination[status] - remaining) / (TIMES.domination[status] / randomCells.length)) - 1;

			return randomCells[id].split(':');
		}
		if (status === 3) return randomCells[randomCells.length - 1].split(':');

		return cells ? cells.split(':') : [];
	};
	const [ grid, setGrid ] = useState(currentGrid());
	
	const fillGrid = (cells) => {
		const draw = canvas.current.getContext('2d');

		draw.fillStyle = bodyBackground;
		draw.fillRect(0, 0, cols * 9 - 1, rows * 9 - 1);
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				const id = cells[i * rows + j];

				if (cells.length) {
					draw.fillStyle = players[Number(id)].color;
					draw.fillRect(9 * i, 9 * j, 8, 8);
				} else {
					draw.fillStyle = 'transparent';
					draw.clearRect(9 * i, 9 * j, 8, 8);
				}
			}
		}
	}
	const fillRings = () => {
		const draw = canvas.current.getContext('2d');
    	const rings = fillRingsStages();
    	let i = 0;

		let timeout = setTimeout(function fillRing() {
			if (focus)
				for (const cell of rings[i]) {
					draw.fillStyle = players[Number(winner.player)].color;
					draw.fillRect(9 * Math.floor(cell / rows), 9 * (cell % rows), 8, 8);
				}
			i++;
			if (i !== rings.length) timeout = setTimeout(fillRing, 100);
		}, 100);
	}

	useEffect(() => {
		setGrid(currentGrid());
		if (status === 3) fillRings();
	}, [status, cells]);
	useEffect(() => {
		if (status === 2) setGrid(currentGrid());
	}, [remaining]);
	useEffect(() => fillGrid(grid), [grid]);
	useEffect(() => {
		document.addEventListener('visibilitychange', () => setFocus(document.visibilityState === 'visible'));
		
		return () => { document.removeEventListener('visibilitychange', setFocus) };
	}, []);

	return (
		<Styled className={cn({ stageNo: !players.length })}>
			<canvas width={cols * 9 - 1} height={rows * 9 - 1} ref={canvas} />
		</Styled>
	);
}

export default Grid;