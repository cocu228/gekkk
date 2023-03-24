import React, {PropsWithChildren} from 'react';
import styles from './style.module.scss';
import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';

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
    return (
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
                                        <span className={styles.FieldMaxLabel}>Max</span>
                                    )}
                                    <button className={styles.FieldSelectBtn}>
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
                                <button className={styles.FieldSelectBtn}>
                                    <span>Select token</span>
                                    <IconDoubleArrows/>
                                </button>
                            )}
                        </>
                    )}
                    {labelType === ExchangeFieldType.PRICE && priceLabelTitle && (
                        <div className={styles.FieldPriceLabel}>
                            <span>{priceLabelTitle}</span>
                            <button className={styles.FieldSwitchBtn}>
                                <img
                                    width={22}
                                    height={24}
                                    src={`/public/img/icon/ExchangeOrange.svg`}
                                    alt="ExchangeIcon"
                                />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ExchangeField;