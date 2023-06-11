import {Skeleton} from 'antd';
import Decimal from 'decimal.js';
import Card from "@/widgets/dashboard/ui/cards/card/Card";
import {useNavigate} from 'react-router-dom';
import {scrollToTop} from '@/shared/lib/helpers';
import CardsGrid from "@/pages/dashboard/ui/cards-grid/CardsGrid";
import DepositCard from "../../../widgets/dashboard/ui/cards/deposit-card/DepositCard";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {storeInvestments} from '@/shared/store/investments/investments';
import {formatDate, formatDateTime, getDepositTitle} from '../model/helpers';
import Button from "@/shared/ui/button/Button";

function DepositLayout() {

    const navigate = useNavigate();
    const investments = storeInvestments(state => state.investments);

    const skeleton = investments === null ? [1, 2, 3, 4].map((it, i) =>
        <Card key={"CARD_" + i}>
            <Skeleton active/>
        </Card>) : null

    return (
        <div className="wrapper">

            <SectionTitle>Deposits</SectionTitle>
            <CardsGrid>
                <Card className={"bg-green"}>
                    <p className="text-fs24 text-white font-bold">New crypto deposit</p>
                    <p className="text-fs14 mt-[4px] font-medium text-white">0.8% per month or stractured
                        deposits</p>
                    <div className="mt-auto pt-[20px]">
                        <div className='flex justify-between'>
                        </div>
                        <div className="flex w-[130px]">
                            <Button onClick={() => navigate("new-deposit")} white>
                                Open deposit
                            </Button>
                        </div>
                    </div>
                </Card>
                {skeleton}
                {investments?.map((item) =>
                        <DepositCard
                            title={getDepositTitle(item.dep_type)}
                            subtitle={`Opened ${formatDateTime(new Date(item.date_start))}`}
                            price={new Decimal(item.amount).toNumber()}
                            until={formatDate(new Date(item.date_end))}
                            currency={item.currency_id}
                            onOpenDeposit={() => {
                                scrollToTop();
                                navigate(`/deposit/${item.id}`);
                            }}
                        />
                    )}
            </CardsGrid>
        </div>
    );
}

export default DepositLayout;
