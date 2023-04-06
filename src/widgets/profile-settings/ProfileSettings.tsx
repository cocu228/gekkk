import React from 'react';
import styles from './style.module.scss';
import IconPersonalId from '@/shared/ui/icons/IconPersonalId';
import IconStatus from '@/shared/ui/icons/IconStatus';
import IconEnvelope from '@/shared/ui/icons/IconEnvelope';
import IconPrivacy from '@/shared/ui/icons/IconPrivacy';

function ProfileSettings() {
    return (
        <div className={`bg-bgPrimary rounded ${styles.Wrapper}`}>
            <div className={`p-4 bg-bgSecondary rounded ${styles.Grid}`}>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <IconPersonalId/>
                        <span className="text-secondary text-sm font-semibold">Personal ID</span>
                    </div>
                    <div className="text-lg font-bold">22899887892</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <IconStatus/>
                        <span className="text-secondary text-sm font-semibold">Current status</span>
                    </div>
                    <div className="text-lg font-bold underline">Verified</div>
                    <div className="text-sm text-secondary">Your verification is completed</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <IconEnvelope/>
                        <span className="text-secondary text-sm font-semibold">Email</span>
                    </div>
                    <div className="text-lg font-bold underline">example@bk.ru</div>
                    <div className="text-sm text-secondary">You will get your invoices to the email below</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <IconPrivacy/>
                        <span className="text-secondary text-sm font-semibold">Private exchange room</span>
                    </div>
                    <div className="text-lg font-bold underline">Create room</div>
                    <div className="text-sm text-secondary">Exchange of assets for a closed group of participants</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;