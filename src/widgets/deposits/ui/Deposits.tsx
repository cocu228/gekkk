import React from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import DepositCard from "@/shared/ui/deposit-card/DepositCard";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {useNavigate} from 'react-router-dom';

function Deposits() {
    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <SectionTitle>Deposits</SectionTitle>
            <CardsGrid>
                <DepositCard
                    title="New crypto deposit"
                    subtitle="Risk-protected investments in crypto"
                    price="0.00"
                    currency="EURG"
                    onOpenDeposit={() => {
                        console.log('Open deposit')
                        navigate("/new-deposit");
                    }}
                    linkUrl="/tariffs"
                />
                <DepositCard
                    title="Deposit"
                    subtitle="Structural Deposit, until 09.09.2021"
                    price="0.00"
                    currency="EURG"
                    onOpenDeposit={() => {
                        console.log('Open deposit')
                        navigate("/new-deposit");
                    }}
                    linkUrl="/tariffs"
                    isDeposit
                />
            </CardsGrid>
        </div>
    );
}

export default Deposits;