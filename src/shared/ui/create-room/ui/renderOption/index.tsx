import {FC} from "react";
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import styles from "../../styles.module.scss"

interface IRenderOptionProps {
    option: ICtxCurrency
}

const RenderOption: FC<IRenderOptionProps> = ({ option }) => {
    const { $const, name } = option

    return (
        <div key={$const} className={styles.RenderOptionContainer}>
            <IconCoin width={20} height={20} code={$const} />
            <p className={styles.RenderOptionContainerText}>{$const}</p>
            <p className={styles.RenderOptionContainerText}>{name}</p>
        </div>
    )
}

export default RenderOption;