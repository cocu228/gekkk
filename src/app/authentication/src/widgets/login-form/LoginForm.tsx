import {useState} from 'preact/hooks';
import Button from '../components/button/Button';
import styles from './style.module.css';
import PhoneInput from 'react-phone-number-input';
import Swal from 'sweetalert2';
import {formatAsNumber} from "../../shared";
import flags from 'react-phone-number-input/flags';
import {SignIn, SignInUser} from "../../shared";
import PasswordInput from '../components/passwordInput';

interface IParams {
    phone: string;
    onPasswordForget: () => void;
    onPhoneChange: (phone: string) => void;
}

export const LoginForm = ({
    phone,
    onPhoneChange,
    onPasswordForget,
}: IParams) => {
    const [password, setPassword] = useState('');
	const [tab, setTab] = useState<"PASSWORD" | "DEVICE_KEY">("PASSWORD");

    const onSubmit = async (e) => {
		e.preventDefault();

		const t = (tab === 'PASSWORD'
            ? await SignInUser(formatAsNumber(phone), password)
			: await SignIn());

		if (t) {
			// show success message
			Swal.fire({
				icon: "success",
				title: 'Logged In!',
				text: 'You\'re logged in successfully.',
				timer: 1000
			});
		}
		else {
			if (tab === 'PASSWORD')
				Swal.fire({
					icon: "warning",
					title: 'Not login',
					text: 'Request login to server failed. :(',
					timer: 3000
				});
		}
	}

    return <>
        <div className={styles.FormTab}>
            <button className={`${styles.TabButton} ${tab === 'PASSWORD' ? styles.TabButtonActive : ""}`} onClick={() => setTab('PASSWORD')} >
                User
            </button>
            <button className={`${styles.TabButton} ${tab === 'DEVICE_KEY' ? styles.TabButtonActive : ""}`} onClick={() => setTab('DEVICE_KEY')} >
                Gekkey
            </button>
        </div>
        <form onSubmit={onSubmit} autoComplete={"on"} className={styles.FormBody}>
            {tab != 'PASSWORD'
                ? <>
                    <p className={styles.Description}>
                        Use of a hardware-based security key is fast and easy. <a href={"https://fidoalliance.org/fido2/"}>Read more about FIDO2.</a>
                    </p>
                    
                    <Button type="submit">
                        Login with Device Key
                    </Button>
                </>
                : <>
                    <PhoneInput autoComplete={"username webauthn"} required minLength={8} flags={flags} placeholder="Enter phone number" name='username' value={phone} onChange={onPhoneChange} />
                    <PasswordInput id='Password' skipValidation required minLength={6} placeholder={"Password"} value={password} onChange={e => setPassword(e.currentTarget.value)} name='password' />
                    
                    <div className={styles.FormButtons} >
                        <Button disabled={!phone || !password || phone.length < 8 || password.length < 6} type="submit">Login</Button>
                        <Button text onClick={onPasswordForget}>Forgot password?</Button>
                    </div>
                </>
            }
        </form>
    </>
}
