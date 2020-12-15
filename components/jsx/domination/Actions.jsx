import { useState } from "react"
import { declText } from "../../../utils"
import Button from "../Button"
import Icon from "../Icon"

export default function Actions() {
	const [sortView, changeSortView] = useState(true)
	const actions = [
		// {}, {}, {}
	]

	return (
		<>
			<div className="actions">
				<div className="top">
					<div>
						<p className="mainText">История</p>
						<p className="separator">•</p>
						<p>{`${actions.length} ${declText(actions.length, 'действий', 'действие', 'действия')}`}</p>
					</div>
					<div>
						<Button type="main" children={<Icon src="sort" width={24} />} onClick={() => changeSortView(true)} active={sortView} />
						<Button type="main" children={<Icon src="list" width={24} />} onClick={() => changeSortView(false)} active={!sortView} />
					</div>
				</div>
				<div className="content">
					{actions.length ? actions.map(() => (
						<div></div>
					)) :
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
					width: 1024px;
					padding: 12px 13px;

					> .top {
						display: flex;
						justify-content: space-between;
						width: 100%;
						color: $white;

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