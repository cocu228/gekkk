import md5 from 'md5';
import {Input} from 'antd';
import Form from '@/shared/ui/form/Form';
import '@styles/(cs)react-phone-input.scss';
import {useSessionStorage} from "usehooks-ts";
import {memo, useContext, useRef, useState} from 'react';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {storyDisplayAuth} from "@/widgets/auth/model/story";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import useValidation from '@/shared/model/hooks/useValidation';
import {passwordMessage, phoneMessage, pinMessage} from '@/shared/config/message';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from "@/processes/firebaseConfig";
import useError from "@/shared/model/hooks/useError";
import {helperApiCheckPassword, helperApiRequestCode} from "@/widgets/auth/model/helpers";
import {TSessionAuth} from "@/widgets/auth/model/types";
import {apiPasswordCheck} from "@/widgets/auth/api/password-check";
import {apiRequestCode} from "@/widgets/auth/api";
import {useSearchParams} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {$ENV_DEV} from "@/shared/lib/helpers";
import FormCode from '../form-code';
import styles from './form-authorization.module.scss';
import CloseWindow from '@/assets/close-window.svg?react';
import SearchInInput from '@/assets/search-in-input.svg?react';

import { PhoneInput, FlagImage, DialCodePreview, CountrySelectorDropdown, defaultCountries } from 'react-international-phone';
import 'react-international-phone/style.css';
import './form-authorization.scss';

import Modal from '@/shared/ui/modal/Modal';
import useModal from '@/shared/model/hooks/useModal';


