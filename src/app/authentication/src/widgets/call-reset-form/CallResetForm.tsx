import styles from './style.module.css';
import Button from "../components/button/Button";
import {useState} from "preact/hooks";
import Form from '../components/form';
import Swal from 'sweetalert2';
import flags from "react-phone-number-input/flags";
import PhoneInput from "react-phone-number-input";
import {ResetPassword} from '../../shared/apiInterfaces';

interface IParams {
	handleCancel: () => void;
}

export const CallResetForm = ({handleCancel}: IParams) => {
	const [phone, setPhone] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	
	const onSubmit = async () => {
		if (phone) {
			setLoading(true);
			let response = await ResetPassword(phone);
			
			if (response.result === "Success") {
				Swal.fire({
					timer: 2000,
					icon: "success",
					title: 'Email code',
					text: 'A message with a confirmation code has been sent by email.'
				}).then(() => {
					setLoading(false);
					handleCancel();
				});
			}
			else Swal.fire({
				icon: "error",
				title: 'Not success email send',
				text: response.error?.message ?? response.result
			});
		}
	}
	
	return <main className={styles.CallReset}>
		<Form onSubmit={onSubmit} className={styles.FormBody}>
			<div>
				<PhoneInput flags={flags} placeholder="Enter phone number" name='user' value={phone} onChange={setPhone} />
				
				<p className={styles.Description}>The link will be sent to your personal email</p>
			</div>
			
			<div className={styles.FormButtons} >
				<Button disabled={!phone || loading} type="submit">Send link</Button>
				
				<Button text onClick={handleCancel}>Back to login</Button>
			</div>
		</Form>
	</main>
}
