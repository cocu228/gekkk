import { useContext, useEffect, useState } from "react";
import { getInitialProps, useTranslation } from "react-i18next";

import { ICtxCurrency } from "@/processes/CurrenciesContext";

import { isCryptoNetwork } from "../../../model/helpers";
import WithdrawFormCrypto from "../../../withdraw/ui/forms/crypto/WithdrawFormCrypto";
import WithdrawFormPapaya from "../../../withdraw/ui/forms/papaya/WithdrawFormPapaya";
import WithdrawFormSepa from "../../../withdraw/ui/forms/sepa/WithdrawFormSepa";
import WithdrawFormCardToCard from "../../../withdraw/ui/forms/card-to-card/WithdrawFormCardToCard";
import WithdrawFormBroker from "../../../withdraw/ui/forms/broker/WithdrawFormBroker";
import WithdrawFormPhoneNumber from "../../../withdraw/ui/forms/phone-number/WithdrawFormPhoneNumber";
import UniversalTransferForm from "../../../withdraw/ui/forms/universal-transfer/UniversalTransferForm";
import CreateTransferCode from "../../../withdraw/ui/forms/create-transfer-code";
import { CtxWalletNetworks } from "../../../model/context";
import CrossProjectForm from "../../../withdraw/ui/forms/cross-project/CrossProjectForm";

type Props = {
  curr: ICtxCurrency;
  network: number;
};

function GetDisplayedForm({ network }: Props) {
  const { t } = useTranslation();
  const { initialLanguage } = getInitialProps();
  const { networkTypeSelect } = useContext(CtxWalletNetworks);

  const getDisplayForm = (networkType: number): JSX.Element => {
    if (isCryptoNetwork(networkType)) {
      return <WithdrawFormCrypto />;
    }

    switch (networkType) {
      case 150:
        return <WithdrawFormPapaya />;
      case 151:
        return <WithdrawFormSepa />;
      // case 152:
      //     return <WithdrawFormSwift/>; TODO: Swift форма
      case 153:
        return <WithdrawFormCardToCard />;
      case 154:
        return <WithdrawFormBroker />;
      case 155:
        return <WithdrawFormPhoneNumber />;
      case 230:
        return <UniversalTransferForm />;
      case 231:
        return <CreateTransferCode />;
      case 232:
      case 233:
      case 234:
        return <CrossProjectForm />;
      default:
        return (
          <div className='min-h-[50px] mb-3 flex justify-center items-center'>
            <span className='text-[14px]'>{t("no_actions_for_network")}</span>
          </div>
        );
    }
  };

  const [displayedForm, setDisplayedForm] = useState(getDisplayForm(networkTypeSelect));

  useEffect(() => {
    setDisplayedForm(getDisplayForm(network ? network : networkTypeSelect));
  }, [initialLanguage, networkTypeSelect]);

  return displayedForm;
}

export default GetDisplayedForm;
