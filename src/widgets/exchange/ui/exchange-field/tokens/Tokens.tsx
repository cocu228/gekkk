import React from 'react';
import Input from '@/shared/ui/input/Input';
import styles from './style.module.scss';

interface Props {
    onSelect: () => void
}

function Tokens({onSelect}: Props) {
    return (
        <div className={`flex flex-col ${styles.Wrapper}`}>
            <Input placeholder="Search name"/>
            <div className="flex justify-between mt-5 mb-2 text-secondary text-sm">
                <span>Name</span>
                <span>Quantity</span>
            </div>
            <div className={styles.ItemsList}>
                {Array.from(Array(100).keys()).map(item => (
                    <div className={`flex justify-between items-center text-sm font-medium gap-4 ${styles.Item}`} onClick={onSelect}>
                        <span className="inline-flex items-center gap-2.5">
                            <img
                                width={29}
                                height={29}
                                src="/img/icon/EurgIcon.svg"
                                alt="ExchangeIcon"
                            />
                            <span>Gekkoin Europe (EURG)</span>
                        </span>
                        <span className="shrink-0">1000,00</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tokens;
