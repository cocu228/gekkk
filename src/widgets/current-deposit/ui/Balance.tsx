interface IBalance {
    isGke: boolean;
    balance: number;
    isClosed?: boolean;
}

function Balance({isGke, balance, isClosed}: IBalance) {
    return (
        <div className='column flex gap-5 lg:mb-6 md:items-center md:mb-4'>
            <img
                className='h-[3.2rem] md:h-[2.6rem]'
                src={`/img/icon/${isClosed ? 'DepositIcon.svg' : 'DepositGradientIcon.svg'}`}
                alt="percent"
            />

            <div className='column'>
                <p className='font-medium text-gray-500 mb-2 md:font-bold md:text-sm md:mb-1'>
                    {isClosed ? 'Total balance' : 'Current balance'}
                </p>
                
                <p className='font-bold text-2xl whitespace-nowrap'>{balance} EURG</p>
                {isGke && <p className='text-md text-gray-500 whitespace-nowrap'>
                    Locked tokens: {balance} GKE
                </p>}
            </div>
        </div>
    )
}

export default Balance;
