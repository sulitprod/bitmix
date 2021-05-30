import styled from 'styled-components';
import Icon from './default/Icon';

const Info = styled.div`
	margin: 32px 0;
	text-align: center;
	color: ${({theme}) => theme.white};

	> .title {
		font-size: 20px;
    	line-height: 24px;
		padding-bottom: ${({theme}) => theme.pg8};
	}
`;

const Warning = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: ${({theme}) => theme.lightGray};

	> * {
		margin: ${({theme}) => theme.pg8};
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	> div {
		margin-bottom: 16px;
	}
`;

const SubBlock = styled.div`
	background: ${({theme}) => theme.shadowGray};
	display: flex;
	flex-direction: column;
	width: 1022px;
	padding: ${({theme}) => theme.pg12};
	color: ${({theme}) => theme.white};

	> div {
		width: 100%;

		&.header {
			margin-bottom: ${({theme}) => theme.pg12};
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			
			> div {
				display: flex;
			}
			.buttons {
				position: absolute;
				right: 0;

				> .button + .button {
					margin-left: ${({theme}) => theme.pg8};
				}
			}
		}
	}
`;

const StyledSeparator = styled.p`
	font-size: inherit;
	display: inline;
	padding: 0 ${({theme}) => theme.pg8};
`;
const Separator = () => <StyledSeparator>•</StyledSeparator>;

const StyledPackage = styled.div`
	display: flex;
			
	> p {
		color: ${({theme}) => theme.white};
		background: ${({theme}) => theme.darkGray};
		padding: ${({theme}) => theme.pg4};
		line-height: 12px;
    	font-size: 12px;
	}
`;
const ColoredIcon = styled(Icon)`
	fill: ${p => p.bg};
`;
const Package = ({ color, packages }) => (
	<StyledPackage>
			<ColoredIcon src='packageTail' width={20} bg={color} />
			<p>{`${packages[0]} - ${packages[1]}`}</p>
	</StyledPackage>
);

export {
	Info, Content, Separator, Package, Warning, SubBlock
};