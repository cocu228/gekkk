import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import InfoBox from "@/widgets/info-box";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import {useEffect, useState} from "react";
import {apiHistoryTransactions, apiTransactionInfo, IResHistoryTransactions} from "@/shared/api";
import {formatForCustomer, formatForDisplay} from "@/shared/lib/date-helper";
import {subYears} from "date-fns";
import Loader from "@/shared/ui/loader";
import {asteriskText} from "@/shared/lib/helpers";

const UnknownTransactions = () => {
    const [list, setList] = useState([])
    const {showModal, isModalOpen, handleCancel} = useModal()

    useEffect(() => {
        (async () => {

            const response = await apiHistoryTransactions(formatForDisplay(subYears(new Date(), 1)), undefined, undefined, 3)

            if (Array.isArray(response.data.result)) {
                setList(response.data.result)

            }
        })()
    }, [])

    return <>
        {list.length > 0 && <InfoBox>
            <p className="font-medium text-orange">You have unknown incoming transaction. Please enter the sender's
                name <a className="underline text-blue-400" onClick={showModal} href="javascript:void(0)">here</a></p>
            <Modal title={"Unknown transactions"} open={isModalOpen} onCancel={handleCancel}>
                {list.map((it, i) => <Row key={"UnknownTransactionsRow-" + i} {...it}/>)}
            </Modal>
        </InfoBox>}
    </>
}

const Row = (props: IResHistoryTransactions) => {
    const [received, setReceived] = useState(null)


    useEffect(() => {
        (async () => {
            const response = await apiTransactionInfo(props.id_transaction)
            if (response.data.result) {
                setReceived(response.data.result.addressFrom)
            }
        })()
    }, [])
    return <div className="row min-h-[120px] relative font-medium mb-14">
        {!received ? <Loader/> : <div className="col">
            <div className="row mb-2 flex justify-between">
                <div className="col cursor-pointer">
                    <img width={12} height={12} src="/img/icon/Download.svg" alt="Download"/>
                </div>
                <div className="col">
                    <span>{formatForCustomer(props.datetime)}</span>
                </div>
                <div className="col">
                    <span className="text-green">{props.amount} {props.currency}</span>
                </div>
            </div>
            <div className="row mb-2 flex gap-3">
                <div className="col">
    <span className="whitespace-nowrap">
        Received from:
    </span>
                </div>
                <div className="col">
                    <span className="break-all">{asteriskText(received)}</span>
                </div>
            </div>
            <div className="row mb-2 flex">
                <div className="col">
                    <span>Sender name:</span>
                </div>
            </div>
            <div className="row flex gap-3">
                <div className="col w-3/5"><Input/></div>
                <div className="col w-2/5"><Button size={"xl"} className="w-full">Apply</Button></div>
            </div>
        </div>}
    </div>
}

export default UnknownTransactions