import styles from './styles.module.scss';

interface IParams {
  children: React.ReactNode,
  onClick?: () => void,
  isSelected?: boolean,
}

const ChooseButton = ({ children, isSelected, onClick }: IParams) => {
  return (
    <button onClick={onClick} className={`${styles.ChooseButton} ${isSelected ? styles.Active : ''} text-xl font-medium rounded-sm w-full px-5 py-3 flex wrap items-center justify-between xl:text-base`}>
      {children}
    </button>
  );
};

export default ChooseButton;
