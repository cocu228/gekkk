import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {useContext, useEffect, useState} from "react";
import OpenDepositModal from "../../modals/OpenDepositModal";
import {DepositType} from "@/shared/config/deposits/types";
import {apiCreateInvestment} from "@/shared/(orval)api/shared";
import {CtxNewDeposit} from "@/widgets/new-deposit/model/context";
import ClosingConditionsModal from "../../modals/ClosingConditionsModal";
import DepositProperties from "../../descriptions/deposit-properties/DepositProperties";
import {InvestmentsTypeEnum} from "@/shared/(orval)api/shared/model";

const OpenDeposit = () => {
    const conditionsModal = useModal();
    const openDepositModal = useModal();
    const [validated, setValidated] = useState<boolean>(false);

    const {
        type,
        step,
        amount,
        minAmount,
        term_in_days,
        tokenCurrency,
        percentageType,
        structedStrategy,
        onNextStep
    } = useContext(CtxNewDeposit);

    useEffect(() => {
        setValidated(+amount >= minAmount);
    }, [amount, minAmount]);

    return (
        <div className='px-10 my-10 md:my-5 xxl:py-3 xxl:px-4'>
            <DepositProperties className="hidden md:-mx-[6px] md:flex md:pt-8 md:mb-4" />

            <div className="wrapper">
                <Button
                    disabled={!validated}
                    className="w-full mb-5 md:mb-3"
                    onClick={step >= 5 || type === DepositType.FIXED ? openDepositModal.showModal : onNextStep}
                >
                    {step >= 5 || type === DepositType.FIXED ? 'Open Deposit' : 'Next step'}
                </Button>
            </div>

            <div className="row mb-20 md:mb-10">
                <p className="text-gray-500 text-center text-xs">
                    The deposit services are provided by Adventarium PTE.LTD. By pressing
                    button "Open deposit" I confirm that I have read carefully and fully
                    accepted{' '}
                    <a
                        className="font-inherit text-blue-300 underline"
                        href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Terms and Conditions with Risk Disclosure here
                    </a>
                </p>
            </div>

            <Button text onClick={conditionsModal.showModal}>
                <span className="underline underline-offset-4 text-gray-400 md:text-sm">
                    Early closing conditions →
                </span>
            </Button>

            <OpenDepositModal
                open={openDepositModal.isModalOpen}
                onCancel={openDepositModal.handleCancel}
                onConfirm={() => {
                    (async () => {
                        const data = await apiCreateInvestment({
                            amount: +amount,
                            term_days: term_in_days,
                            link_currency: type === DepositType.FIXED ? 'EURG' : tokenCurrency,
                            depo_template_type: InvestmentsTypeEnum[type === DepositType.FIXED ? 1 : (
                                structedStrategy.id + structedStrategy.percentageTypes.indexOf(percentageType)
                            )]
                        });
                    })();

                    openDepositModal.handleCancel();
                }}
            />

            <ClosingConditionsModal
                open={conditionsModal.isModalOpen}
                onCancel={conditionsModal.handleCancel}
            />
        </div>
    )
}

export default OpenDeposit;
