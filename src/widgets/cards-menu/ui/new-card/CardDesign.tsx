import styles from './styles.module.scss'

export type CardDesignProps = {
    isSelected: boolean
    title: React.ReactNode
    description: React.ReactNode
    image: React.ReactNode
}

export function CardDesign({title, description, image, isSelected}: CardDesignProps) {
    return (
        <button className={`${styles.cardDesignWrap} ${isSelected && styles.cardDesignWrapBg} ${isSelected && styles.cardDesignWrapBorder}`}>
            <div className={styles.cardDesignBody}>
                <div className={styles.cardDesignTextGroup}>
                    <span className={styles.cardDesignTitle}>{title}</span>
                    <span className={styles.cardDesignSubtitle}>{description}</span>
                </div>
                <div className='flex-[0_0_116px]'>
                    {image}
                </div>
            </div>
            <div className={`${styles.tickbox} ${isSelected && styles.tickboxSelected}`}></div>
        </button>
    )
}
