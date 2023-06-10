import scss from "./style.module.scss";
import {HelperClassName} from "@/shared/lib/helper-class-name";

const styles = new HelperClassName(scss)
const Card = ({children, className = ""}: { children: JSX.Element | JSX.Element[], className?: string }) => {
    return (
        <div className={styles.scss("CardWrapper " + className)}>
            {children}
        </div>
    );
}

export default Card;