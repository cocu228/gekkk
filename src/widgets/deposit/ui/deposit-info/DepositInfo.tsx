import InlineProperty from "@/shared/ui/inline-property"
import styles from "./style.module.scss"

const DepositInfo = () => {

    return (
        <div className={`wrapper ${styles.InfoDeposit} col-span-2 bg-white p-7`}>
            <p className='mt-10 mb-20'>
                A deposit with a fixed income allows you to earn <span className='font-bold'>0,8% per month</span>. 
                The payments are made <span className='font-bold'>every 30 calendar days</span> to your EURG account. 
                Terms of deposit - <span className='font-bold'>360 days</span>. The minimum amount of the deposit - <span className='font-bold'>1000 EURG</span>.
            </p>

            <div className={`wrapper ${styles.InvestBlock}`}>
                <p className='text-lg font-bold mb-5'>You invest 1000.00 EURG for 360 days</p>
                <InlineProperty left="Risk level" right="Fixed rate deposit"/>
                <InlineProperty left="Returns rate" right="0,8% per month"/>
            </div>
        </div>
    )
}

export default DepositInfo