import { useContext } from "react";
// import { IResMarketAsset } from "@/shared/api";
import useModal from "@/shared/model/hooks/useModal";
import ChooseTokenModal from "../../modals/ChooseTokenModal";
import { CtxNewDeposit } from "@/widgets/new-deposit/model/context";
import TokenButton from "../../buttons/token-button/TokenButton";

const TokenChoose = () => {
    const { tokenCurrency, onTokenChange } = useContext(CtxNewDeposit);
    const chooseTokenModal = useModal();

    return (
        <div className="px-10 md:my-3 xxl:px-3">
            <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
                Choose a token to invest
            </p>

            <TokenButton tokenCurrency={tokenCurrency} onClick={chooseTokenModal.showModal} />

            <ChooseTokenModal
                open={chooseTokenModal.isModalOpen}
                onSelect={(value: string) => {
                    onTokenChange(value);
                    chooseTokenModal.handleCancel();
                }}
                onCancel={chooseTokenModal.handleCancel}
            />
        </div>
    )
}

export default TokenChoose;
