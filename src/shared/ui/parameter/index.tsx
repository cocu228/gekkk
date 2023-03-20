import styles from "./styles.module.scss"

interface IParameter {
    left: String,
    right: String
}

const Parameter = ({left, right}: IParameter) => {

    return (
        <div className='flex justify-between items-end mb-4 gap-1'>
            <p className="font-medium text-gray whitespace-nowrap">{left}</p>
            <div className={styles.ParameterLine}/>
            <p className="font-medium whitespace-nowrap">{right}</p>
        </div>
    )
}


export default Parameter