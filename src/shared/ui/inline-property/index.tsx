import styles from "./styles.module.scss"

interface IPropsInlineProperty {
    left: String,
    right: String
}

const InlineProperty = ({left, right}: IPropsInlineProperty) => {

    return (
        <div className='row flex justify-between items-end mb-4 gap-2 md:mb-2'>
            <p className="font-medium text-gray whitespace-nowrap lg:text-sm">{left}</p>
            <div className={styles.InlineProperty}/>
            <p className="font-medium whitespace-nowrap lg:text-sm">{right}</p>
        </div>
    )
}

export default InlineProperty