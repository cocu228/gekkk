import styles from './styles.module.scss';

const ChooseButton = ({ children }) => {
  return (
    <button className={`${styles.ChooseButton} text-xl font-medium rounded-sm w-full px-5 py-3 flex wrap items-center justify-between md:text-base`}>
      {children}
    </button>
  );
};

export default ChooseButton;
