import InlineProperty from "@/shared/ui/inline-property"
import styles from "./styles.module.scss"

const StructuredProperties = () => {

    return (
        <div className="wrapper w-full">
            <div className={`wrapper ${styles.InvestBlock} mb-3 w-full`}>
                <p className='text-lg font-bold mb-5'>You invest 100.00 EURG in Monero (XMR) for 90 days</p>
                <div className="flex flex-col gap-3 md:gap-2">
                    <InlineProperty left="Current rate" right="1 XMR ~ 141.68 EUR"/>
                    <InlineProperty left="Risk level" right="Safe strategy"/>
                    <InlineProperty left="Returns rate" right="16% rates growth XMR"/>
                </div>
                <p className="text-gray-400 text-xs text-end">(The biggest is chosen)</p>
            </div>

            <p className="text-gray-400 text-sm">We use the crypto broker AtlantEX exchange rates to open and close structured deposits.</p>
        </div>
    )
}

export default StructuredProperties