import styles from "@/shared/ui/tabs-group/secondary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";
import {useState} from "react";
import CreateTransferCode from "@/widgets/wallet/transfer/create-transfer";
import ApplyCode from "@/widgets/wallet/transfer/apply-code";

type TBtnTabs = "create-transfer" | "apply-code"
const Transfer = () => {


    const [btnTabs, setBtnTabs] = useState<TBtnTabs>("create-transfer")

    return (<>
            <div className="row flex mb-7">
                <div className="col">
                    <button onClick={() => setBtnTabs("create-transfer")}
                            className={`${styles.Tab} ${isActiveClass(btnTabs === "create-transfer")} whitespace-nowrap`}>
                        Gekkard account
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => setBtnTabs("apply-code")}
                            className={`${styles.Tab} ${isActiveClass(btnTabs === "apply-code")} whitespace-nowrap`}>
                        Blockchain wallet
                    </button>
                </div>
            </div>
            <div className="row mb-9">
                <div className="info-box-description">
                    <div className="row mb-4">
                        <span className="font-semibold">Funds transfer code</span>
                    </div>
                    <div className="row">
                        <span>Create a special code with which you can transfer EURG funds between Gekkoin users with or without your confirmation.</span>
                    </div>
                </div>
            </div>
            {btnTabs === "create-transfer" && <CreateTransferCode/>}
            {btnTabs === "apply-code" && <ApplyCode/>}

        </>
    );
};

export default Transfer;
