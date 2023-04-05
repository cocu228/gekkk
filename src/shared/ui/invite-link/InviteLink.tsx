import React from 'react';
import styles from './style.module.scss';
import {QRCode} from 'antd';
import CopyToClipboard from '@/shared/ui/copy-to-clipboard/CopyToClipboard';
import ModalInfoText from '@/shared/ui/modal/modal-info-text/ModalInfoText';

interface Props {
    link: string
}

function InviteLink({link}: Props) {
    return (
        <div className="wrapper">
            <ModalInfoText>
                Any Gekkoin user will be able to join your
                privite exchange room by folowing this link.
            </ModalInfoText>
            <div className={`flex justify-center my-6 sm:mt-11 ${styles.Code}`}>
                <QRCode size={140} value={link} />
            </div>
            <CopyToClipboard text={link}/>
            <div className="mt-2.5 text-sm font-medium">
                This invite link is available for 24 hours.
            </div>
        </div>
    );
}

export default InviteLink;