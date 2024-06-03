import {FC, useCallback} from "react";
import ReactToPrint from "react-to-print";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import Button from "@/shared/ui/button/Button";
import {IconApp} from "@/shared/ui/icons/icon-app";
import styles from "@/widgets/receipt/receiptData/styles.module.scss";

interface IReceiptButtonsProps {
    componentRef: HTMLDivElement | null;
    isLoading: boolean;
    isMobile?: boolean
    onCancel: () => void;
}

const ReceiptButtons: FC<IReceiptButtonsProps> = ({onCancel, isLoading, isMobile, componentRef}) => {
    const {t} = useTranslation();

    const content = () => componentRef;
    const trigger = useCallback(() => (
        <Button skeleton disabled={isLoading} className='w-full'>
            {t("download")} <IconApp size={20} code="t44" color="#2BAB72"/>
        </Button>
    ), [isLoading]);

    return (
        <div className={styles.ButtonContainer}>
            {isMobile ? (
                <Button skeleton disabled={isLoading} className='w-full'>
                    <IconApp size={20} code="t38" color="#2BAB72"/> {t("share")}
                </Button>
            ) : (
                <ReactToPrint
                    trigger={trigger}
                    content={content}
                    documentTitle={dayjs().format("dd-MM-YYYY_hh-mm-hh")}
                />
            )}
            <Button
                color="blue"
                className='w-full'
                onClick={onCancel}
            >
                {t("close")}
            </Button>
        </div>
    )
}

export default ReceiptButtons;