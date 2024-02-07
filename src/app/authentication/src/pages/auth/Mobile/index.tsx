import {useState} from "preact/compat";
import {LoginDeviceKey} from "../../../widgets/LoginDeviceKey";
import {LoginPasswordForm} from "../../../widgets/LoginPasswordForm";
import TabButton from "../../../widgets/components/tab-button/TabButton";

const AuthMobile = () => {
	const [tab, setTab] = useState<"PASSWORD" | "DEVICE_KEY">("PASSWORD");
	
	return <div>
		<div style={{
			width: 'auto',
			margin: '4px 4px 0 4px',
			gap: '1px',
			display: 'grid',
			gridTemplateColumns: 'auto auto'
		}}>
			<TabButton active={tab === 'PASSWORD'} onClick={() => setTab('PASSWORD')}>
				Authorize with password
			</TabButton>
			
			<TabButton active={tab === 'DEVICE_KEY'} onClick={() => setTab('DEVICE_KEY')}>
				Authorize with device key
			</TabButton>
		</div>
		
		<div style={{width: '100%'}}>
			{tab === 'PASSWORD'
				? <LoginPasswordForm/>
				: <LoginDeviceKey/>
			}
		</div>
	</div>
}

export default AuthMobile;
