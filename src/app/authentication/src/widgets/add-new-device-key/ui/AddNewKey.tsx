import { useState } from 'react';
import Button from '../../components/button/Button';
import { IconApp } from '../../components/IconApp';
import useNewKeyForm from '../../gekwallet-auth/hooks/useNewKeyForm';
import styles from './style.module.css';

export const AddNewKey = () => {
    const {closeForm} = useNewKeyForm()
    const [email, setEmail] = useState('')
    const [emailCode, setEmailCode] = useState('')
    const [number, setNumber] = useState('')
    const [numberCode, setNumberCode] = useState('')

    return (
        <div className={styles.AddNewKey}>
            <div className={styles.Title}>
                <div onClick={closeForm}>
                    <IconApp code='w7' size={20} />
                </div>
                Add new device key
            </div>
            <div className={styles.Email}>
                <div className={styles.EmailAddress}>
                    <div className={styles.EmailTitle}>
                        1. Email:
                    </div>
                    <div className={styles.EmailAddressInput}>
                        <input
                            onChange={(e)=>{
                                const target = e.target as HTMLInputElement
                                setEmail(target.value)
                            }}
                            value={email}
                            className={styles.AddressInput} 
                            type="email"
                            placeholder="-enter email address-" 
                        />
                        <div className={styles.Icon}>
                            <IconApp code='t47' color={email ? 'var(--gek-grenn)' : 'var(--gek-mid-grey)'} size={15} />
                        </div>
                    </div>
                </div>
                <div className={styles.EmailCode}> 
                    <input
                        onChange={(e)=>{
                            const target = e.target as HTMLInputElement
                            setEmailCode(target.value)
                        }}
                        value={emailCode}
                        className={styles.EmailCodeInput} 
                        type="text"
                        placeholder="-enter email code-" 
                    />
                    <div className={styles.Icon}>
                        <IconApp code='t47' color={emailCode ? 'var(--gek-grenn)' : 'var(--gek-mid-grey)'} size={15} />
                    </div>
                </div>
            </div>
            <div className={styles.Phone}>
                <div className={styles.PhoneNumber}>
                    <div className={styles.NumberTitle}>
                        2. Phone:
                    </div>
                    <div className={styles.PhoneNumberInput}>
                        <input
                            onChange={(e)=>{
                                const target = e.target as HTMLInputElement
                                setNumber(target.value)
                            }}
                            value={number}
                            className={styles.NumberInput} 
                            type="tel"
                            placeholder="-enter phone number-" 
                        />
                        <div className={styles.Icon}>
                            <IconApp code='t47' color={number ? 'var(--gek-grenn)' : 'var(--gek-mid-grey)'} size={15} />
                        </div>
                    </div>
                </div>
                <div className={styles.PhoneCode}> 
                    <input
                        onChange={(e)=>{
                            const target = e.target as HTMLInputElement
                            setNumberCode(target.value)
                        }}
                        value={numberCode}
                        className={styles.PhoneCodeInput} 
                        type="text"
                        placeholder="-enter confirm code-" 
                    />
                    <div className={styles.Icon}>
                        <IconApp code='t47' color={numberCode ? 'var(--gek-grenn)' : 'var(--gek-mid-grey)'} size={15} />
                    </div>
                </div>
            </div>
            <li className={styles.Problems}>
                If you have problems receiving an SMS code, you can link your telegram account using a <a className={styles.Link} href="https://t.me/gekwalletbot">@gekwalletbot</a>
            </li>
            <div className={styles.Buttons}>
                <Button
                    className={`${styles.Button}`}
                >
                    Send code
                </Button>
                <Button
                    className={`${styles.Button} ${styles.Disabled}`}
                    disabled
                >
                    Create key
                </Button>
            </div>
        </div>
    );
};
