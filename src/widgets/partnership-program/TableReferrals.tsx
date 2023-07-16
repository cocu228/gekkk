import React, {useContext, useEffect, useState} from 'react';
import GTable from "@/shared/ui/grid-table";
import {apiGetReferrals, IResReferrals} from "@/shared/api/referral/get-referrals";
import {actionResSuccess, uncoverResponse} from "@/shared/lib/helpers";
import {formatForCustomer} from "@/shared/lib/date-helper";
import {CtxRootData} from "@/processes/RootContext";

const TableReferrals = (props) => {

    const {account} = useContext(CtxRootData)
    const [state, setState] = useState<IResReferrals | null>(null)

    useEffect(() => {
        (async () => {
            const response = await apiGetReferrals()
            actionResSuccess(response).success(() => {
                setState(uncoverResponse(response))
            })
        })()
    }, [account])

    return <>
        <GTable>
            <GTable.Head className={"bg-gray-200 p-4"}>
                <GTable.Row>
                    <GTable.Col className={`flex my-2`}>
                        <span className="text-gray-600 font-medium">ID</span>
                    </GTable.Col>
                    <GTable.Col className={`flex my-2`}>
                        <span className="text-gray-600 font-medium">Registration date</span>
                    </GTable.Col>
                </GTable.Row>
            </GTable.Head>
            <GTable.Body loading={state === null} className={"bg-[#F9F9FA] p-4"}>
                {state?.referrals.map((item, i) => <GTable.Row>
                    <GTable.Col className={`flex my-2`}>
                        <span className="text-gray-600 font-medium">{item.client_id}</span>
                    </GTable.Col>
                    <GTable.Col className={`flex my-2`}>
                        <span className="text-gray-600 font-medium">{formatForCustomer(item.reg_date)}</span>
                    </GTable.Col>
                </GTable.Row>)}
            </GTable.Body>
        </GTable>
    </>
}

export default TableReferrals