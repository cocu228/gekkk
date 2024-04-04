import Modal from "@/shared/ui/modal/Modal";
import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { apiGetBankReceipt } from "@/shared/api/bank/get-bank-receipt";
import { apiGetUas } from "@/shared/(orval)api";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { formatDateTime } from "../dashboard/model/helpers";

interface BankReceiptProps {
  // referenceNumber: string;
}

export const BankReceipt: FC<BankReceiptProps & any> = ({ referenceNumber }) => {
  const { t } = useTranslation();
  const { getAccountDetails } = storeAccountDetails((state) => state);
  const [apiAnswer, setApiAnswer] = useState({
    id: "PPY199235",
    amount: -10.0,
    fee: 0,
    status: "INSUFFICIENT_FUNDS",
    paymentType: "TRANSFER",
    fromNumber: "MT07PAPY36836000002676370005866",
    fromName: "Ralf Williams",
    fromBank: null,
    toNumber: "MT03PAPY36836000002676370007199",
    toName: "Test Three",
    toBank: "Papaya",
    currency: {
      code: "EUR",
    },
    clientId: "6449",
    accountId: "PPY34446",
    description: "Other Test",
    executedAt: "2024-04-02T05:07:17.9",
    referenceNumber: "PPY128fbebb-22e9-42fb-9dbe-1ace2bb972b",
    paymentToRepeat: {
      type: "PAYMENT_SEPA",
      fromPhone: "79111111111",
      toPhone: null,
      account: "PPY6963",
      fromCardPan: null,
      fromCardId: null,
      beneficiaryName: "Test",
      beneficiaryAccount: null,
      country: null,
      city: null,
      address: null,
      swiftCode: null,
      beneficiaryBank: null,
      intermediaryBank: null,
      intermediarySwift: null,
      intermediaryAccount: null,
      commissionType: null,
      urgency: null,
      iban: "MT03PAPY36836000002676370007199",
      phoneNumber: null,
      cardNumber: null,
      currencyCode: "EUR",
      amount: 10,
      purpose: "Test",
      transferDetails: "Other",
    },
    openapiData: {
      type: "TO_ACCOUNT",
      toCard: null,
      toPhone: null,
      subType: null,
      externalOwnerID: null,
      fromCardPan: null,
    },
    operationType: null,
    fromPanDisplay: null,
  });

  const [filteredData, setFilteredData] = useState([]);

  //   useEffect(() => {
  //     const filteredList = apiAnswer.paymentToRepeat.
  //     setFilteredData()
  //   }, [apiAnswer])

  const paymentToRepeatData = Object.entries(apiAnswer.paymentToRepeat)
    .map(([key, value]) => ({ [key]: value }))
    .filter((obj) => {
      const values = Object.values(obj);
      return values.some((value) => value !== null);
    })
    .filter(
      (obj) =>
        !obj.hasOwnProperty("type") &&
        !obj.hasOwnProperty("amount") &&
        !obj.hasOwnProperty("country") &&
        !obj.hasOwnProperty("city") &&
        !obj.hasOwnProperty("address")
    );

  const date = new Date(apiAnswer.executedAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  //   useEffect(() => {
  //     const getReceipt = async () => {
  //       const { data } = await apiGetUas();
  //       const { phone } = await getAccountDetails();
  //       const res = await apiGetBankReceipt(
  //         "PPY153a7ed3-24d0-400d-9653-9bc9df0f283",
  //         {
  //           headers: {
  //             Authorization: phone,
  //             Token: data.result.token,
  //           },
  //         }
  //       );
  //       console.log("RESULT----", res);
  //     };

  //     getReceipt();
  //   }, []);

  //   useEffect(() => {
  //     console.log("API----", apiAnswer);
  //   }, [apiAnswer]);

  return (
    <div className={s.Wrapper}>
      <div className={s.Block}>
        <div className={s.Header}>
          <div className={s.HeaderLogo}>
            <img src="/img/icon/GekkardLogoReceipt.svg" alt="AlertIcon"/>
          </div>

          <div className={s.HeaderTitle}>Payment Receipt</div>
          <div className={s.HeaderId}>{apiAnswer.id}</div>
          <div className={s.HeaderDate}>{formatDateTime(new Date(apiAnswer.executedAt))}</div>
        </div>
        <div className={s.Body}>

          {/* <div className={s.info_block}>
            <span className={s.info_title}>Sender information</span>
          </div>
          <div className={s.info_block}>
            <span className={s.info_title}>Beneficiary information</span>
          </div>
          <div className={s.info_block}>
            <span className={s.info_title}>Bank</span>
          </div> */}

          <div>
            <span className={s.InformationBlockTitle}>{t("payment_information")}</span>
            <div className={s.InformationBlock}>
              <div className={s.AmountFeeBlock}>
                <div className={s.AmountFeeBlockItem}>
                  <span className={s.InformationBlockItemTitle}>
                    Amount:
                  </span>
                  {apiAnswer.paymentToRepeat.amount !== null && (
                    <span
                      className={s.InformationBlockItemValue}
                    >
                      {apiAnswer.paymentToRepeat.amount}
                    </span>
                  )}
                </div>
                <div className={s.AmountFeeBlockItem}>
                  <span className={s.InformationBlockItemTitle}>
                    Fee:
                  </span>
                  {apiAnswer.fee !== null && (
                    <span
                      className={s.InformationBlockItemValue}
                    >
                      {apiAnswer.fee}
                    </span>
                  )}
                </div>
              </div>
              {apiAnswer.paymentToRepeat.address &&
                apiAnswer.paymentToRepeat.city &&
                apiAnswer.paymentToRepeat.country && (
                  <div className={s.InformationBlockItem}>
                    <span
                      className={s.InformationBlockItemTitle}
                    >
                      Address:
                    </span>
                    <span
                      className={s.InformationBlockItemValue}
                    >
                      {`${apiAnswer.paymentToRepeat.address} ${apiAnswer.paymentToRepeat.city} ${apiAnswer.paymentToRepeat.country}`}
                    </span>
                  </div>
                )}
              {paymentToRepeatData.map((item, ind) => {
                const [key, value] = Object.entries(item)[0];

                return (
                  <div
                    className={s.InformationBlockItem}
                  >
                    <span
                      className={s.InformationBlockItemTitle}
                    >
                      {key}
                    </span>
                    <span
                      className={s.InformationBlockItemValue}
                    >
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={s.Footer}>
          <div className={s.Status}>
            <span>Hold</span>
          </div>
        </div>
      </div>
    </div>
  );
};
