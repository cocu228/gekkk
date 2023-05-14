import { format } from "date-fns";
import { ModalProps } from "antd";
import { useContext } from "react";
import Modal from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import { getTermEnd } from "../../model/helpers";
import { CtxNewDeposit } from "../../model/context";
import InlineProperty from "@/shared/ui/inline-property";
import { DepositType } from "@/shared/config/deposits/types";
import { apiCreateInvestment } from "@/shared/api/invest/create-investments";

const OpenDepositModal = ({ open, onCancel, ...props }: ModalProps) => {
    const {
        type,
        rate,
        token,
        amount,
        term_in_days,
        percentageType,
        structedStrategy,
    } = useContext(CtxNewDeposit);

    //const OpenDeposit = async () => {
    //    await apiCreateInvestment(
    //        amount,
    //        term_in_days,
    //        token.code
    //    );
    //}

    return (
        <Modal
            {...props}
            open={open}
            onCancel={onCancel}
            //onOk={() => OpenDeposit()}
        >
            <p className="font-bold text-xl">Your deposit parameters</p>

            <div className="flex flex-col gap-3 md:gap-2 pt-5 pb-8">
                <InlineProperty
                    left="Deposit"
                    right={(type === DepositType.FIXED ?
                        'Fixed rate deposit: 0,8% per month' :
                        `${structedStrategy?.name} strategy 
                            ${percentageType?.risePercentage}/${percentageType?.dropPercentage} ${token?.code}`
                    )}
                />
                <InlineProperty left="Opened" right={format(new Date(), "MM.dd.yyyy 'at' HH:mm")} />
                <InlineProperty left="Deposit amount" right={`${amount} EURG`} />
                {type === DepositType.FIXED && <InlineProperty left="Payments" right='Every 30 days' />}
                {type === DepositType.STRUCTED && <InlineProperty
                    left="Starting rate"
                    right={`1 ${token?.code} ~ ${rate?.toFixed(2)} EURG`} />
                }
                <InlineProperty
                    left="Term"
                    right={`${type === DepositType.FIXED ? 360 : term_in_days} days
                        (until ${getTermEnd(new Date(), type === DepositType.FIXED ? 360 : term_in_days)})`}
                />
            </div>
            <Button
                className={"w-full !text-white rounded-b bg-blue-600 disabled:opacity-50"}
                onClick={onCancel}
            >
                Confirm
            </Button>
        </Modal>
    )
}

export default OpenDepositModal;
