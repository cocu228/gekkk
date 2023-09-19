import {useContext, useEffect} from 'react';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import { CASHBACK_DATA } from '../model/cashback-data';
import CashbackCard from './CashbackCard';
import CashbackCardMobile from './CashbackCardMobile';
import useModal from '@/shared/model/hooks/useModal';
import Modal from '@/shared/ui/modal/Modal';
import { apiGetDeals } from '@/shared/api/various/get-deals';

const EurCashbackProgram = () => {
    const { sm } = useContext(BreakpointsContext);
    const { isModalOpen, showModal, handleCancel } = useModal()

    useEffect(() => {

        (async function () {
            const dealsResponse = await apiGetDeals();
            console.log("Deals",dealsResponse)

        })();
    })

    return (
        <div className='grid grid-cols-1 justify-center'>
            {CASHBACK_DATA.map(cashback => {
                const { subtitle, className, mobileModalColor, iconPath, description, conditions } = cashback;
                return !sm ? (
                    <CashbackCard
                        subtitle={subtitle}
                        className={className}
                        iconPath={iconPath}
                        description={description}
                        conditions={conditions}
                    />
                ) 
                : (
                    <CashbackCardMobile
                        subtitle={subtitle}
                        className={className}
                        modalColor={mobileModalColor}
                        iconPath={iconPath}
                        description={description}
                        conditions={conditions}
                        // showModal={showModal}
                    />
                )
            })}
            <Modal onCancel={handleCancel} title={"Look"} open={isModalOpen}>
                <div className='h-full'>Test</div>
            </Modal>
        </div>
    );
};

export default EurCashbackProgram;
