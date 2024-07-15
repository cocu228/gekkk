import styles from "./style.module.scss";

interface IPropsInlineProperty {
  left: string | JSX.Element;
  right: string | JSX.Element;
}

const InlineProperty = ({ left, right }: IPropsInlineProperty) => (
  <div className='row flex justify-between items-end gap-2 overflow-hidden'>
    <p className='font-medium text-[#285E69] whitespace-nowrap text-sm xxl:text-xs'>{left}</p>
    <div className={styles.InlineProperty} />
    <p className='text-[#285E69] font-semibold whitespace-nowrap text-sm xxl:text-xs'>{right}</p>
  </div>
);

export default InlineProperty;
