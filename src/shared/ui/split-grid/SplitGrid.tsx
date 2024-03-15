import React from 'react';
import styles from './styles.module.scss';

interface Props {
    leftColumn?: React.ReactNode,
    rightColumn?: React.ReactNode,
}

function SplitGrid({leftColumn, rightColumn}: Props) {

    return (
        <div className={`flex bg-bgPrimary md:shadow-[0_0_30px_5px_rgba(41,117,215,0.15)] xxxl:flex-col ${styles.SplitGrid}`}>
            {leftColumn && (
                <div className={`flex-1 ${styles.Left}`}>{leftColumn}</div>
            )}
            {rightColumn && (
                <div className="flex-1">{rightColumn}</div>
            )}
        </div>
    );
}

export default SplitGrid;
