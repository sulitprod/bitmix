import { useRouter } from 'next/router';

const Main = () => {
	const router = useRouter();
	
	router.push('/domination');
	return null;
}

export default Main;