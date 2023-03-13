import React from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import DepositCard from "@/widgets/deposit-card/ui/DepositCard";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";

function Deposits() {
    return (
        <div className="wrapper">
            <SectionTitle>Deposits</SectionTitle>
            <CardsGrid>
                <DepositCard
                    title="Deposit"
                    subtitle="Structural Deposit, until 09.09.2021"
                    price="0.0000"
                    currency="EUR"
                    onOpenDeposit={() => {console.log('Open deposit')}}
                    readMoreUrl="/"
                />
            </CardsGrid>
        </div>
    );
}

export default Deposits;