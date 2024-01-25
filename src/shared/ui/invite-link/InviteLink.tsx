import ReactQRCode from 'react-qr-code';
import {useTranslation} from 'react-i18next';
import {RoomInfo} from "@/shared/(orval)api/shared/model";
import ClipboardField from '@/shared/ui/clipboard-field/ClipboardField';
import ModalInfoText from '@/shared/ui/modal/modal-info-text/ModalInfoText';

interface IParams {
    roomInfo: RoomInfo;
}

function InviteLink({roomInfo = null}: IParams) {
    const {t} = useTranslation();
    const getInviteUrl = (): string => {
        const {
            port,
            protocol,
            hostname,
        } = window.location;
        const host = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

        return `${host}/exchange?privateRoom=${roomInfo ? roomInfo.room_code : null}`;
    }

    return (
        <div className="wrapper">
            <ModalInfoText>
                {t("exchange.any_gekkard_user")}
            </ModalInfoText>
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
            <div className="mt-2.5 text-sm font-medium">
                {t("exchange.invite_link_is_available")}
            </div>
        </div>
    );
}

export default InviteLink;
