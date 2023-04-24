import React from 'react';
import ExchangeField, {ExchangeFieldType} from '@/widgets/exchange/ui/exchange-field/ExchangeField';
import DepthOfMarket from '@/widgets/exchange/ui/depth-of-market/DepthOfMarket';
import styles from './style.module.scss';
import IconChevronDown from '@/shared/ui/icons/IconChevronDown';
import OperationResult from '@/widgets/exchange/ui/operation-result/OperationResult';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import Button from '@/shared/ui/button/Button';
import OpenOrders from '@/widgets/exchange/ui/open-orders/OpenOrders';
import Modal from '@/shared/ui/modal/Modal';
import Confirm from '@/widgets/exchange/ui/confirm/Confirm';
import useModal from '@/shared/model/hooks/useModal';
import PageHead from '@/shared/ui/page-head/PageHead';
import Dropdown from '@/shared/ui/dropdown/Dropdown';
import DropdownItem from '@/shared/ui/dropdown/dropdown-item/DropdownItem';
import IconPrivateRoom from '@/shared/ui/icons/IconPrivateRoom';
import SplitGrid from '@/shared/ui/split-grid/SplitGrid';
import History from '@/widgets/history/ui/History';
import CreateRoom from '@/widgets/create-room/CreateRoom';
import InviteLink from '@/shared/ui/invite-link/InviteLink';
import ParticipantsNumber from '@/shared/ui/participants-number/ParticipantsNumber';

interface Props {
    type?: 'default' | 'creator' | 'visitor'
}

