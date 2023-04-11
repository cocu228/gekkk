import React, {PropsWithChildren, useContext, useState} from 'react';
import styles from './style.module.scss';
import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import Modal from '@/shared/ui/modal/Modal';
import Tokens from '@/widgets/exchange/ui/exchange-field/tokens/Tokens';

export enum ExchangeFieldType {
    TOKEN = 1,
    PRICE = 2,
}

interface Props {
    value: string,
    infoText?: string,
    disabled?: boolean,
    labelType?: ExchangeFieldType,
    tokenLabelTitle?: string,
    tokenLabelIconUrl?: string,
    tokenLabelMax?: boolean
    priceLabelTitle?: string
}

function ExchangeField({value, infoText, disabled, labelType, tokenLabelTitle, tokenLabelIconUrl, tokenLabelMax, priceLabelTitle}: Props) {
    const {lg} = useContext(BreakpointsContext);
    const [tokenSelectOpen, setTokenSelectOpen] = useState<boolean>(false);

    const handleOpenTokenSelect = () => {
        setTokenSelectOpen(true);
    };

    const handleCloseTokenSelect = () => {
        setTokenSelectOpen(false);
    };

    const handleSelectToken = () => {
        setTokenSelectOpen(false);
    };

    return (
        <>
            <div className={`flex items-center ${styles.Field} ${disabled ? styles.disabled : ''}`}>
                <div className="h-full flex-grow relative">
                    <input className={styles.FieldInput} type="text" value={value}/>
                    {infoText && (
                        <div className={styles.FieldInfoText}>{infoText}</div>
                    )}
                </div>
                {labelType && (
                    <div className="flex items-center ml-auto shrink h-full">
                        {labelType === ExchangeFieldType.TOKEN && (
                            <>
                                {tokenLabelIconUrl || tokenLabelTitle ? (
                                    <>
                                        {tokenLabelMax && (
                                            <span className={styles.FieldMaxLabel}>{lg ? 'Maximum:' : 'Max'}</span>
                                        )}
                                        <button disabled={disabled} className={styles.FieldSelectBtn} onClick={handleOpenTokenSelect}>
                                            {tokenLabelIconUrl && (
                                                <img className={styles.FieldTokenIcon} src={tokenLabelIconUrl} alt={tokenLabelTitle}/>
                                            )}
                                            {tokenLabelTitle && (
                                                <span className={styles.FieldTokenTitle}>{tokenLabelTitle}</span>
                                            )}
                                            <IconDoubleArrows/>
                                        </button>
                                    </>
                                ) : (
                                    <button disabled={disabled} className={styles.FieldSelectBtn} onClick={handleOpenTokenSelect}>
                                        <span>Select token</span>
                                        <IconDoubleArrows/>
                                    </button>
                                )}
                            </>
                        )}
                        {labelType === ExchangeFieldType.PRICE && priceLabelTitle && (
                            <div className={styles.FieldPriceLabel}>
                                <span>{priceLabelTitle}</span>
                                <button disabled={disabled} className={styles.FieldSwitchBtn}>
                                    <img
                                        width={22}
                                        height={24}
                                        src={`/img/icon/ExchangeOrange.svg`}
                                        alt="ExchangeIcon"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Modal width={450} title="Select a token" open={tokenSelectOpen} onCancel={handleCloseTokenSelect}>
                <Tokens onSelect={handleSelectToken}/>
            </Modal>
        </>
    );
}

export default ExchangeField;