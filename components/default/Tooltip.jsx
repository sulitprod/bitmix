import ReactTooltip from "react-tooltip";

import styled from 'styled-components';

const StyledTooltip = styled(ReactTooltip)`
&& {
	border-radius: 0;
	padding: ${({theme}) => theme.pg8};
	background: ${({theme}) => theme.shadowGray};
	box-shadow: 4px 4px 0 ${({theme}) => theme.darkGray};

	&.show {
		opacity: 1;
	}
}
`

const Tooltip = (props) => <StyledTooltip {...props} />

export default Tooltip;