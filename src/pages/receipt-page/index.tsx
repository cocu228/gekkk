import {FC} from "react";
import Receipt from "@/widgets/receipt/ui";
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";

const ReceiptPage: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const txId = params.get("txId");
    const currency = params.get("currency");

    const handleOnCancel = () => {
        if (currency) {
            const search = createSearchParams({
                currency
            });

            navigate({
                pathname: "/wallet",
                search: search.toString()
            });
        } else {
            navigate("/history");
        }
    }

    return (
        <div className={"wrapper"}>
            <Receipt txId={txId} onCancel={handleOnCancel} />
        </div>
    )
}

export default ReceiptPage;