import styles from "./styles.module.scss"

interface IPropsInlineProperty {
    left: String,
    right: String
}

const InlineProperty = ({left, right}: IPropsInlineProperty) => {

    return (
        <div className='flex justify-between items-end mb-4 gap-1'>
            <p className="font-medium text-gray whitespace-nowrap">{left}</p>
            <div className={styles.InlineProperty}/>
            <p className="font-medium whitespace-nowrap">{right}</p>
        </div>
    )
}

export default InlineProperty