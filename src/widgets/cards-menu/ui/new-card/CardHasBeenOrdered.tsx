import Success from '@/assets/success.svg?react'
import Button from '@/shared/ui/button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useNewCardContext} from "@/widgets/cards-menu/ui/new-card/newCardContext";
import s from './styles.module.scss'

export function CardHasBeenOrdered() {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(10000);
    const {setStep} = useNewCardContext();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1000);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (seconds > 0) {
            return;
        }
        
        setStep('IssueNewCard');
    }, [seconds]);

    const secondsToShow = seconds >= 10000 ? '10' : `0${seconds / 1000}`;
    const {t} = useTranslation();

    return <>
        <div className={s.orderWrap}>
            <p className={s.orderText}>{t("card_has_been_ordered")}</p>

            <Success />

            <Button gray onClick={() => {
               navigate('/'); 
            }}>{t("back_to_main_page")}</Button>

            <p className={s.orderText}>
                {t("you_will_be_automatically_redirected_to_the_main_page_in")} <span className={s.timeSpan}>00:{secondsToShow}</span>
            </p>
        </div>
    </>
}