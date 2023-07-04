import styles from "./style.module.scss"

interface IPropsInlineProperty {
    left: string | JSX.Element;
    right: string | JSX.Element;
}

const InlineProperty = ({left, right}: IPropsInlineProperty) => {

    return (
        <div className='row flex justify-between items-end gap-2 overflow-hidden'>
            <p className="font-medium text-gray-400 whitespace-nowrap text-sm xxl:text-xs">{left}</p>
            <div className={styles.InlineProperty}/>
            <p className="font-medium whitespace-nowrap text-sm xxl:text-xs">{right}</p>
        </div>
    );
}

export default InlineProperty;