function Exchange({type = 'default'}: Props) {
    const confirmModal = useModal();
    const createRoomModal = useModal();
    const cancelRoomModal = useModal();
    const inviteLinkModal = useModal();

    const getHeadTitle = () => {
        switch (type) {
            case 'default':
                return (
                    <Dropdown
                        trigger={
                            <span>Exchange</span>
                        }
                        items={[
                            {
                                key: '1',
                                label: (
                                    <DropdownItem onClick={createRoomModal.showModal} icon={<IconPrivateRoom/>}>
                                        Create private exchange room
                                    </DropdownItem>
                                )
                            }
                        ]}
                    />
                );
            case 'creator':
                return 'EURG - XMR: exchange room';
            case 'visitor':
                return 'EURG - XMR: participant of exchange room';

        }
    };

    const getHeadSubtitle = () => {
        switch (type) {
            case 'default':
                return 'Cryptocurrency exchange - fast and easily';
            case 'creator':
                return (
                    <>
                        You are owner of this private room. A Gekkoin user will be able to join your room using this&nbsp;
                        <button className="underline text-accent" onClick={inviteLinkModal.showModal}>invite link</button>
                    </>
                );
            case 'visitor':
                return 'Private exchange room';

        }
    };

    const getHeadRightContent = () => {
        if (type === 'creator' || type === 'visitor') {
            return (
                <ParticipantsNumber
                    quantity={1}
                    showIcon={type === 'creator'}
                    onLeave={cancelRoomModal.showModal}
                />
            );
        }

        return null;
    };

    return (
        <div className="wrapper">

            <PageHead
                title={getHeadTitle()}
                subtitle={getHeadSubtitle()}
                rightContent={getHeadRightContent()}
            />

            <SplitGrid
                leftColumn={
                    <div className="py-5 px-10 lg:px-5 md:px-4">
                        <div className={`gap-x-14 xl:gap-x-5 ${styles.Grid}`}>
                            <div className="h-full flex flex-col">
                                <div className={styles.Head}>
                                    <div className="flex justify-between flex-wrap items-center gap-0.5">
                                        <div className="font-medium text-md lg:text-sm md:text-xs">Pay from</div>
                                        <div className="flex gap-1 md:gap-0.5">
                                            <button className={styles.Btn}>25%</button>
                                            <button className={styles.Btn}>50%</button>
                                            <button className={styles.Btn}>75%</button>
                                            <button className={styles.Btn}>100%</button>
                                        </div>
                                    </div>
                                </div>
                                <ExchangeField
                                    value="00.00"
                                    infoText="Balance: "
                                    labelType={ExchangeFieldType.TOKEN}
                                />
                                <div className={`flex justify-center ${styles.FieldsSpacer}`}>
                                    <IconChevronDown/>
                                </div>
                                <div className="font-medium text-md lg:text-sm md:text-xs">Receive to</div>
                                <ExchangeField
                                    value="00.00"
                                    infoText="Balance: "
                                    labelType={ExchangeFieldType.TOKEN}
                                />
                                <div className="mt-3 md:mt-2">
                                    <div className="font-medium text-md lg:text-sm md:text-xs">Price</div>
                                    <ExchangeField
                                        disabled
                                        value=""
                                    />
                                </div>
                                <div
                                    className="flex justify-between items-baseline gap-x-2.5 md:gap-x-1 mt-1 text-secondary flex-wrap">
                                    <div className="flex justify-between flex-grow text-xs md:text-[0.625rem] sm:text-[0.5rem]">
                                        <span>Market rate</span>
                                        <span>~125,04 </span>
                                    </div>
                                    <div className="text-[0.625em] sm:text-[0.5rem] ml-auto">EURG per 1 XMR</div>
                                </div>
                                <div className="mt-6 md:mt-3.5">
                                    <Checkbox disabled>
                            <span className="lg:text-sm md:text-xs sm:text-[0.625rem]">Sell a <strong
                                className="font-semibold">token</strong> at the market rate</span>
                                    </Checkbox>
                                </div>
                                <div className="mt-auto">
                                    <div className="mt-10 md:mt-6">
                                        <OperationResult get="62,5  EURG" pay="0,5  XMR"/>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <DepthOfMarket/>
                            </div>
                            <div className={`mt-7 ${styles.GridFooter}`}>
                                <Button className="w-full" size="xl" onClick={confirmModal.showModal}>Buy XMR</Button>
                                <div className="mt-5 lg:mt-2.5 px-8 text-secondary text-xs text-center">
                                    order execution depends on the market situation
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <OpenOrders/>
                        </div>
                        <Modal
                            width={400}
                            title="Confirm the order"
                            open={confirmModal.isModalOpen}
                            onCancel={confirmModal.handleCancel}
                        >
                            <Confirm
                                payValue="62,5"
                                payToken="EURG"
                                getValue="~0,5"
                                getToken="XMR"
                                price="1 XMR ~ 125,04 EURG"
                                info="(sale at the current market rate) "
                                onConfirm={() => {
                                    confirmModal.handleCancel();
                                }}
                            />
                        </Modal>
                    </div>
                }
                rightColumn={
                    <div className="py-5 px-10 lg:px-5 md:px-4">
                        <History/>
                    </div>
                }
            />

            {type === 'default' && (
                <Modal
                    width={450}
                    title="Open private exchange room"
                    open={createRoomModal.isModalOpen}
                    onCancel={createRoomModal.handleCancel}
                >
                    <CreateRoom/>
                </Modal>
            )}

            {type === 'creator' && (
                <Modal
                    width={450}
                    title="Invite link"
                    open={inviteLinkModal.isModalOpen}
                    onCancel={inviteLinkModal.handleCancel}
                >
                    <InviteLink link="gekkoin.com/+rewrlnvnk987323 "/>
                </Modal>
            )}

            {(type === 'creator' || type === 'visitor') && (
                <Modal
                    width={450}
                    title="Close private exchange room"
                    open={cancelRoomModal.isModalOpen}
                    onCancel={cancelRoomModal.handleCancel}
                >
                    <div className="pt-5 text-sm">Are you sure you want to close the current EUR - XMR private exchange room?
                        All unclosed orders will be canceled.
                    </div>
                    <div className="mt-16 sm:mt-14">
                        <Button size="xl" className="w-full">Close private exchange room</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Exchange;