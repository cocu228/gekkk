import React from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import DepositCard from "@/widgets/deposit/ui/DepositCard";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";

export default function () {
    return (
        <div className="wrapper">
            <SectionTitle>Deposits</SectionTitle>
            <CardsGrid>
                <DepositCard
                    title="Deposit"
                    subtitle="Structural Deposit, until 09.09.2021"
                    price="0.0000"
                    currency="EUR"
                    onOpenDeposit={() => {
                        console.log('Open deposit')
                    }}
                    readMoreUrl="/"
                />
            </CardsGrid>
        </div>
    );
}