import React from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';

const Support = () => {
    return (
        <div className="wrapper h-inherit w-full">
            <PageHead
                subtitle={"If you have any questions or difficulties, please let us know in any of the following way:"}
                title={"Support"}/>
            <div style={{
                marginBottom: "40px",
                minHeight: "640px"
            }} className="substrate flex flex-col w-full">
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

export default Support