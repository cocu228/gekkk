import { ModalProps } from "antd";
import Modal from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import { IDepositStrategyData } from "../model/helpers";
import { formatForCustomer } from "@/shared/lib/date-helper";
import { GetDepositOut } from "@/shared/(orval)api/gek/model";
import { useTranslation } from "react-i18next";

type IParams = ModalProps & {
    isFixed: boolean;
    investment: GetDepositOut;
    strategyData: IDepositStrategyData;
    onDepositClose: () => void;
}

const ClosingDepositModal = ({
    open,
    isFixed,
    investment,
    strategyData,
    onCancel,
    onDepositClose,
    ...props
}: IParams) => {
    const {
        strategy,
        percentageType
    } = strategyData;
    const {
        risePercentage,
        dropPercentage
    } = percentageType;
    const {t} = useTranslation()

    return (
        <Modal padding open={open} onCancel={onCancel} {...props}>
            <p className="font-bold text-xl mb-6 md:text-lg md:mb-5">Closing your deposit</p>
            <div className="mb-4">
                <p className="font-medium text-gray-500 mb-1">Deposit:</p>
                <p className="font-medium">
                    {isFixed ? (
                        <span>Fixed rate deposit: 0,8% per month</span>
                    ) : (
                        <span>Structed {strategy.name.toLowerCase()} strategy
                            deposit {risePercentage}/{dropPercentage}</span>
                    )}
                </p>
            </div>

            <div className="mb-4 flex justify-between">
                <div>
                    <p className="font-medium text-gray-500 mb-1">{t("amount")}:</p>
                    <p className="font-medium">{investment.amount} {investment.currency_id}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-500 mb-1">Until:</p>
                    <p className="font-medium">{formatForCustomer(investment.date_end)}</p>
                </div>
            </div>

            <div className="mb-8 md:mb-4">
                <p className="font-medium text-gray-500 mb-1">Your balance if you close the deposit now:</p>
                <p className="font-medium">{investment.amount} {investment.currency_id}</p>
            </div>

            <Button
                color="gray"
                className="w-full rounded-b disabled:opacity-50"
                onClick={onDepositClose}
            >{t("confirm")}</Button>
        </Modal>
    )
}

export default ClosingDepositModal;
