import { ToastContainer } from 'react-toastify';
 
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';

const Toast = styled(ToastContainer)`
	.Toastify__toast {
		border-radius: 0.25em;
		box-shadow: 0 0.2em 1em rgba(0,0,0, 0.3);
		padding: 1em;
		background-color: #EDF1F7;
		color: #0A0A0A;
		font-weight: 500;
	}
	.Toastify__toast--success {
		background-color: #D6FFC8;
	}
	.Toastify__toast--warning {
		background-color: #FFFBE6;
		color: white;
	}
	.Toastify__toast--error {
		background-color: #ED7070;
		color: white;
	}
`

const Notifications = () => <Toast />

export default Notifications;