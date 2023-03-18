import React, {useEffect, useState} from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import DepositCard from "@/widgets/dashboard/ui/DepositCard";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {useNavigate} from 'react-router-dom';
import {apiInvestments} from "@/shared/api";
import Decimal from "decimal.js";
import {format} from 'date-fns'


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

    const [state, setState] = useState([])

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
                {state.map((item, i) => <DepositCard
                    title={strategyTypes[item.dep_type]}
                    subtitle={`Opened ${format(new Date(item.date_start), "dd MMMM yyyy")}`}
                    price={new Decimal(item.amount).toNumber()}
                    currency={item.currency_id}
                    onOpenDeposit={() => {
                        console.log('Open deposit')
                        navigate("/new-deposit");
                    }}
                    linkUrl="/tariffs"
                />)}
            </CardsGrid>
        </div>
    );
}

export default Deposits;