import {CSSProperties, FC} from "react";

import closeIconSrc from "../../../assets/close-icon.svg"
import operatorIconSrc from "../../../assets/operator-icon.svg"
import clientIconSrc from "../../../assets/client-icon.svg"
import shareIconSrc from "../../../assets/share-icon.svg"
import sendIconSrc from "../../../assets/send-icon.svg"
import arrowIconSrc from "../../../assets/arrow-icon.svg"

type IconsTypes = "operator" | "client" | "close" | "share" | "send" | "arrow";

interface IAppIconsProps extends CSSProperties {
    type: IconsTypes
    onClick?: () => void;
    size: number | string,
}

const AppIcons: FC<IAppIconsProps> = ({type, size, onClick, ...style}) => {
    const iconsType: Record<IconsTypes, string> = {
        operator: operatorIconSrc,
        close: closeIconSrc,
        send: sendIconSrc,
        share: shareIconSrc,
        client: clientIconSrc,
        arrow: arrowIconSrc
    }

    const code = iconsType[type]

    return (
        <img width={size} height={size} src={code} alt={code} style={style} onClick={onClick} />
    )
}

export default AppIcons;