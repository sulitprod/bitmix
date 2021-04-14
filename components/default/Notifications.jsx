import { ToastContainer } from 'react-toastify';
 
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';

const Toast = styled(ToastContainer)`
	.Toastify__toast {
		box-shadow: 4px 4px 0 ${({theme}) => theme.darkGray};
		padding: ${({theme}) => theme.pg8};
		background-color: #EDF1F7;
		color: ${({theme}) => theme.white};
	}
	.Toastify__toast--success {
		background-color: #07BC0C;
	}
	.Toastify__toast--warning {
		background-color: #F1C40F;
	}
	.Toastify__toast--error {
		background-color: #ED7070;
	}
`

const Notifications = () => <Toast />

export default Notifications;