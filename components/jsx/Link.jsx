import Link from 'next/link';

export default function _Link({ href, children }) {
	return href 
		? <Link href={href}>{children}</Link> 
		: children;
}
