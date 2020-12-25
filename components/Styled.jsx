import styled from 'styled-components';

const Info = styled.div`
	margin-top: 32px;
	padding: ${({theme}) => theme.pg4};
	text-align: center;

	> .title {
		display: flex;
		justify-content: center;

		> .name {
			font-weight: 600;
		}

		> p {
			font-size: 20px;
			padding: ${({theme}) => theme.pg4};
		}
	}

	> div {
		text-align: center;
		color: ${({theme}) => theme.white};
		padding: ${({theme}) => theme.pg4};
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

export {
	Info, Content
};