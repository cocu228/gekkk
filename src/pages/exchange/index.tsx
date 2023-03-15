import React from 'react';
import SplitGrid from '@/shared/ui/split-grid/SplitGrid';
import PageHead from '@/shared/ui/page-head/PageHead';
import History from '@/widgets/history/ui/History';

export default () => {
    return (
        <div className="wrapper">
            <PageHead
                title={"Exchange"}
                subtitle={"Cryptocurrency exchange - fast and easily"}
            />
            <SplitGrid
                leftColumn={<div className="p-5">left</div>}
                rightColumn={
                    <div className="py-5 px-10">
                        <History
                            withSurface={false}
                        />
                    </div>
                }
            />
        </div>
    );
}