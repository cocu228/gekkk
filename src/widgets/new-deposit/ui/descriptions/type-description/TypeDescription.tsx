import {useContext} from 'react';
import {CtxNewDeposit} from '../../../model/context';
import {getTypeDescriptions} from "@/widgets/new-deposit/model/helpers";

const TypeDescription = () => {
    const {type, isGkeDeposit} = useContext(CtxNewDeposit);
    const descriptions = getTypeDescriptions(isGkeDeposit);

    return (
        <div className="col px-7 mt-[72px] xl:hidden xxl:p-5">
            {descriptions[type]}
        </div>
    )
}

export default TypeDescription;
