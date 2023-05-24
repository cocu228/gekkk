import { Skeleton } from 'antd';
import Decimal from 'decimal.js';
import Card from "@/shared/ui/card/Card";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import DepositCard from "../cards/deposit-card/DepositCard";
import { IResInvestments, apiInvestments } from "@/shared/api";
import { formatDate, formatDateTime } from '../../model/helpers';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import StructedDepositStrategies from '@/shared/config/deposits/structed-strategies';

function getTypeTitle(depType: number) {
    if (depType === 1)
        return 'Fixed rate strategy (0,8% per month)';

    const { name, percentageTypes } = StructedDepositStrategies.find(s =>
        Math.trunc(s.id / 10) === Math.trunc(depType / 10)
    );

    const { risePercentage, dropPercentage } = percentageTypes[depType % 10];

    return `${name} strategy (${risePercentage}/${dropPercentage})`;
}

function DepositLayout() {

    const [investments, setInvestments] = useState<IResInvestments[]>(null)

    useEffect(() => {

        (async () => {
            const { data } = await apiInvestments();
            setInvestments(data.result);
        })()

    }, []);

    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <SectionTitle>Deposits</SectionTitle>

            <CardsGrid>
                {investments === null ? [1, 2, 3, 4].map((it, i) =>
                    <Card key={"CARD_" + i}>
                        <Skeleton active />
                    </Card>
                ) : (<>

                    {investments.length ? investments.map((item, i) =>
                        <DepositCard
                            isDeposit={true}
                            key={"DepositCard-" + i}
                            title={getTypeTitle(item.dep_type)}
                            subtitle={`Opened ${formatDateTime(new Date(item.date_start))}`}
                            price={new Decimal(item.amount).toNumber()}
                            until={formatDate(new Date(item.date_end))}
                            currency={item.currency_id}
                            linkUrl="/deposit-types"
                            onOpenDeposit={() => {
                                navigate(`/current-deposit`);
                            }}
                        />
                    ) : (
                        <DepositCard
                            key='NewDepositCard'
                            title='New crypto deposit'
                            subtitle='Risk-protected investments in crypto'
                            linkUrl="/deposit-types"
                            onOpenDeposit={() => {
                                navigate("/new-deposit");
                            }}
                        />
                    )}

                </>)}
            </CardsGrid>
        </div>
    );
}

export default DepositLayout;
