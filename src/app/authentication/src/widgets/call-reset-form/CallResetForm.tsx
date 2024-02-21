import styles from './style.module.css';
import Button from "../components/button/Button";
import {useState} from "preact/hooks";
import Form from '../components/form';
import Swal from 'sweetalert2';
import flags from "react-phone-number-input/flags";
import PhoneInput from "react-phone-number-input";
import {ResetPassword} from '../../shared/apiInterfaces';

interface IParams {
	phone: string;
	handleCancel: () => void;
    onPhoneChange: (phone: string) => void;
}

export const CallResetForm = ({
	phone,
	handleCancel,
	onPhoneChange
}: IParams) => {
	const [loading, setLoading] = useState<boolean>(false);
	
	const onSubmit = async () => {
		if (phone) {
			setLoading(true);
			let response = await ResetPassword(phone);
			
			if (response.result === "Success") {
				Swal.fire({
					icon: "success",
					title: 'Password reset link',
					text: 'A password reset link has been sent to your email.'
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
				<PhoneInput flags={flags} placeholder="Enter phone number" name='user' value={phone} onChange={onPhoneChange} />
				
				<p className={styles.Description}>The link will be sent to your personal email</p>
			</div>
			
			<div className={styles.FormButtons} >
				<Button disabled={!phone || loading} type="submit">Send link</Button>
				
				<Button text onClick={handleCancel}>Back to login</Button>
			</div>
		</Form>
	</main>
}
