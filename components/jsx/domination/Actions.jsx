import { useState } from "react"
import { declText } from "../../../utils"
import Button from "../Button"
import Coins from "../Coins"
import Icon from "../Icon"
import Photo from "../Photo"

import styled from 'styled-components'

const ColoredIcon = styled(Icon)`
	z-index: 0 !important;
	position: absolute;
	left: -5px;
	top: 3px !important;
	fill: ${props => props.color} !important;
`;

function Action({ photo_50, count, name, packages, color }) {
	return (
		<>
			<div className="action">
				<div>
					<Photo src={photo_50} />
					<div className="text">
						<p>Игрок</p>
						<p className="mainText">{name}</p>
						<p>добавил</p>
						<Coins value={count} />
					</div>
				</div>
				<div>
					<Icon src="packageTail" width={30} />
					<ColoredIcon src="packageTail2" width={30} color={color} />
					<div className="mainText package">{`${packages[0]} - ${packages[1]}`}</div>
				</div>
			</div>
		</>
	)
}

export default function Actions({ Domination }) {
	const [sortView, changeSortView] = useState(true)

	return (
		<>
			<div className="actions">
				<div className="top">
					<div>
						<p className="mainText">История</p>
						<p className="separator">•</p>
						<p>{Domination.actions.length ? 
						`${Domination.actions.length} ${declText(Domination.actions.length, 'действий', 'действие', 'действия')}` :
						'Нет действий'}</p>
					</div>
					<div>
						<Button type="main" children={<Icon src="sort" width={24} />} onClick={() => changeSortView(true)} active={sortView} />
						<Button type="main" children={<Icon src="list" width={24} />} onClick={() => changeSortView(false)} active={!sortView} />
					</div>
				</div>
				<div className="content">
					{Domination.actions.length ? 
					sortView ? Domination.actions.map((action, key) => (
						<Action key={key} {...action} />
					)) :
					<div className="noActionsText">Эта сортировка пока не доступна</div> :
					<div className="noActionsText">
						<p>В игре пока не совершено действий</p>
					</div>}
				</div>
			</div>
			<style jsx global>{`
				@import 'public/variables.scss';

				.actions {
					background: $shadowGray;
					display: flex;
					flex-direction: column;
					width: 1022px;
					padding: $pg8;

					> .top {
						display: flex;
						justify-content: space-between;
						width: 100%;
						color: $white;
						padding: $pg4;

						> div {
							align-items: center;
							display: flex;

							> .separator {
								padding: 0 $pg8;
							}
							
							> .mainText {
								font-weight: 600;
							}

							> .button {
								margin-right: $pg8;

								&:nth-last-child(1) {
									margin-right: 0;
								}
							}
						}
					}
					> .content {
						> .action {
							display: flex;
							padding: $pg4;
							color: $lightGray;
							justify-content: space-between;
							
							> div {
								display: flex;
								align-items: center;

								> .photo {
									margin-right: $pg8;
								}

								> .text {
									> * {
										display: inline-block;
										margin-right: 6px;
									}
								}

								.mainText {
									color: $white;
								}
								> .package {
									background: $darkGray;
									padding: $pg8;
								}

								> .icon {
									fill: $darkGray;
									z-index: 1;
									top: 2px;
								}

							}
						}
						> .noActionsText {
							text-align: center;
							color: $lightGray;
							> * {
								padding: $pg8;
							}
						}
					}
				}
			`}</style>
		</>
	)
}