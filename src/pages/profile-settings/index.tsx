import React from 'react';
import styles from './style.module.scss';
import IconPersonalId from '@/shared/ui/icons/IconPersonalId';
import IconStatus from '@/shared/ui/icons/IconStatus';
import { IconApp } from '@/shared/ui/icons/icon-app';

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
                        <IconApp code='t29' size={20} color='#2BAB72' />
                        <span className="text-secondary text-sm font-semibold">Email</span>
                    </div>
                    <div className="text-lg font-bold underline">example@bk.ru</div>
                    <div className="text-sm text-secondary">You will get your invoices to the email below</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <IconApp code='t33' size={20} color='#2BAB72' />
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