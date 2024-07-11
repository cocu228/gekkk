import ReactQRCode from 'react-qr-code';
import styles from './styles.module.scss';
import {useTranslation} from 'react-i18next';
import {RoomInfo} from "@/shared/(orval)api/gek/model";
import ClipboardField from '@/shared/ui/clipboard-field/ClipboardField';
import { IconApp } from '../icons/icon-app';
import Button from '../button/Button';

interface IParams {
    roomInfo: RoomInfo;
    onClose?: ()=>void
}

function InviteLink({roomInfo = null, onClose = null}: IParams) {
    const {t} = useTranslation();
    const getInviteUrl = (): string => {
        const {
            port,
            protocol,
            hostname,
        } = window.location;
        const host = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

        return `${host}/private-room?privateRoom=${roomInfo ? roomInfo.room_code : null}`;
    }

    return (
        <div className="wrapper">
            <div className={styles.ModalText}>
                <div>
                    <IconApp color="#8F123A" size={15} code="t27" />
                </div>
                <span>{t("exchange.any_gekkard_user")}</span>
            </div>
            <div className='flex justify-center my-6 sm:mt-11 '>
                <div className="w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                    <div style={{height: "auto", margin: "0 auto", maxWidth: "120px", width: "100%"}}>
                        <ReactQRCode
                            size={148}
                            style={{height: "auto", maxWidth: "120px", width: "100%"}}
                            value={getInviteUrl()}
                            viewBox={`0 0 148 148`}
                        />
                    </div>
                </div>
            </div>
            <ClipboardField value={getInviteUrl()}/>
            <div className={styles.LinkText}>
                {t("exchange.invite_link_is_available")}
            </div>
            <div className={styles.ButtonWrapper}>
                <Button
                    color='blue'
                    className='!w-[120px] mt-[10px]'
                    onClick={onClose}
                >
                    {t("close")}
                </Button>
            </div>
        </div>
    );
}

export default InviteLink;
