import {FC} from 'react'
import style from './styles.module.scss'
import { IconApp } from '@/shared/ui/icons/icon-app'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ExchangeRoomMenu } from '@/widgets/header/ui/mobile/ExchangeRoomMenu'
import useModal from '@/shared/model/hooks/useModal'
import { RoomInfo } from '@/shared/(orval)api/gek/model'
import { useTranslation } from 'react-i18next'


interface ExchangeHeaderProps {
    title: React.ReactNode,
    text: React.ReactNode,
    privateRoomInfo: RoomInfo
}

export const ExchangeHeader:FC<ExchangeHeaderProps> = ({title, text, privateRoomInfo}) => {
    const [params] = useSearchParams();
    const {t} = useTranslation()
    const roomId = params.get('roomId');
    const navigate = useNavigate()
    const loc = useLocation()
    const roomCloseModal = useModal();

    return (
        <>
            <div className={style.ExchangeHeader}>
                {
                    privateRoomInfo ? (
                        <IconApp code='t33' color="#285E69" size={42} />
                    ) : (
                        <IconApp code='t68' color="#285E69" size={42} />
                    )
                }
                <div className={`${style.ExchangeHeaderTitleGroup} ${privateRoomInfo && 'h-full justify-between'}`}>
                    <span className={style.ExchangeHeaderTitleGroupTitle}>{title}</span>
                    <span className={style.ExchangeHeaderTitleGroupText}>{text}</span>
                </div>
                {
                    privateRoomInfo && (
                        <div className={`${style.ExchangePrivateInfo}`}>
                            <span className={style.ExchangePrivateParticipantsQuantity}>
                                {t('number_of_participants')} 
                                <div className={style.ExchangePrivateParticipantsQuantityWrap}>
                                    {privateRoomInfo.count}
                                    <IconApp code={'t63'} size={13} color='#285E69' />
                                </div>
                            </span>
                            {
                                privateRoomInfo.room_code ? (
                                    <div onClick={() => roomCloseModal.showModal()} className={style.ExchangePrivateInfoClose}>
                                        {t("close_room")}
                                        <IconApp code='t69' size={23} color='#8F123A' />
                                    </div>
                                ) : (
                                    <div onClick={() => roomCloseModal.showModal()} className={style.ExchangePrivateInfoClose}>
                                        {t("exchange.leave_the_room")}
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
            <div className={style.ExchangeTabsBlock}>
                <div onClick={() => navigate('/exchange')} className={`${style.ExchangeTabsBlockItem} ${loc.pathname === '/exchange' && style.ExchangeTabsBlockItemActive}`}>Exchange</div>
                <ExchangeRoomMenu roomCloseModal={roomCloseModal} desktop={true} roomId={roomId}/>
            </div>
        </>
    )
}