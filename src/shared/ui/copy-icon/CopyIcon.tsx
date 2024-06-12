import useCopyStore from "@/shared/store/useCopy/useCopyStore";
import { IconApp } from "../icons/icon-app";

const CopyIcon = ({value}) => {
    const {setIsCopied} = useCopyStore()

    const onClick = () => {
        navigator.clipboard.writeText(value)
        setIsCopied(true)
    }

    return <>
        <IconApp
            onClick={onClick}
            code="t31" 
            color="#2BAB72" 
            className='opacity-50 mx-2 hover:cursor-pointer md:active:opacity-100 -md:hover:opacity-100' 
            size={15} 
        />
    </>
}

export default CopyIcon;
