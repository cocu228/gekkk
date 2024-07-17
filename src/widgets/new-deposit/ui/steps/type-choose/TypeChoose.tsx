import { memo, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import Radio from "@/shared/ui/radio";
import Loader from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import { $axios } from "@/shared/lib/(orval)axios";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import useModal from "@/shared/model/hooks/useModal";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { DepositType } from "@/shared/config/deposits/types";
import { validateMinimumAmount } from "@/shared/config/validators";
import { formatAsNumberAndDot } from "@/shared/lib/formatting-helper";
import { getTypeDescriptions } from "@/widgets/new-deposit/model/helpers";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { actionResSuccess, getCookieData, uncoverResponse } from "@/shared/lib/helpers";

import { CtxNewDeposit } from "../../../model/context";
import { IconApp } from "@/shared/ui/icons/icon-app";

const TypeChoose = memo(() => {
  const {
    type,
    amount,
    minAmount,
    isGkeDeposit: isGke,
    onAmountChange,
    onDepositTypeChange,
    onIsGkeDepositChange
  } = useContext(CtxNewDeposit);

  const { currencies } = useContext(CtxCurrencies);

  const TopUpModal = useModal();

  const { t } = useTranslation();

  const descriptions = getTypeDescriptions(isGke);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [redirectCurrency, setRedirectCurrency] = useState<string>(null);

  const increasingProgramDescription = `The structured deposit placed in EURG will be
        charged double yield, and if there is a loss, it will be expressed as a twofold
        reduction of the loss, but GKE tokens will also be frozen at a ratio of 1:1 to
        EURG for the duration of the deposit.`;

  if (!currencies) return null;

  const eurgWallet = currencies.get("EURG");
  const gkeWallet = currencies.get("GKE");

  const customBalanceValidator = (wallet: ICtxCurrency) => value => ({
    validated: +value <= +wallet.balance.user_balance,
    errorMessage: (
      <>
        You don't have enough funds. Please{" "}
        <span
          className='text-blue-400 hover:cursor-pointer hover:underline'
          onClick={() => {
            setRedirectCurrency(wallet.$const);
            // TopUpModal.showModal();
          }}
        >
          top up
        </span>{" "}
        your {wallet.$const} account.
      </>
    )
  });

  const onModalClick = async () => {
    setModalLoading(true);

    const { phone, token, tokenHeaderName } = getCookieData<{
      phone: string;
      token: string;
      tokenHeaderName: string;
    }>();

    const response = await $axios.post("/pub/v1/auth", {
      authorization: phone,
      token: token,
      tokenHeaderName: tokenHeaderName
    });

    const gekkardUrl = import.meta.env[`VITE_GEKKARD_URL_${import.meta.env.MODE}`];

    actionResSuccess(response).success(() => {
      window.open(
        `${gekkardUrl ?? "https://dev.gekkard.com"}/wallet/${redirectCurrency}/Top Up?sessionId=${uncoverResponse(
          response
        )}`,
        "_blank"
      );
    });

    setModalLoading(false);
  };

  if (!currencies) return null;

  return (
    <div className='px-10 mt-10 md:mt-4 md:px-4'>
      <p className='text-base font-medium text-gray-400 mb-6 md:text-sm md:mb-4'>Choose deposit types</p>

      <div className='wrapper grid grid-cols-2 gap-6 mb-8 w-full xxl:justify-between md:mb-4'>
        {Object.values(DepositType).map(depositType => (
          <Radio
            name={depositType}
            label={depositType}
            value={depositType}
            key={depositType}
            title={depositType !== DepositType.FIXED ? "Structured" : "Fixed rate"}
            subtitle={
              depositType !== DepositType.FIXED ? (
                "Crypto investments with customizable risk/profit"
              ) : (
                <>
                  <span className='font-bold'>{isGke ? "19,2" : "9,6"}%</span> per annum (
                  <span className='font-bold'>{isGke ? "1,6" : "0,8"}%</span> per month)
                </>
              )
            }
            checked={type === depositType}
            onChange={() => onDepositTypeChange(depositType)}
          />
        ))}

        <div className='wrapper col-span-2 mb-5 hidden xl:block md:mb-5'>{descriptions[type]}</div>

        <div>
          <Checkbox className='md:mr-10' onChange={onIsGkeDepositChange} defaultChecked={isGke}>
            <span>Increase the deposit rate</span>
          </Checkbox>

          <Tooltip text={increasingProgramDescription}>
            <div className='inline-block relative align-middle w-[14px] pb-1 ml-1 cursor-help'>
              <img src='/img/icon/HelpIcon.svg' alt='tooltip' />
              <IconApp code={""} size={50} color={"#000000"}></IconApp>
            </div>
          </Tooltip>
        </div>
      </div>

      <div className='wrapper -md:flex gap-4'>
        <div className='w-full'>
          <InputCurrency.Validator
            description={`Minimum deposit amount is ${minAmount} ${eurgWallet.$const}`}
            value={+amount}
            validators={[
              customBalanceValidator(eurgWallet),
              validateMinimumAmount(minAmount, +amount, eurgWallet.$const, t)
            ]}
          >
            <InputCurrency.PercentSelector
              header={"Enter deposit amount"}
              currency={eurgWallet}
              onSelect={onAmountChange}
            >
              <InputCurrency.DisplayBalance currency={eurgWallet}>
                <InputCurrency
                  placeholder={t("exchange.enter_amount")}
                  value={amount.toString()}
                  onChange={v => onAmountChange(formatAsNumberAndDot(v))}
                  currency={eurgWallet.$const}
                />
              </InputCurrency.DisplayBalance>
            </InputCurrency.PercentSelector>
          </InputCurrency.Validator>
        </div>

        {!isGke ? null : (
          <div className='w-full mt-[27px]'>
            <InputCurrency.Validator
              value={+amount}
              validators={[
                customBalanceValidator(gkeWallet),
                validateMinimumAmount(minAmount, +amount, gkeWallet.$const, t)
              ]}
            >
              <InputCurrency.DisplayBalance currency={gkeWallet}>
                <InputCurrency
                  disabled
                  placeholder={t("exchange.enter_amount")}
                  value={`${amount}`}
                  onChange={v => onAmountChange(formatAsNumberAndDot(v))}
                  currency={gkeWallet.$const}
                />
              </InputCurrency.DisplayBalance>
            </InputCurrency.Validator>
          </div>
        )}
      </div>
      {/*todo to fix this*/}
      <Modal title='&nbsp;' onCancel={TopUpModal.handleCancel} isModalOpen={TopUpModal.isModalOpen}>
        <>
          <div className='row mb-10'>
            <div className='col'>
              <p className='font-bold text-sm leading-6 text-center'>
                You will be directed to your Gekkard web account.
              </p>
            </div>
          </div>
          <div className='row relative'>
            <div className='col'>
              {modalLoading ? (
                <Loader className={"w-[24px] h-[24px]"} />
              ) : (
                <Button onClick={onModalClick} className='w-full'>
                  Confirm
                </Button>
              )}
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
});

export default TypeChoose;
