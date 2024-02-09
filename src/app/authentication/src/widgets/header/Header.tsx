import styles from "./style.module.css";
import LogoIcon from "../components/icons/LogoIcon";
import SupportIcon from "../components/icons/SupportIcon";

const Header = () => {
	
	return (
		<div className={styles.Header}>
			<div className={styles.LogoContainer}>
				<LogoIcon/>
			</div>
			
			<div onClick={null}>
				<SupportIcon stroke={"var(--gek-background)"}/>
			</div>
		</div>
	);
}

export default Header;
