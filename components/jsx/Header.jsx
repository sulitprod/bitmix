import Profile from './Profile';
import Button from './Button';
import Link from './Link';

export default function Header() {
	return (
		<>
			<div className="header">
				<div className="block left">
					<ul>
						<li>
							<Button href="/leaders" value="Лидеры" />
						</li>
					</ul>
				</div>
				<Link href="/">
					<div className="logo">BITMIX</div>
				</Link>
				<div className="block right">
					<Profile />
				</div>
			</div>
			<style jsx global>{`
				@import 'public/variables.scss';

				.header {
					align-items: center;
					display: flex;
					padding: $pg8;
					width: 100%;

					> .block {
							display: flex;
							width: 50%;

							&.left {
								justify-content: flex-start;
							}

							&.right {
								justify-content: flex-end;
							}
					}

					> .logo {
							color: $white;
							cursor: pointer;
							font-size: 20px;
							font-weight: 600;
					}
				}
			`}</style>
		</>
	);
}
