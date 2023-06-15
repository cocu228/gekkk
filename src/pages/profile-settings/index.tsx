import React from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import ProfileSettings from '@/widgets/profile-settings/ProfileSettings';

export default () => {
    return (
        <div className="wrapper">
            <PageHead
                title={"Profile settings"}
            />
            <ProfileSettings/>
        </div>
    );
}