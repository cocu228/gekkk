import React, {useEffect, useState} from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import DepositCard from "@/widgets/dashboard/ui/DepositCard";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {useNavigate} from 'react-router-dom';
import {apiInvestments} from "@/shared/api";
import {formatForDisplay} from "@/shared/lib/date-helper";
import {Skeleton} from 'antd';
import Decimal from 'decimal.js';
import Card from "@/shared/ui/card/Card";

const strategyTypes = {
    1: 'Balanced strategy',
    2: 'Safe strategy',
    3: 'Dynamic strategy',
    4: 'Fixed rate strategy 0,8% per month'
}

// const currencyNames = {
//     BTC: 'Bitcoin',
//     XMR: 'Monero',
//     ETH: 'Ethereum',
// }

function Deposits() {

    const [state, setState] = useState(null)

    useEffect(() => {

        (async () => {
            const {data} = await apiInvestments()
            setState(data)
        })()

    }, [])

    const navigate = useNavigate();

    return (
        <div className="wrapper">

            <SectionTitle>Deposits</SectionTitle>

            <CardsGrid>

                {state === null && [1, 2, 3, 4].map((it, i) => <Card key={"Card_" + i}><Skeleton active/></Card>)}

                {Array.isArray(state) && state.map((item, i) => {
                    console.log(item.datetime)
                    return <DepositCard
                        title={strategyTypes[item.dep_type]}
                        key={"DepositCard-" + i}
                        subtitle={`Opened ${formatForDisplay(item.date_start)}`}
                        price={new Decimal(item.amount).toNumber()}
                        currency={item.currency_id}
                        onOpenDeposit={() => {
                            //
                            navigate("/new-deposit");
                        }}
                        linkUrl="/tariffs"
                    />
                })}

            </CardsGrid>
        </div>
    );
}

export default Deposits;