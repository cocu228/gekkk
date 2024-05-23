import {FC} from 'react'
import style from './styles.module.scss'
import { SkeletonInput } from './SkeletonInput'

interface SkeletonProps {}

export const Skeleton:FC<SkeletonProps> = () => {
    return (
        <div className={style.SkeletonCard}>
            <SkeletonInput className='!w-[40%] mb-[5px]' />
            <SkeletonInput className='w-full' />
            <SkeletonInput className='w-full' />
            <SkeletonInput className='!w-[60%]' />
        </div>
    )
}