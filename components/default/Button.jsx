import cn from 'classnames';
import styled from 'styled-components';
import Icon from './Icon';

import Link from './Link';

const Styled = styled.div`
	color: ${({theme}) => theme.white};
	cursor: pointer;
	display: block;
	padding: ${p => p.padding}px;
	text-align: ${p => p.align};
	line-height: 0;
	white-space: nowrap;
	user-select: none;
	border-radius: 4px;

	> div {
		display: inline-block;
		line-height: ${({value}) => value ? '16px' : '0'};
		vertical-align: middle;
	}
	> * + * {
		margin-left: ${({theme}) => theme.pg8};
	}
	&.main {
		transition: 0.4s background ease;
		background: ${({theme}) => theme.darkGray};
		&:not(.disabled) {
			&:hover, &.active {
				background: ${({theme}) => theme.darkGrayHover};
			}
		}
	}
	&.secondary {
		background: transparent;
	}
	&.disabled {
		cursor: default;
		opacity: 0.6;
	}
`;

const Button = ({
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
	className,
	disabled,
	loading,
	onMouseDown
}) => {
	disabled = disabled || loading;

	return (
		<Link href={href}>
			<Styled className={cn('button', type, { active, disabled }, className)} {...{
				onClick: disabled ? undefined : onClick, 
				padding, 
				align,
				value,
				onMouseDown
			}}>
				{left && <div>{left}</div>}
				<div className='value'>{loading ? <Icon src='load' /> : (children || value)}</div>
				{right && <div>{right}</div>}
			</Styled>
		</Link>
	);
}

export default Button;
