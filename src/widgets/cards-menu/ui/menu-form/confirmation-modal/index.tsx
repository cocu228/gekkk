import useModal from "@/shared/model/hooks/useModal";
import {Modal} from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { apiActivate, apiSetLimits } from "@/shared/(orval)api";
import { Card as ICardData } from "@/shared/(orval)api/gek/model/card";
import Loader from "@/shared/ui/loader";
import { Period } from "@/shared/(orval)api/gek/model";

interface IParams {
    onCancel: () => void;
    switchChecked: boolean;
    selectedCard: ICardData;
    selectedItem: string | null;
    updateCard: (card: ICardData) => void;
    setSwitchChecked: (checked: boolean) => void;
}

const ConfirmationModal = ({
    onCancel,
    updateCard,
    selectedCard,
    selectedItem,
    switchChecked,
    setSwitchChecked
}: IParams) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const { isModalOpen, showModal, handleCancel: cancelModal } = useModal();
    const { inputCurr: limitAmount, setInputCurr: setLimitAmount } = useInputState();

    useEffect(() => {
        if (selectedItem !== null) {
            showModal();
        }
    }, [selectedItem]);

    const handleCancel = () => {
        onCancel();
        cancelModal();
    }

    const onConfirm = async (action: string) => {
        setLoading(true);

        switch (action) {
            case "activate":
                apiActivate({ cardId: selectedCard.cardId }).then(({ data }) => {
                    if (data.result === "Failure") {
                        handleCancel();
                        return;
                    }

                    updateCard({
                        ...selectedCard,
                        cardStatus: "ACTIVE",
                    });

                    setLoading(false);
                    handleCancel();
                });
                break;

            case "blockCard":
                apiSetLimits({ status: "LOCKED", limits: []}, {
                    cardId: selectedCard.cardId
                }).then(({ data }) => {
                    if (data.result === "Failure") {
                        handleCancel();
                        return;
                    }

                    updateCard({
                        ...selectedCard,
                        cardStatus: "BLOCKED_BY_CUSTOMER",
                    });

                    setLoading(false);
                    handleCancel();
                });
                break;

            case "unblockCard":
                apiSetLimits({status: "ACTIVE", limits: []}, {
                    cardId: selectedCard.cardId
                }).then(({ data }) => {
                    if (data.result === "Failure") {
                        handleCancel();
                        return;
                    }

                    updateCard({
                        ...selectedCard,
                        cardStatus: "ACTIVE",
                    });

                    setLoading(false);
                    handleCancel();
                });
                break;

            case "dailyLimit":
            case "monthlyLimit":
                apiSetLimits({
                    limits: [
                        {
                            type: action === "dailyLimit" ? Period.DAILY : Period.MONTHLY,
                            maxValue: limitAmount.value.number,
                        },
                    ]}, {
                    cardId: selectedCard.cardId
                }).then(({ data }) => {
                    if (data.result === "Failure") {
                        handleCancel();
                        return;
                    }

                    updateCard({
                        ...selectedCard,
                        limits: [
                            ...selectedCard.limits.filter(
                                (l) =>
                                    l.period !== (action === "dailyLimit" ? "DAILY" : "MONTHLY")
                            ),
                            {
                                type: "ALL",
                                period: action === "dailyLimit" ? "DAILY" : "MONTHLY",
                                usedLimit: 0,
                                currentLimit: limitAmount.value.number,
                                maxLimit: 100000,
                            },
                        ],
                    });

                    setLimitAmount("");
                    setLoading(false);
                    handleCancel();
                });
                break;

            case "disableLimits":
                apiSetLimits({
                    limits: [],
                    options: {
                        limits: {
                            disable: !switchChecked,
                        },
                    },
                }, {
                    cardId: selectedCard.cardId
                }).then(({ data }) => {
                    if (data.result === "Failure") {
                        handleCancel();
                        return;
                    }

                    setSwitchChecked(!switchChecked);
                    setLimitAmount("");
                    setLoading(false);
                    handleCancel();
                });
                break;

            default:
                break;
        }
    };

    return (
        <Modal
            onCancel={handleCancel}
            isModalOpen={isModalOpen}
            title={t("confirm_action")}
        >
            {loading ? <Loader className="relative"/> : <>
                {selectedItem === "blockCard" && (
                    <div className="mb-5">
                        <div className={styles.Warning}>
                            <IconApp size={108} code="t56" color="#8F123A" />
                            <h1 className={styles.Blocker}>Block card</h1>
                            <p className={`md:text-fs12 text-fs14 ${styles.Text}`}>
                                Are you sure you want to
                                <br />
                                <b>Block selected bank card</b>?
                            </p>
                        </div>
                    </div>
                )}

                {selectedItem === "unblockCard" && (
                    <div className="mb-5 md:text-fs12 text-fs14">{t("unblock_selected_bank_card")}</div>
                )}

                {selectedItem === "activate" && (
                    <>
                        <div className="mb-5 md:text-fs12 text-fs14">{t("for_security_reasons")}</div>
                        <div className="mb-5 md:text-fs12 text-fs14">{t("virtual_card_data_for_online")}</div>
                        <div className="mb-5 md:text-fs12 text-fs14">{t("using_your_physical_card")}</div>
                        <div className="mb-5 md:text-fs12 text-fs14 font-bold">{t("activate_your_card")}</div>
                    </>
                )}

                {(selectedItem === "dailyLimit" || selectedItem === "monthlyLimit") && (
                        <>
                            <div className="md:text-fs12 text-fs14 mb-2 font-semibold">{t("limit_amount")}</div>
                            <div className="mb-5">
                                <InputCurrency
                                    placeholder={t("exchange.enter_amount")}
                                    currency={"EUR"}
                                    onChange={setLimitAmount}
                                    value={limitAmount.value.string}
                                />
                            </div>
                        </>
                    )}

                {selectedItem === "disableLimits" && (
                    <div className="md:text-fs12 text-fs14 text-[var(--gek-additional)]">{t("disable_limits")}</div>
                )}

                <form onSubmit={() => {onConfirm(selectedItem)}}>
                    <div className={styles.FormBody}>
                        <Button
                            htmlType='submit'
                            text={t("confirm")}
                            className="w-full"
                        />

                        <Button
                            skeleton
                            text={t("cancel")}
                            className="w-full"
                            onClick={handleCancel}
                        />
                    </div>
                </form>
            </>}
        </Modal>
    );
}

export default ConfirmationModal;
