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
	width: 998px;
	height: 116px;
	color: ${({theme}) => theme.bodyBackground};
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
	const statusTime = TIMES.domination[status];
	const rings = (status === 3) ? fillRingsStages() : null;
	const [id, setId] = useState(status === 3 ? Math.ceil((statusTime - remaining) / (statusTime / rings.length)) - 1 : 0);

	const currentGrid = () => {
		switch (status) {
			case 2:
				const id = Math.ceil((statusTime - remaining) / (statusTime / randomCells.length)) - 1;

				return randomCells[id].split(':');
			case 3:
				return randomCells[randomCells.length - 1].split(':');
			default:
				return cells ? cells.split(':') : [];
		}
	};
	const [grid, setGrid] = useState(currentGrid());
	const drawCell = (canvas, x, y, color) => {
		canvas.fillStyle = color;
		canvas.fillRect(9 * x, 9 * y, 8, 8);
		canvas.fillStyle = 'rgb(255 255 255 / 22%)';
		canvas.fillRect(9 * x + 1, 9 * y + 1, 3, 3);
	}
	const fillGrid = () => {
		const draw = canvas.current.getContext('2d');

		draw.fillStyle = bodyBackground;
		draw.fillRect(0, 0, cols * 9 - 1, rows * 9 - 1);
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				const id = grid[i * rows + j];

				if (grid.length) {
					drawCell(draw, i, j, players[Number(id)].color)
				} else {
					draw.fillStyle = 'transparent';
					draw.clearRect(9 * i, 9 * j, 8, 8);
				}
			}
		}
	}
	const addRing = () => {
		const newGrid = grid.slice(0);

		for (const i of rings[id]) newGrid[i] = winner.player;
		setGrid(newGrid);
		setTimeout(() => setId(id + 1), statusTime * 1000 / (rings.length * 2));
	}

	useEffect(() => {
		if (status === 3 && id <= rings.length - 1) addRing();
	}, [id]);
	useEffect(() => {
		setGrid(currentGrid());
		if (status === 3) addRing();
		else setId(0);
	}, [status, cells]);
	useEffect(() => {
		if (status === 2) setGrid(currentGrid());
	}, [remaining]);
	useEffect(() => {
		if (status === 3) {
			const newGrid = grid.slice(0);

			for (const ring in rings) {
				for (const i of rings[ring]) newGrid[i] = winner.player;
				if (id === Number(ring)) break;
			}
			setGrid(newGrid);
		}
	}, [])
	useEffect(fillGrid, [grid]);

	return (
		<Styled className={cn({ stageNo: !players.length })}>
			<canvas width={cols * 9 - 1} height={rows * 9 - 1} ref={canvas} />
		</Styled>
	);
}

export default Grid;