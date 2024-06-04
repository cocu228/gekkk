// import {Skeleton} from 'antd';
// import Decimal from 'decimal.js';
// import Card from "@/shared/ui/card/Card";
// import {useNavigate} from 'react-router-dom';
// import {scrollToTop} from '@/shared/lib/helpers';
// import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
// import DepositCard from "../cards/(no-usages)deposit-card/DepositCard";
// import SectionTitle from "@/shared/ui/section-title/SectionTitle";
// import {formatDate, formatDateTime, getDepositTitle} from '../../model/helpers';

// function DepositLayout() {
//     const navigate = useNavigate();
//     const investments = null;

//     return (
//         <div className="wrapper">
//             <SectionTitle>Deposits</SectionTitle>

//             <CardsGrid>
//                 {investments === null ? [1, 2, 3, 4].map((it, i) =>
//                     <Card key={"CARD_" + i}>
//                         <Skeleton active />
//                     </Card>
//                 ) : (<>

//                     {investments.length ? investments.map((item) =>
//                         <DepositCard
//                             title={getDepositTitle(item.dep_type)}
//                             subtitle={`Opened ${formatDateTime(new Date(item.date_start))}`}
//                             price={new Decimal(item.amount).toNumber()}
//                             until={formatDate(new Date(item.date_end))}
//                             currency={item.currency_id}
//                             onOpenDeposit={() => {
//                                 scrollToTop();
//                                 navigate(`/deposit/${item.id}`);
//                             }}
//                         />
//                     ) : (
//                         <DepositCard
//                             key='NewDepositCard'
//                             title='New crypto deposit'
//                             subtitle='Risk-protected investments in crypto'
//                             onOpenDeposit={() => {
//                                 scrollToTop();
//                                 navigate("/new-deposit");
//                             }}
//                         />
//                     )}
//                 </>)}
//             </CardsGrid>
//         </div>
//     );
// }

// export default DepositLayout;
