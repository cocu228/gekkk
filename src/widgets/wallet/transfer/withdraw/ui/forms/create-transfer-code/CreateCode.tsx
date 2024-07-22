import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import useError from "@/shared/model/hooks/useError";
import { actionResSuccess, getRandomInt32 } from "@/shared/lib/helpers";
import { apiCreateTxCode } from "@/shared/(orval)api/gek";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { validateBalance } from "@/shared/config/validators";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import CodeTxInfo from "@/widgets/wallet/transfer/components/transfer-code/CodeTxInfo";
import { IUseInputState, useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { CtxRootData } from "@/processes/RootContext";

interface IParams {
  code?: string;
  onClose?: () => void;
  inputCurrMobile?: IUseInputState;
}

const CreateCode = ({ code, onClose, inputCurrMobile }: IParams) => {
  const navigate = useNavigate();
  const { inputCurr, setInputCurr } = useInputState();
  const [newCode, setNewCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const currency = useContext(CtxWalletData);
  const { t } = useTranslation();
  const { setRefresh } = useContext(CtxRootData);

  const { md } = useBreakpoints();

  const isInputEmptyOrNull = inputCurr.value.number === 0;
  const isInputMoreThanBalance = inputCurr.value.number > currency.balance?.free_balance;

  const [localErrorHunter, , localErrorInfoBox] = useError();

  const onCreateCode = async () => {
    setLoading(true);

    const response = await apiCreateTxCode({
      typeTx: checkbox ? 12 : 11,
      timeLimit: false,
      currency: currency.$const,
      amount: inputCurr.value.number,
      clientNonce: getRandomInt32()
    });

    actionResSuccess(response)
      .success(async () => {
        setNewCode(response.data.result.code);
        setLoading(false);
        setRefresh();
      })
      .reject(error => {
        localErrorHunter(error);
        setLoading(false);
      });
  };

  return !md ? (
    loading ? (
      <div className="min-h-[100px]">
        <Loader className='relative my-20' />
      </div>
    ) : newCode ? (
      <CodeTxInfo currency={currency.$const} inputCurr={inputCurr.value.number} onClose={onClose} code={newCode} />
    ) : (
      <>
        <div className='row max-w-[450px] spx-14 pb-[1rem] mb-4'>
          <p>{t("create_special_code")}</p>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='wrapper w-full mb-3 xl:mb-8 md:mb-7'>
              <InputCurrency.Validator
                value={inputCurr.value.number}
                validators={[validateBalance(currency, navigate, t)]}
              >
                <InputCurrency.PercentSelector
                  onSelect={setInputCurr}
                  header={<span className='text-gray-600' />}
                  currency={currency}
                >
                  <InputCurrency.DisplayBalance currency={currency}>
                    <InputCurrency
                      placeholder={t("exchange.enter_amount")}
                      className='mt-1'
                      value={inputCurr.value.string}
                      currency={currency.$const}
                      onChange={setInputCurr}
                    />
                  </InputCurrency.DisplayBalance>
                </InputCurrency.PercentSelector>
              </InputCurrency.Validator>
            </div>
          </div>
        </div>
        <div className='row mb-8'>
          <Checkbox checked={checkbox} onChange={({ target }) => setCheckbox(target.checked)}>
            <div className='flex items-center'>
              {t("use_confirmation")}

              <div className='flex items-center'>
                <Tooltip text={t("when_using_confirmation")}>
                  <div className='inline-block relative align-middle w-[14px] ml-1 cursor-help'>
                    <img src='/img/icon/HelpIcon.svg' alt='tooltip' />
                  </div>
                </Tooltip>
              </div>
            </div>
          </Checkbox>
        </div>
        <div className='flex justify-center row'>
          <Button
            size='lg'
            disabled={isInputEmptyOrNull || isInputMoreThanBalance || loading}
            className='w-full'
            onClick={onCreateCode}
          >
            {t("confirm")}
          </Button>
        </div>
        {localErrorInfoBox && <div className='row mt-4'>{localErrorInfoBox}</div>}
      </>
    )
  ) : loading ? (
    <div className='relative min-h-[100px]'>
      <Loader />
    </div>
  ) : code ? (
    <CodeTxInfo onClose={onClose} currency={currency.$const} inputCurr={inputCurrMobile.value.number} code={code} />
  ) : (
    <>{localErrorInfoBox && <div className='row min-h-[200px] mt-4'>{localErrorInfoBox}</div>}</>
  );
};

export default CreateCode;
