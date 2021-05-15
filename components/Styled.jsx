import styled from 'styled-components';
import Icon from './default/Icon';

const Info = styled.div`
	margin: 32px 0;
	text-align: center;
	color: ${({theme}) => theme.white};

	> .title {
		display: flex;
		justify-content: center;
		padding-bottom: ${({theme}) => theme.pg8};

		> p {
			font-size: 20px;
		}
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

const StyledSeparator = styled.p`
	line-height: 120%;
	padding: 0 ${({theme}) => theme.pg8};
`;
const Separator = () => <StyledSeparator>•</StyledSeparator>;

const StyledPackage = styled.div`
	padding-left: ${({theme}) => theme.pg4};
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
	Info, Content, Separator, Package
};