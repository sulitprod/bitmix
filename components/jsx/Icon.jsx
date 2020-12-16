import cn from 'classnames';

import Svgs from './Svgs';

export default function Icon({ src, width = 16, height, className }) {
	height = height || width;

	const Svg = Svgs()[src];

	return (
		<>
			<div className={cn('icon', className)}>
				<Svg />
			</div>
			<style jsx>{`
				@import 'public/variables.scss';

				.icon {
					font-size: 0;
					line-height: 0;
					fill: $white;

    				display: inline-block;

					> svg {
						fill: unset;
						height: ${height}px;
						width: ${width}px;
					}
				}
			`}</style>
		</>
	);
}
