import {useContext} from "react";
import {CtxRootData} from "@/processes/RootContext";
import RefreshButton from "@/shared/ui/refresh-button";

const UpdateAmounts = () => {
    const {setRefresh} = useContext(CtxRootData);

    return <div data-text={"Update"} className="ellipsis">
        <RefreshButton calloutFunc={setRefresh}/>
    </div>
}

export default UpdateAmounts;
