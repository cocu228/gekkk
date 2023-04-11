import React from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';

const CryptoDeposits = () => {

    return (
        <div className="wrapper">
            <PageHead
                subtitle={"A modern alternative to a bank deposit. Invest in the Gekkoin virtual products with full or partial protection of capital. \n" +
                    "Return is calculated at the end of the deposits term. The most profitable for you value will be chosen."}
                title={"Crypto deposits"}/>
            <div className="substrate flex flex-col">
                <div className="row flex flex-wrap gap-8">
                    <div className="col w-25 flex flex-col">
                        <div className="row mb-3 flex flex-wrap gap-2">
                            <img src="/img/icon/Email.svg" alt="mail"/>
                            <p className="text-gray-400 font-semibold">Email</p>
                        </div>
                        <div className="row">
                            <a className="text-lg font-bold" target="_blank"
                               href="mailto:Support@gekkoin.com">Support@gekkoin.com</a>
                        </div>
                    </div>
                    <div className="col w-25 flex flex-col">
                        <div className="row mb-3 gap-2 flex flex-wrap">
                            <img src="/img/icon/Telegram.svg" alt="mail"/>
                            <p className="text-gray-400 font-semibold">Telegram</p>
                        </div>
                        <div className="row">
                            <a className="text-lg font-bold"
                               href="https://t.me/gekkoin_com">https://t.me/gekkoin_com</a>
                        </div>
                    </div>
                </div>
                <div className="row mt-6">
                    <div className="col">
                        <p className="text-gray-400 text-sm font-medium">Response time up to 24 hours</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CryptoDeposits