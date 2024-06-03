import {FC} from "react";
import {useLocation} from "react-router-dom";
import ReceiptData from "@/widgets/receipt/receiptData";

const ReceiptPage: FC = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const txId = params.get("txId")

    return (
        <div className={"wrapper"}>
            <ReceiptData isMobile txId={txId} />
        </div>
    )
}

export default ReceiptPage;