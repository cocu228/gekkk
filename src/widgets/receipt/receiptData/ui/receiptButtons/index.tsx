import { FC, MutableRefObject } from "react";
import generatePDF from 'react-to-pdf'
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import { IconApp } from "@/shared/ui/icons/icon-app";
import styles from "@/widgets/receipt/receiptData/styles.module.scss";

interface IReceiptButtonsProps {
    componentRef: MutableRefObject<HTMLDivElement> | null;
    isLoading: boolean;
    isMobile?: boolean;
    onCancel: () => void;
}

const ReceiptButtons: FC<IReceiptButtonsProps> = ({ onCancel, isLoading, isMobile, componentRef }) => {
    const { t } = useTranslation();

    const handleOnGeneratePDF = async (method: "save" | "build") => {
        if (componentRef?.current) {
            return await generatePDF(componentRef, { method, filename: dayjs().format("DD-MM-YYYY_HH-mm-ss") })
        } else {
            console.log("Component reference is null.");
            return null;
        }
    };

    const handleOnDownLoadOrShare = async () => {
        if (!isMobile) {
            await handleOnGeneratePDF("save");
        } else {
            const pdf = await handleOnGeneratePDF("build");
            if (pdf) {
                const pdfBlob = pdf.output('blob');
                const file = new File([pdfBlob], dayjs().format("DD-MM-YYYY_HH-mm-ss") + ".pdf", { type: 'application/pdf' });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({ files: [file] });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    console.log("Can't share");
                }
            }
        }
    };

    return (
        <div className={styles.ButtonContainer}>
            <Button skeleton disabled={isLoading} className='w-full' onClick={handleOnDownLoadOrShare}>
                {isMobile ? (
                    <>
                        <IconApp size={20} code="t38" color="#2BAB72"/>
                        {t("share")}
                    </>
                ) : (
                    <>
                        {t("download")}
                        <IconApp size={20} code="t44" color="#2BAB72"/>
                    </>
                )}
            </Button>
            <Button
                color="blue"
                className='w-full'
                onClick={onCancel}
            >
                {t("close")}
            </Button>
        </div>
    );
};

export default ReceiptButtons;