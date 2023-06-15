import {useContext} from 'react';
import ReactQRCode from 'react-qr-code';
import {CtxExchangeData} from '@/widgets/exchange/model/context';
import ClipboardField from '@/shared/ui/clipboard-field/ClipboardField';
import ModalInfoText from '@/shared/ui/modal/modal-info-text/ModalInfoText';

function InviteLink() {
    const {
        roomInfo
    } = useContext(CtxExchangeData);

    return (
        <div className="wrapper">
            <ModalInfoText>
                Any Gekkoin user will be able to join your
                privite exchange room by folowing this link.
            </ModalInfoText>
            <div className='flex justify-center my-6 sm:mt-11 '>
                <div className="w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                    <div style={{height: "auto", margin: "0 auto", maxWidth: "120px", width: "100%"}}>
                        <ReactQRCode
                            size={148}
                            style={{height: "auto", maxWidth: "120px", width: "100%"}}
                            value={`gekkard.com/${roomInfo.room_code}`}
                            viewBox={`0 0 148 148`}
                        />
                    </div>
                </div>
            </div>
            <ClipboardField value={`gekkard.com/${roomInfo.room_code}`}/>
            <div className="mt-2.5 text-sm font-medium">
                This invite link is available for 24 hours.
            </div>
        </div>
    );
}

export default InviteLink;
