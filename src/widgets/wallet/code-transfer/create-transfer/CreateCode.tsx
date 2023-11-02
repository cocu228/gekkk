import Loader from "@/shared/ui/loader";
import {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import Button from '@/shared/ui/button/Button';
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import useError from "@/shared/model/hooks/useError";
import {actionResSuccess} from "@/shared/lib/helpers";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {validateBalance} from '@/shared/config/validators';
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import CodeTxInfo from "@/widgets/wallet/code-transfer/CodeTxInfo";
import {apiCreateTxCode} from "@/widgets/wallet/code-transfer/api/create-tx-code";
import {storeListTxCode} from "@/widgets/wallet/code-transfer/store/list-tx-code";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import { useTranslation } from 'react-i18next';

const text = "When using confirmation, your funds will be debited from the account as soon as the user applies the code, however, funds will be credited to the recipient only if you confirm transfer. If confirmation does not occur, it will be possible to return the funds only through contacting the Support of both the sender and the recipient of the funds."

const CreateCode = () => {
    const navigate = useNavigate();
    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()
    const [newCode, setNewCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const {t} = useTranslation();

    const getListTxCode = storeListTxCode(state => state.getListTxCode)

    const [localErrorHunter, , localErrorInfoBox] = useError()

    const currency = useContext(CtxWalletData)

    const onCreateCode = async () => {

        setLoading(true)

        const typeTx = checkbox ? 12 : 11
        const response = await apiCreateTxCode(inputCurr.value.number, currency.$const, typeTx)

        actionResSuccess(response).success(async () => {
            setNewCode(response.data.result.code)
            await getListTxCode()
            setLoading(false)
        }).reject((error) => {
            localErrorHunter(error)
            setLoading(false)
        })

    }

    return (loading ? <Loader/> : newCode ? <CodeTxInfo code={newCode}/> :
            <>
                <div className="row bg-gray-300 -mx-14 px-14 py-4 mb-6">
                    <p>{t("create_special_code")}</p>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="wrapper w-full mb-3 xl:mb-8 md:mb-7">
                            <InputCurrency.Validator
                                value={inputCurr.value.number}
                                onError={setInputCurrValid}
                                validators={[validateBalance(currency, navigate)]}
                            >
                                <InputCurrency.PercentSelector onSelect={setInputCurr}
                                                               header={<span className='text-gray-600'></span>}
                                                               currency={currency}>
                                    <InputCurrency.DisplayBalance currency={currency}>
                                        <InputCurrency
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
                <div className="row mb-16">
                    <Checkbox onChange={({target}) => setCheckbox(target.checked)}>
                        <div className='flex items-center'>
                            {t("use_confirmation")}

                            <div className="flex items-center">
                                <Tooltip text={t("when_using_confirmation")}>
                                    <div className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                                        <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </Checkbox>
                </div>
                <div className="row">
                    <Button disabled={inputCurrValid.value || loading} className="w-full" size="xl"
                            onClick={onCreateCode}>{t("confirm")}
                    </Button>
                </div>
                {localErrorInfoBox && <div className="row mt-4">{localErrorInfoBox}</div>}
            </>
    );
};

export default CreateCode;
