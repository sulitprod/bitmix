import styled from 'styled-components';

const Styled = styled.div`
	background-image: url(${p => p.src});
	background-size: cover;
	height: ${p => p.height}px;
	width: ${p => p.width}px;
	border-radius: 4px;
`;

const Photo = ({ src, width = 40, height }) => {
	height = height || width;

	return (
		<Styled className='photo' {...{ src, width, height }} />
	);
}

export default Photo;