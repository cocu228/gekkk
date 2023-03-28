import styles from './styles.module.scss';

const ChooseButton = ({ children }) => {
  return (
    <button className={`${styles.ChooseButton} text-xl font-medium`}>
      {children}
    </button>
  );
};

export default ChooseButton;
