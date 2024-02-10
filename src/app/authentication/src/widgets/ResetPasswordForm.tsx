import {eddsa} from 'elliptic';
import {createRef} from "preact";
import {sha256} from "js-sha256";
import {useState} from "preact/hooks";
import Button from "./components/button/Button";
import {coerceToBase64Url} from "../shared/lib/helpers";
import {AuthOptions} from "../shared/(orval)api/auth/model";
import {apiRegisterKey, apiRegisterOptions} from "../shared/(orval)api/auth";

const fServerRequest = async (data: any) => {
	const response = await apiRegisterKey(data);
	
	if (response.data.result === "Success") {
		alert("Password changed successfully!");
		setTimeout(() => location.replace('/'), 2000);
	} else {
		alert("Bad request, look at devtools network");
	}
}

export const ResetPasswordForm = ({
    emailCode
}: {
    emailCode: string;
}) => {
	const refInputLogin = createRef();
	const refInputSmsEmail = createRef();
	const refInputPassword = createRef();
	const refInputPasswordConfirm = createRef();
	const [credentials, setCredentials] = useState<AuthOptions>(null);
	
	const onSubmit = async () => {
		const phone = refInputLogin.current.value;
		const password = refInputPassword.current.value;
		const passwordConfirm = refInputPasswordConfirm.current.value;
		
		if (!phone) {
			return alert("Enter phone number.");
		}
		
		if (password !== passwordConfirm) {
			return alert("Password doesn't match.");
		}
		
		const response = await apiRegisterOptions({code: emailCode});
		
		if (response.data.result?.fido2_options?.challenge) {
			setCredentials(response.data.result);
		} else {
			alert("Bad request, look at devtools network");
		}
	}
	
	const onPasswordChange = async () => {
		const phone = refInputLogin.current.value;
		const smsCode = refInputSmsEmail.current.value;
		const password = refInputPassword.current.value;
		
		const challenge = credentials.fido2_options.challenge
			.replace(/-/g, "+")
			.replace(/_/g, "/");
		
		const challengeUint8 = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));
		const SHA256Seed = sha256(phone + password + credentials.rpId);
		
		const ec = new eddsa('ed25519');
		const key = ec.keyFromSecret(SHA256Seed);
		const pub = key.getPublic();
		const signature = key.sign(challengeUint8 as eddsa.Bytes).toBytes();
		
		
		console.log(key.verify(challengeUint8 as eddsa.Bytes, signature));
		console.log("Public key (elliptic):");
		console.log(coerceToBase64Url(pub));
		
		const data = {
			challenge_id: credentials.challenge_id,
			code: smsCode,
			public_key: coerceToBase64Url(pub),
			signature: coerceToBase64Url(signature)
		};
		
		await fServerRequest(data);
	}
	
	const onCancel = () => {
		location.replace('/');
	}
	
	return <div className="px-24 py-24" style={{width: "auto"}}>
		<div class="row mb-16">
			<h1>Password reset</h1>
			
			<span>
                To change your password provide new password
				<br/>
				(the stronger password — the better):
            </span>
		</div>
		
		<div className="row mb-16">
			<div className="col-xs-12">
				Phone number
			</div>
			<div className="col-xs-12">
				<input
					type={"text"}
					ref={refInputLogin}
					name='phone'
				/>
			</div>
		</div>
		
		<div className="row mb-16">
		    <div className="col-xs-12">
		        Password
		    </div>
			
		    <div className="col-xs-12">
		        <input
		            type={"text"}
		            ref={refInputPassword}
		            name='password'
		        />
		    </div>
		</div>
		
		<div className="row mb-16">
		    <div className="col-xs-12">
		        Confirm Password
		    </div>
		    <div className="col-xs-12">
		        <input
		            type={"text"}
		            ref={refInputPasswordConfirm}
		            name='password'
		        />
		    </div>
		</div>
		
		{credentials === null ? null : (
			<div className="row mb-16">
				<div className="col-xs-12">
					SMS Code
				</div>
				<div className="col-xs-12">
					<input
						type={"text"}
						ref={refInputSmsEmail}
						name='smsCode'
					/>
				</div>
			</div>
		)}
		
		<div style={{width: 'auto', display: 'flex', justifyContent: 'space-between'}} className="mb-16">
			<Button onClick={!credentials ? onSubmit : onPasswordChange}>
				Submit
			</Button>
			
			<Button secondary onClick={onCancel}>Cancel</Button>
		</div>
	</div>
}
