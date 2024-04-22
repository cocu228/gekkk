import s from './styles.module.scss'

export type CardDesignProps = {
    isSelected: boolean
    title: React.ReactNode
    description: React.ReactNode
    image: React.ReactNode
}

export function CardDesign({title, description, image, isSelected}: CardDesignProps) {
    return (
        <button className={`${s.cardDesignWrap} ${isSelected && s.cardDesignWrapBg} ${isSelected && s.cardDesignWrapBorder}`}>
            <div className={s.cardDesignBody}>
                <div className={s.cardDesignTextGroup}>
                    <span className={s.cardDesignTitle}>{title}</span>
                    <span className={s.cardDesignSubtitle}>{description}</span>
                </div>
                <div className='flex-[0_0_116px]'>
                    {image}
                </div>
            </div>
            <div className={`${s.tickbox} ${isSelected && s.tickboxSelected}`}></div>
        </button>
    )
}
