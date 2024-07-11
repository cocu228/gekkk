import { FC, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import Receipt from "@/widgets/receipt/ui";
import { AddressTxOut, GetHistoryTrasactionOut } from "@/shared/(orval)api/gek/model";

const ReceiptPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state] = useState<
    GetHistoryTrasactionOut & {
      addressTxInfo?: AddressTxOut | null;
    }
  >(JSON.parse(localStorage.getItem("receiptInfo")));
  const params = new URLSearchParams(location.search);

  const txId = params.get("txId");
  const currency = params.get("currency");

  const handleOnCancel = () => {
    if (!!state) {
      localStorage.removeItem("receiptInfo");
    }

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
      {!!txId ? (
        <Receipt txId={txId} onCancel={handleOnCancel} />
      ) : (
        <Receipt txInfo={state} onCancel={handleOnCancel} />
      )}
    </div>
  );
};

export default ReceiptPage;
