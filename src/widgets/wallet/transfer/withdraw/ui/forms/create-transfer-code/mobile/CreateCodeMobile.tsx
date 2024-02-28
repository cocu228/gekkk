import Loader from "@/shared/ui/loader";
import {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import Button from '@/shared/ui/button/Button';
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import useError from "@/shared/model/hooks/useError";
import {actionResSuccess} from "@/shared/lib/helpers";
import {apiCreateTxCode} from "@/shared/(orval)api/gek";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {validateBalance} from '@/shared/config/validators';
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import CodeTxInfo from "@/widgets/wallet/transfer/components/transfer-code/CodeTxInfo";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import { useTranslation } from 'react-i18next';

const text = "When using confirmation, your funds will be debited from the account as soon as the user applies the code, however, funds will be credited to the recipient only if you confirm transfer. If confirmation does not occur, it will be possible to return the funds only through contacting the Support of both the sender and the recipient of the funds."

const CreateCodeMobile = ({code, inputCurr = null, onClose=null}) => {
    const navigate = useNavigate();
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()
    const [newCode, setNewCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const currency = useContext(CtxWalletData)
    const {t} = useTranslation();
    
    
    const getListTxCode = storeListTxCode(state => state.getListTxCode);
    
    const [localErrorHunter, , localErrorInfoBox] = useError();
    

    return (loading ? <div className="flex relative mt-10 min-h-[200px]"><Loader/></div> : code ? <CodeTxInfo onClose={onClose} inputCurr={inputCurr} code={code}/> :
            <>
                {localErrorInfoBox && <div className="row min-h-[200px] mt-4">{localErrorInfoBox}</div>}
            </>
    );
};

export default CreateCodeMobile;
