import {FC, useContext} from "react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.css";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";

interface ICommissionsProps {
    isLoading?: boolean;
    youWillPay: string | number;
    youWillGet: string | number;
    fee: string | number;
    youWillGetCoin?: string;
}

const Commissions: FC<ICommissionsProps> = ({
    isLoading,
    youWillPay,
    youWillGet,
    fee,
    youWillGetCoin,
}) => {
    const {t} = useTranslation()

    const { $const } = useContext(CtxWalletData);

    return (
        <div className={styles.Commissions}>
            <div className={styles.LeftSide}>
                <div className="row">
                    <span>{t("you_will_pay")}:</span>
                </div>
                <div className="row">
                    <span>{t("you_will_get")}:</span>
                </div>
                <div className="row">
                    <span>{t("fee")}:</span>
                </div>
            </div>
            <div className={styles.RightSide}>
                <div>
                    <div>
                        {isLoading ? t("loading") + "..." : <span>{youWillPay}</span>}
                    </div>
                    <div>
                        {isLoading ? t("loading") + "..." : <span>{youWillGet}</span>}
                    </div>
                    <div>
                        {isLoading ? t("loading") + "..." : <span>{fee}</span>}
                    </div>
                </div>
                <div>
                    <span>{$const}</span>
                    <span>{youWillGetCoin ?? $const}</span>
                    <span>{$const}</span>
                </div>
            </div>
        </div>
    )
}

export default Commissions;