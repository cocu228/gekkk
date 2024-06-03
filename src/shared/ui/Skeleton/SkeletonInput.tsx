import {FC} from 'react'
import style from './styles.module.scss'

interface SkeletonInputProps {
    className?: string
}

export const SkeletonInput:FC<SkeletonInputProps> = ({className}) => {
    return ( 
        <div className={`${style.inp} ${className}`}>
            <span className={`${style.inpBg}`}></span>
        </div>
    )
}