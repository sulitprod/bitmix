import styled from 'styled-components';

import Bits from '../Bits';
import Photo from '../default/Photo';

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
const Styled = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	width: 998px;
	color: ${({theme}) => theme.white};

	> div {
		align-items: center;
		display: flex;

		> .separator {
			padding: 0 ${({theme}) => theme.pg8};
		}
	}

	> .winners {
		> ul {
			display: flex;

			> li {
				margin-right: ${({theme}) => theme.pg8};

				&:nth-last-child(1) {
					margin-right: 0;
				}
			}
		}
	}
`;

export default function FooterPanel({ domination }) {
	const sum = domination.players.reduce((all, { count }) => all + count, 0);

	return (
		<Styled>
			<div className='winners'>
				<ul>
					{winners.map(({ photo_50 }, key) => (
						<li key={key}>
							<Photo src={photo_50} />
						</li>
					))}
				</ul>
				<p className='separator'>•</p>
				<p>Последние победители</p>
			</div>
			<div className='sum'>
				<p>Общая сумма</p>
				<p className='separator'>•</p>
				<Bits value={sum} />
			</div>
		</Styled>
	);
}