const FormLoginAccount = memo(() => {
    const {t} = useTranslation(); 
    const inputRef = useRef(null);
    const [params] = useSearchParams();
    const {md} = useContext(BreakpointsContext);
    const authMethod = params.get("authMethod");
    const {toggleStage, stage} = storyDisplayAuth(state => state);
    const [loading, setLoading] = useState<boolean>(false);
    const {phoneValidator, passwordValidator} = useValidation();

    const [
        localErrorHunter,
        localErrorSpan, ,
        localErrorClear
    ] = useError();

    const [, setSessionAuth] = useSessionStorage<TSessionAuth>("session-auth", {
        phone: "",
        sessionIdUAS: "",
        verificationId: ""
    });

    const [state, setState] = useState<{
        phone: string,
        password: string
    }>({
        phone: "",
        password: ""
    });

    const onFinish = () => {
        setLoading(true);
        const {password} = state;
        const phone = formatAsNumber(state.phone);

        apiPasswordCheck(phone, md5(`${password}_${phone}`))
            .then(res => helperApiCheckPassword(res)
                .success(() => {
                    onSingIn();
                }))
            .catch(err => {
                localErrorHunter(err);
                setLoading(false);
            });
    }

    const onSingInUAS = async () => {
        const {password} = state;
        const phone = formatAsNumber(state.phone);

        const response = await apiRequestCode(formatAsNumber(state.phone));

        helperApiRequestCode(response).success(() => {
            setSessionAuth(prev => ({
                ...prev,
                phone: state.phone,
                sessionIdUAS: response.data.sessid
            }));

            toggleStage("code", md5(`${password}_${phone}`));
        });
    }
    
    const onCaptchaVerify = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: (response: unknown) => {}
        });

        onSingIn();
    }
    
    const onSingIn = () => {
        localErrorClear();
        setLoading(true);

        if (!window.recaptchaVerifier) {
            onCaptchaVerify();
        } else {
            const {password} = state;
            const phone = formatAsNumber(state.phone);

            signInWithPhoneNumber(auth, "+" + formatAsNumber(state.phone), window.recaptchaVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;

                    setSessionAuth(prev => ({
                        ...prev,
                        phone: state.phone,
                        verificationId: confirmationResult.verificationId
                    }));

                    setLoading(false);
                    toggleStage("code", md5(`${password}_${phone}`));
                }).catch((error) => {
                setLoading(false);

                if (error.code === "auth/invalid-phone-number") {
                    localErrorHunter({code: 0, message: "Invalid phone number"})
                } else if (error.code === "auth/too-many-requests") {
                    onSingInUAS();
                    // localErrorHunter({code: 1, message: "You're seeing this error because of sending too many auth requests from or using one IP address for a given period of time"})
                } else if (!!error.code) {
                    localErrorHunter({code: 10, message: error.code.message})
                }
                // else if (error.code === "auth/quota-exceeded") {
                    // onSingInUAS()
                    // localErrorHunter({code: 1, message: "Exceeded quota for updating account information."})
                // }
                // else if (error.code === "auth/invalid-verification-code") {
                //     localErrorHunter({code: 2, message: "Invalid verification code"})
                // }
            });
        }
    }
    const [iso2, setIso2] = useState('');
    const [dialCode, setDialCode] = useState('');
    const [searchInputValue, setSearchInputValue] = useState('');
    const tooltipModal = useModal(); 
    const [currentCountriesData, setCountriesData] = useState(defaultCountries);
    const [currentCountry, seCurrentCountry] = useState(defaultCountries[0]);

    const [phoneInputValue, setPhoneInputValue] = useState('');

    const gekkardUrl = import.meta.env[`VITE_GEKKARD_URL_${import.meta.env.MODE}`];

    return <div>
            <Modal className='login-modal'
                open={tooltipModal.isModalOpen}
                onCancel={tooltipModal.handleCancel}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '30px',
                    }}>
                        <div className='typography-h3' style={{ color: 'var(--new-pale-blue)'}}>
                            Country code
                        </div>

                        <button type='button' onClick={tooltipModal.handleCancel}>
                            <CloseWindow />
                        </button>

                    </div>

                    <div>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '10px',
                            background: 'var(--new-pale-grey)',
                            padding: '3px 12px',
                            marginBottom: '30px',
                        }}>

                            <input 
                                className={`${styles.searchInput} typography-b2-bold`}
                                placeholder="Search"
                                type='text'
                                value={searchInputValue}
                                onChange={(e) => {
                                    const t = defaultCountries.filter(item => {
                                        return item[0].toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase());
                                    });

                                    setCountriesData(
                                        t
                                    );
                                    seCurrentCountry(t[0]);
                                    setSearchInputValue(e.target.value);
                           
                                }}
                            />

                            <SearchInInput style={{ flex: '0 0 auto'}} />
                        </div>

                        {currentCountriesData.length ? <CountrySelectorDropdown
                        countries={currentCountriesData}
                        className={styles.countrySelectorDropdown}
                        show
                        onSelect={(parsedCountry) => {

                            const nextCountry = currentCountriesData.find(item => {
                                return item[1] === parsedCountry.iso2;
                            }) || currentCountriesData[0];

                            seCurrentCountry(nextCountry);
                            setPhoneInputValue(nextCountry[2]);
                            tooltipModal.handleCancel();

                        }}
                        selectedCountry={currentCountry[1]} /> : null}
                    </div>
                </Modal>
        <p className="typography-b2" style={{
            color: 'var(--new-pale-blue)',
            marginBottom: '36px',

        }}>
            Log in using the form below
        </p>
        <div style={{
            background: 'var(--new-FFFFFF)',
            padding: '24px 36px 24px 36px',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 'var(--new-active-account-shadow)'
        }}>

        <Form autoComplete={"on"} onFinish={authMethod === 'UAS' ? onSingInUAS : onFinish}>
            <FormItem className="mb-2" label="Phone" id={"phoneNumber"} preserve
                    rules={[{required: true, ...phoneMessage}, phoneValidator]}>
                        {/* <div style={{
                            display: 'flex',
                            gap: '26px',
                            color: 'var(--new-dark-blue'
                        }}>

                            
                            <label className='typography-b3'>
                                Phone number
                            </label>
                        </div> */}

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--new-dark-grey)',
                    gap: '12px',
                    paddingBottom: '10px',
                    overflow: 'auto'
                }}>
                    <div style={{flex: '0 0 auto'}}>
                        <div className='typography-b3' style={{ color: 'var(--new-dark-blue)'}}>
                            Country code
                        </div>
                        <div style={{height: '36px', display: 'flex', alignItems: 'center'}}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '3px 12px 3px 12px',
                                borderRadius: '10px',
                                background: 'var(--new-light-blue)',
                                color: 'var(--new-pale-blue)',
                                cursor: 'pointer',

                            }}
                            onClick={() => {
                                if (tooltipModal.isModalOpen) {
                                    return;
                                }

                                tooltipModal.showModal();
                            }}>
                                {iso2 ?<FlagImage iso2={iso2 === 'kz' ? 'ru': iso2} size="14px" />: null }
                                {dialCode ?<DialCodePreview  className='cs-react-international-phone-dial-code-preview' dialCode={dialCode} prefix="+" />: null }
                            </div>
                   
                        </div>
                    </div>
                    <div style={{flex: '0 0 auto'}}>
                        <div className='typography-b3' style={{ color: 'var(--new-dark-blue)'}}>
                            Phone number
                        </div>

                        <PhoneInput
                            ref={(e) => {
                                if (!e) {
                                    return;
                                }

                                e.setAttribute('data-testid', 'PhoneInput');
                                inputRef.current = e;
                            }}
                            name='phone'
                            value={phoneInputValue}
                            disabled={loading}
                            placeholder={t("auth.enter_phone_number")}
                            onChange={(value: string, meta) => {
                                setPhoneInputValue(value);
                                setIso2(meta.country.iso2);
                                setDialCode(meta.country.dialCode);
                                setState(prevState => {
                                    return {...prevState, phone: value.slice(1)};
                                });
                            }}
                        />
                    </div>
                        
                
                </div>
                        
            </FormItem>
            <span className="text-fs12 text-red-800">{localErrorSpan}</span>

            <FormItem name="password" label="Password"
                    rules={[{required: true, ...passwordMessage}, passwordValidator]}>
                <div>
                    <div className='typography-b3' style={{ color: 'var(--new-dark-blue)'}}>
                        Password
                    </div>
                    <Input.Password className={styles.input}
                        disabled={loading}
                        onChange={({target}) => setState(prev => ({
                            ...prev,
                            password: target.value
                        }))}
                        data-testid="PIN"
                        placeholder="Password"
                        />
                </div>
            </FormItem>

            <div className="row text-right mb-4">
                {/*<a onClick={() => toggleStage("qr-code")} className="text-sm font-semibold text-blue-400">Forgot*/}
                {/*    your PIN? Log in with a QR code*/}
                {/*</a>*/}
            </div>


            {stage !== 'code' ?
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <button className='account-button' disabled={loading || state.phone.length < 11 || !/^\d{6}$/.test(state.password)} /// <- надо переделать потом
                                tabIndex={0}
                                data-testid="Login">{t("login")}
                        </button>

                        <button type='button' className='text-button' onClick={() => {
                            toggleStage('forgot-password');
                        }}>
                            Forgot password
                        </button>
                    </div> : null 
            }
            </Form>

            {
            stage === 'code' ?
                <FormCode/>:
                null
            }

        
        </div>
    </div>
})

export default FormLoginAccount
