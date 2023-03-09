import styles from './style.module.scss';

type TooltipParams = {
    children?: JSX.Element | never[],
    text: String
}

const Tooltip = ({children, text}: TooltipParams) => {
    return (
        <div className={`relative inline-block`}>
            <div className={`${styles.Child}`}>
                {children}
            </div>
            <div className={`${styles.TooltipContent} absolute mt-1 z-10 invisible w-[300px] bg-white text-gekLightGray text-left p-[10px] border-r-[4px] shadow-md whitespace-pre-line text-sm`}>
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
