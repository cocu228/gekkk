const CopyIconGreen = ({value}) => {

    const onClick = () => {
        navigator.clipboard.writeText(value)
    }

    return <>
        <img className='opacity-50 mx-2 hover:cursor-pointer hover:opacity-100'
                         src={`/img/icon/CopyGreen.svg`}
                         alt='copy'
                         onClick={onClick}
        />
    </>
}

export default CopyIconGreen;
