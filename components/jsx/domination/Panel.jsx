import { useState } from 'react';

import Button from '../Button';
import Icon from '../Icon';
import Input from '../Input';

const BUTTONS = [
	[<Icon src="trash" />, () => ''],
	['+0.1', (value) => value + 0.1],
	['+1', (value) => value + 1],
	['+10', (value) => value + 10],
	['+100', (value) => value + 100],
	['1/2', (value) => value / 2],
	['х2', (value) => value * 2],
	['Всё', (_, balance) => balance],
];

export default function Panel({ User }) {
	const [inputValue, setInputValue] = useState('');

	const onChange = ({ target }) => {
		setInputValue(target.value);
	};

	return (
		<>
			<div className="panel">
				<div className="buttons">
					<ul>
						{BUTTONS.map(([value, handler], key) => (
							<li key={key}>
								<Button
									type="main"
									value={value}
									onClick={() => {
										setInputValue(
											handler(
												Number(inputValue),
												User.balance
											)
										);
									}}
								/>
							</li>
						))}
					</ul>
				</div>
				<Input
					placeholder="Количество"
					value={inputValue}
					onChange={onChange}
				/>
				<Button type="main" value="Добавить биты" />
			</div>
			<style jsx global>{`
				@import 'public/variables.scss';

				.panel {
					display: flex;
					width: 998px;

					> * {
						margin-right: $pg8;

						&:nth-last-child(1) {
							margin-right: 0;
						}
					}

					> .buttons {
						display: flex;
						flex-grow: 1;

						> ul {
							display: table;
							table-layout: fixed;
							width: 100%;

							> li {
								display: table-cell;
								padding-right: $pg8;
								width: 100%;

								> .button {
									width: 100%;
								}

								&:nth-last-child(1) {
									padding-right: 0;
								}
							}
						}
					}

					.input > input,
					.button {
						line-height: 24px !important;
					}

					> .button > div {
						padding: 0 8px;
					}
				}
			`}</style>
		</>
	);
}
