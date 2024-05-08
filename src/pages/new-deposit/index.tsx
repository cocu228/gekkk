import React, {useContext} from 'react';
import Loader from '@/shared/ui/loader';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import NewDeposit from '@/widgets/new-deposit/ui/NewDeposit';
import NewDepositProvider from '@/widgets/new-deposit/model/NewDepositProvider';
import PageHead from "@/shared/ui/page-head/PageHead";

export default () => {
    const currencies = useContext(CtxCurrencies);
    
    return !currencies ? <Loader/> : (
        <div className="wrapper flex-1 flex flex-col">
            <PageHead
                title={"New deposit"}
                subtitle={<p className="text-sm">
                    A modern alternative to a bank deposit.<br />
                    Invest in a cryptocurrency with full or partial protection of investments
                </p>}
            />
            
            <NewDepositProvider>
                <NewDeposit/>
            </NewDepositProvider>
        </div>
    );
}
