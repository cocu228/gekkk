import InlineProperty from "@/shared/ui/inline-property"
import styles from "./style.module.scss"

const InfoBlock = () => {

    return (
      <p className="leading-6">
        A deposit with a fixed income allows you to earn <span className='font-bold'>0,8% per month</span>. 
        The payments are made <span className='font-bold'>every 30 calendar days</span> to your EURG account. 
        Terms of deposit - <span className='font-bold'>360 days</span>. The minimum amount of the deposit - <span className='font-bold'>1000 EURG</span>.
      </p>
    )
}

export default InfoBlock