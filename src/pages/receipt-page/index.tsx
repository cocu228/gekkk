import { FC } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import ReceiptData from "@/widgets/receipt/receiptData";

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
  };

  return (
    <div className={"wrapper"}>
      <ReceiptData isMobile txId={txId} onCancel={handleOnCancel} />
    </div>
  );
};

export default ReceiptPage;
