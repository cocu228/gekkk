import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Loader from "@/shared/ui/loader";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { deliveryCountriesList } from "@/shared/config/delivery-coutries-list";
import { ClientDetails, Card as ICardData } from "@/shared/(orval)api/gek/model";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";

import styles from "./styles.module.scss";
import { DeliveryInfo } from "./delivery-info";
import { IssueNewCard } from "./issue-new-card";
import { OrderCardContext } from "../../model/context";
import { SuccessCardOrder } from "./success-card-order";
import { OrderConfirmation } from "./order-confirmation";
import { IOrderCardState, IOrderCardStep } from "../../model/types";

interface IParams {
  closable: boolean;
  card?: ICardData | null;
  setIsNewCardOpened: (isOpened: boolean) => void;
}

const OrderCardForm = ({ card = null, closable = false, setIsNewCardOpened }: IParams) => {
  const { t } = useTranslation();
  const { md } = useBreakpoints();
  const [loading, setLoading] = useState<boolean>(false);
  const { getAccountDetails } = storeAccountDetails(state => state);
  const [accountDetails, setAccountDetails] = useState<ClientDetails>();
  const [state, setState] = useState<IOrderCardState>({
    card: card,
    city: null,
    street: null,
    postalCode: null,
    houseNumber: null,
    countryCode: null,
    recipientName: null,
    cardholderName: null,
    apartmentNumber: null,
    isExpressDelivery: false,
    isResidenceAddress: false,
    cardType: !card ? "VIRTUAL" : "PLASTIC",
    step: card ? "DeliveryInfo" : "IssueNewCard"
  });

  const setStep = (nextStep: IOrderCardStep) => {
    setState({
      ...state,
      step: nextStep
    });
  };

  const switchResidenceAddress = () => {
    const { city, street, country, postalCode, streetNumber } = accountDetails;

    setState(prev => ({
      ...state,
      isResidenceAddress: !prev.isResidenceAddress,

      ...(!prev.isResidenceAddress
        ? {
            city,
            street,
            postalCode,
            houseNumber: streetNumber,
            countryCode: deliveryCountriesList.find(c => c.name === country)?.code
          }
        : {
            city: "",
            street: "",
            postalCode: "",
            houseNumber: "",
            countryCode: null
          })
    }));
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      const accountDetails = await getAccountDetails();
      setAccountDetails(accountDetails);

      setLoading(false);
    })();

    return () => setIsNewCardOpened(false);
  }, []);

  return loading ? (
    <div className="min-h-[100px]">
      <Loader className='relative mt-20' />
    </div>
  ) : (
    <OrderCardContext.Provider
      value={{
        state,
        setStep,
        setState,
        switchResidenceAddress,
        close: () => setIsNewCardOpened(false)
      }}
    >
      {!md && (
        <div className='flex items-center mb-2'>
          <span className='font-medium text-lg'>{t(card ? "order_card" : "issue_new_card")}</span>
        </div>
      )}

      <div className={styles.OrderCardContainer}>
        {state.step === "IssueNewCard" ? <IssueNewCard closable={closable} /> : null}
        {state.step === "DeliveryInfo" ? <DeliveryInfo /> : null}
        {state.step === "OrderConfirmation" ? <OrderConfirmation /> : null}
        {state.step === "SuccessCardOrder" ? <SuccessCardOrder /> : null}
      </div>
    </OrderCardContext.Provider>
  );
};

export default OrderCardForm;
