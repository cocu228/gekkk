import Button from "@/shared/ui/button/Button";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import {useState } from "react";
import styles from './style.module.scss';

const CashbackCard = ({ subtitle, className, description, iconPath, conditions }: {
  iconPath: string;
  subtitle: string;
  className: string;
  description: string;
  conditions: Array<string>;
}) => {

  const [isChecked, setChecked] = useState(false);


  return (
    <div className='flex mb-10 justify-center'>
      <div className={`
                    ${className}
                    ${styles.CashbackCard}
                `}
      >
        <div className='flex'>
          <div className={styles.CashbackCardTitle}>
            {description}
          </div>

          <img
            className={styles.CashbackCardImage}
            src={iconPath}
          />
        </div>

        <div className={styles.CashbackCardSubtitle}>
          {subtitle}
        </div>

        <div className='mt-[23px]'>
          <Checkbox
            className='bg-white'
            onChange={() => setChecked(!isChecked)}
          >
            <span className={styles.CashbackCardCheckbox}>
              Bonus payments are a part of a loyalty program, provided by FINTECH ASSETS OÜ.
              Terms and Conditions can be found here
            </span>
          </Checkbox>
        </div>

        <div className='flex justify-center mt-3 -mb-[70px]'>
          <Button disabled={!isChecked}>Activate</Button>
        </div>
      </div>

      <div className={styles.CashbackDescription}>
        <div className={styles.CashbackDescriptionTitle}>
          Conditions
        </div>

        <ul className={`list-disc ${styles.CashbackDescriptionList}`}>
          {conditions.map(c => (
            <li>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default CashbackCard