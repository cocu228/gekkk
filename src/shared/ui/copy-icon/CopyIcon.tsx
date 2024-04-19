import { IconApp } from "../icons/icon-app";

const CopyIcon = ({value}) => {

    const onClick = () => {
        navigator.clipboard.writeText(value)
    }

    return <>
        <IconApp
            onClick={onClick}
            code="t31" 
            color="#636e72" 
            className='opacity-50 mx-2 hover:cursor-pointer hover:opacity-100' 
            size={17} 
        />
    </>
}

export default CopyIcon;
