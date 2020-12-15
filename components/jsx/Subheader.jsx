import Button from './Button';
import Icon from './Icon';

export default function Subheader() {
	return (
		<>
			<div className="subheader">
				<ul>
					<li>
						<Button
							href="/"
							type="main"
							left={<Icon src="crown" />}
							value="Доминация"
						/>
					</li>
				</ul>
			</div>
			<style jsx global>{`
				@import 'public/variables.scss';

				.subheader {
					display: flex;
					justify-content: center;
					width: 100%;

					.button > .component {
						padding-right: $pg4;
					}
				}
			`}</style>
		</>
	);
}
