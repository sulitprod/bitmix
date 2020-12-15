import Link from './Link';

export default function Button({
	href,
	type = 'secondary',
	onClick,
	left,
	right,
	value,
	children,
	padding = 8,
	active = false,
	align = 'center',
}) {
	return (
		<>
			<Link href={href}>
				<div className={`${type} button ${align} ${active ? 'active' : ''}`} onClick={onClick}>
					{left && <div className="component left">{left}</div>}
					<div className={value ? 'value' : 'children'}>
						{children || value}
					</div>
					{right && <div className="component right">{right}</div>}
				</div>
			</Link>
			<style jsx>{`
				@import 'public/variables.scss';
		
				.button {
					color: $white;
					cursor: pointer;
					display: block;
					padding: ${padding}px;
					line-height: 0;
					white-space: nowrap;
					user-select: none;
		
					> div {
						display: inline-block;
						line-height: 0;
						vertical-align: middle;
					}
		
					> .component {
						&.left {
							margin-right: $pg8;
						}
		
						&.right {
							margin-left: $pg8;
						}
					}
		
					&.main {
						transition: 0.4s background ease;
						background: $darkGray;
						&:hover, &.active {
							background: $darkGrayHover;
						}
					}
		
					&.secondary {
						background: transparent;
					}
				}
			`}</style>
			<style jsx>{`
				.button {
					text-align: ${align};
				}
			`}</style>
		</>
	);
}
