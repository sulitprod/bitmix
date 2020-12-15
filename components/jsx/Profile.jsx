import Coins from './Coins';
import Button from './Button';
import Photo from './Photo';

export default function Profile() {
	const User = {
		photo_50: 'favicon.png',
		name: 'Gleb',
		balance: 300
	}

	return (
		<>
			<div className="profile">
				<Button right={<Photo src={User.photo_50} />} align="right">
					<p>{User.name}</p>
					<Coins value={User.balance} />
				</Button>
			</div>
			<style jsx global>{`
				@import 'public/variables.scss';

				.profile {
					> .button {
						> .children {
							> p {
								border-bottom: 1px solid $gray;
								line-height: 16px;
								padding-bottom: $pg4;
							}

							> .coins {
								padding-top: $pg4;
							}
						}
					}
				}
			`}</style>
		</>
	);
}
