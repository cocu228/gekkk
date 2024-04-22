import Loader from '@/shared/ui/loader';
import {Table} from './components/Table';
import {useEffect, useState} from 'react';
import {AreaWrapper} from '../AreaWrapper';
import {useTranslation} from 'react-i18next';
import {apiGetUas} from '@/shared/(orval)api';
import useError from '@/shared/model/hooks/useError';
import {StatementsByIBAN, apiGetStatements} from '@/shared/api/statements';
import {storeAccountDetails} from '@/shared/store/account-details/accountDetails';
import s from '../../styles.module.scss'

export function MyReports() {
    const [
        localErrorHunter, ,
        localErrorInfoBox,
        localErrorClear,
        localIndicatorError
    ] = useError();
    const {t} = useTranslation();
    const [uasToken, setUasToken] = useState<string>(null);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const [statements, setStatements] = useState<{[key: string]: StatementsByIBAN[]}>(null);

    useEffect(() => {
        (async () => {
            localErrorClear();
            
            const token = (await apiGetUas()).data.result.token;
            setUasToken(token);

            const {phone} = await getAccountDetails();
            const {data} = await apiGetStatements({
                headers: {
                    Authorization: phone,
                    Token: token
                }
            });

            if (data.errors) {
                localErrorHunter({
                    code: data.errors.code,
                    message: `Loading Report issue #${data.errors.code}`
                });
                return;
            }

            console.log(data);

            setStatements(data.statements);
        })();
    }, []);

    return <div className={s.reportsWrap}>
        {statements === null ? (
            <AreaWrapper title={t("my_reports")}>
                <p className={s.reportsWarnText}>
                    <Loader className='relative'/>
                </p>
            </AreaWrapper>
        ) : (localIndicatorError ? (
            <AreaWrapper title={t("my_reports")}>
                <p className={s.reportsWarnText}>
                    {localErrorInfoBox}
                </p>
            </AreaWrapper>
        ) : (
            <AreaWrapper title={t("my_reports")}>
                <Table statements={statements} uasToken={uasToken}/>
            </AreaWrapper>
        ))}  
    </div>
}
