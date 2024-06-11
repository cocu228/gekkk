import style from './styles.module.scss'
import {Dispatch, FC, SetStateAction, forwardRef, useState} from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { IconApp } from '../icons/icon-app';

interface DatepickerProps {
    setDate: Dispatch<SetStateAction<Date>>
    isTo: boolean,
    date: Date,
    border?: boolean;
}

export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

export const Datepicker:FC<DatepickerProps> = ({setDate, isTo, date, border}) => {

    return (
        <div className={`relative min-w-[145px] max-w-[145px] ${isTo ? 'datepicker-to' : 'datepicker-from'}`}>
            <DatePicker
                className={`datepicker-to ${border && 'datepickerBorder'}`}
                todayButton='Today'
                dateFormat="yyyy-MM-dd"        
                selected={date}
                onChange={(date) => {
                    // setStartDate(date)
                    setDate(date)
                }}
                // customInput={<ExampleCustomInput value={startDate.getFullYear()} onClick={null} />}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    increaseYear,
                    decreaseYear,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => {

                    return (
                        <div
                            className={style.DatepickerHeader}
                        >   
                        <div className={style.DatepickerArrowWrap}>
                            <div className={style.DatepickerArrowBlock} onClick={(e) => {
                                e.preventDefault()
                                decreaseYear()
                            }} >
                                <IconApp code='t08' size={10} color='#95a5a6' className='rotate-[180deg]' />
                                <IconApp code='t08' size={10} color='#95a5a6' className='rotate-[180deg] relative left-[-5px]' />
                            </div>
                            <button disabled={prevMonthButtonDisabled} onClick={e => {
                                e.preventDefault()
                                decreaseMonth()
                            }} >
                                <IconApp code='t08' size={10} color='#95a5a6' className='rotate-[180deg]' />
                            </button>
                        </div>
                        <span className={style.HeaderDatewrap}>
                            <span className={style.HeaderDateTitle}>{date.getFullYear()}</span>
                            <span className={style.HeaderDateTitle}>{months[date.getMonth()]}</span>
                        </span>
                        <div className={style.DatepickerArrowWrap}>
                            <button disabled={nextMonthButtonDisabled} onClick={e => {
                                e.preventDefault()
                                increaseMonth()
                            }} >
                                <IconApp  code='t08' size={10} color='#95a5a6' className='' />
                            </button>
                            <div className={style.DatepickerArrowBlock} onClick={(e) => {
                                e.preventDefault()
                                increaseYear()
                            }} >
                                <IconApp code='t08' size={10} color='#95a5a6' className='relative right-[-5px]' />
                                <IconApp code='t08' size={10} color='#95a5a6' className='' />
                            </div>
                        </div>
                    </div>
                    )
                }}
            />
            <IconApp className={style.DatepickerIcon} code='t39' color='#285E69' size={19} />
        </div>
    )
}