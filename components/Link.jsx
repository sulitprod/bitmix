import _Link from 'next/link';

const Link = ({ href, children }) => (
	href 
		? <_Link {...{ href, children }}></_Link> 
		: children
)

export default Link;