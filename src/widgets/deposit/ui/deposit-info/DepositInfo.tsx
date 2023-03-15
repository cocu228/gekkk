import styles from "./styles.module.scss"

const DepositInfo = () => {

    return (
        <div className={`${styles.InfoDeposit} col-span-2 bg-white p-7`}>
            <p className='mt-10 mb-20'>
                A deposit with a fixed income allows you to earn <span className='font-bold'>0,8% per month</span>. 
                The payments are made <span className='font-bold'>every 30 calendar days</span> to your EURG account. 
                Terms of deposit - <span className='font-bold'>360 days</span>. The minimum amount of the deposit - <span className='font-bold'>1000 EURG</span>.
            </p>

            <div className={styles.InvestBlock}>
                <p className='text-lg font-bold mb-5'>You invest 1000.00 EURG for 360 days</p>

                <div className='flex justify-between items-end mb-3 gap-1'>
                    <p className="text-gekGray whitespace-nowrap">Risk level</p>
                    <div className={styles.InvestLine}/>
                    <p className="whitespace-nowrap">Fixed rate deposit</p>
                </div>

                <div className='flex justify-between items-end mb-4 gap-1'>
                    <p className="text-gekGray whitespace-nowrap">Returns rate</p>
                    <div className={styles.InvestLine}/>
                    <p className="whitespace-nowrap">0,8% per month</p>
                </div>
            </div>
        </div>
    )
}

export default DepositInfo