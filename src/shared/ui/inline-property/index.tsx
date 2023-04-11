import styles from "./style.module.scss"

interface IPropsInlineProperty {
    left: String,
    right: String
}

const InlineProperty = ({left, right}: IPropsInlineProperty) => {

    return (
        <div className='row flex justify-between items-end gap-2'>
            <p className="font-medium text-gray-400 whitespace-nowrap text-sm">{left}</p>
            <div className={styles.InlineProperty}/>
            <p className="font-medium whitespace-nowrap text-sm">{right}</p>
        </div>
    )
}

export default InlineProperty