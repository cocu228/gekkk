import {IRoomInfo} from '@/shared/api';
import ReactQRCode from 'react-qr-code';
import ClipboardField from '@/shared/ui/clipboard-field/ClipboardField';
import ModalInfoText from '@/shared/ui/modal/modal-info-text/ModalInfoText';

interface IParams {
    roomInfo: IRoomInfo;
}

function InviteLink({roomInfo = null}: IParams) {
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
                Any Gekkard user will be able to join your
                privite exchange room by folowing this link.
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
                This invite link is available for 24 hours.
            </div>
        </div>
    );
}

export default InviteLink;
