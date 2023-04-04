import styles from "./style.module.scss"
import {HelperClassName} from "@/shared/lib/helper-class-name";

const hClassName = new HelperClassName(styles)


const InfoBox = ({message, children}) => {

    return <div className={hClassName.scss("Wrapper")}>
        <div className="col shrink-0 flex mr-3 col-auto">
            <img width={20} height={20} src="/img/icon/AlertWaring.svg"
                 alt="AlertWaring"/>
        </div>
        <div className="col">
            <p className={hClassName.scss("Text")}>{message}
            </p>
        </div>
        {children}
    </div>

}

export default InfoBox