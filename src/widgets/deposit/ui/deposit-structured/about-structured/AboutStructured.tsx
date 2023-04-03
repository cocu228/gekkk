import InlineProperty from "@/shared/ui/inline-property"
import styles from "./styles.module.scss"

const AboutStructured = () => {

    return (
        <>
            <div className='wrapper mb-40'>
                <p>
                    With a stuctured deposit, you can invest in cryptocurrencies and have full or partial capital protection from potential losses. You choose the term. You choose the level of risk and return.
                </p>
            </div>

            <div className="wrapper mb-32">
                <p>
                    <span className='font-bold'>Safe strategy</span> - full capital protection and guaranteed return; good for conservative investors and beginners as it excludes any risks associated with a fall of cryptocurrency rate.
                </p>
            </div>

            <div className="wrapper mb-32">
                <div className="row flex gap-3 mb-1">
                    <img width={17} height={10} src="/img/icon/RateGrowthIcon.svg" alt="UserIcon"/>
                    <p>Get <span className="font-bold">16%</span> of the rate growth if the crypto rises in price</p>
                </div>
                <div className="row flex gap-3">
                    <img width={17} height={10} src="/img/icon/RateDropIcon.svg" alt="UserIcon"/>
                    <p>Get <span className='font-bold'>4% p.a.</span> if the crypto drops in price</p>
                </div>
            </div>

            <div className="wrapper mb-16">
                <p>You will get return in <span className="font-bold">90 days</span></p>
            </div>

            <div className="wrapper">
                <div className={`wrapper ${styles.InvestBlock} mb-3`}>
                    <p className='text-lg font-bold mb-5'>You invest 100.00 EURG in Monero (XMR) for 90 days</p>
                    <InlineProperty left="Current rate" right="1 XMR ~ 141.68 EUR"/>
                    <InlineProperty left="Risk level" right="Safe strategy"/>
                    <InlineProperty left="Returns rate" right="16% rates growth XMR or 4% per annum"/>
                    <p className="text-gray text-xs text-end">(The biggest is chosen)</p>
                </div>

                <p className="text-gray text-sm">We use the crypto broker AtlantEX exchange rates to open and close structured deposits.</p>
            </div>
        </>
    )
}

export default AboutStructured