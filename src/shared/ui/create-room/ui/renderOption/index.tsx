import {FC} from "react";
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import styles from "../../styles.module.scss"

interface IRenderOptionProps {
    option: ICtxCurrency
}

const RenderOption: FC<IRenderOptionProps> = ({ option }) => {
    const { $const, name } = option;
    const { md } = useBreakpoints()

    return (
        <div key={$const} className={styles.RenderOptionContainer}>
            <IconCoin width={md ? 20 : 25} height={md ? 20 : 25} code={$const} />
            <p className={styles.RenderOptionContainerText}>{$const}</p>
            <p className={styles.RenderOptionContainerText}>{name}</p>
        </div>
    )
}

export default RenderOption;