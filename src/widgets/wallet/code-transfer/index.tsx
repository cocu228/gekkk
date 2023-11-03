import styles from "@/shared/ui/tabs-group/secondary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";
import {useState} from "react";
import CreateTransferCode from "@/widgets/wallet/code-transfer/create-transfer";
import ApplyCode from "@/widgets/wallet/code-transfer/apply-code";
import { useTranslation } from 'react-i18next';

type TBtnTabs = "create-transfer" | "apply-code"
const Transfer = () => {
    const {t} = useTranslation();
    const [btnTabs, setBtnTabs] = useState<TBtnTabs>("create-transfer")

    return (<>
            <div className="row flex mb-7">
                <div className="col">
                    <button onClick={() => setBtnTabs("create-transfer")}
                            className={`${styles.Tab} ${isActiveClass(btnTabs === "create-transfer")} whitespace-nowrap`}>
                        {t("create_transfer")}
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => setBtnTabs("apply-code")}
                            className={`${styles.Tab} ${isActiveClass(btnTabs === "apply-code")} whitespace-nowrap`}>
                        {t("apply_code")}
                    </button>
                </div>
            </div>
            <div className="row mb-9">
                <div className="info-box-description">
                    <div className="row mb-4">
                        <span className="font-semibold">{t("funds_transfer_code")}</span>
                    </div>
                    <div className="row">
                        <span>{t("create_special_code")}</span>
                    </div>
                </div>
            </div>
            {btnTabs === "create-transfer" && <CreateTransferCode/>}
            {btnTabs === "apply-code" && <ApplyCode/>}

        </>
    );
};

export default Transfer;
