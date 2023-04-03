import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';
import styles from './styles.module.scss';

const TokenButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.TokenButton} rounded-sm w-full px-5 py-3 flex items-center justify-between`}
    >
      <div className="flex gap-4 items-center">
        <img width={34} height={34} src="/img/tokens/XmrIcon.svg" alt="btc" />
        <p className="font-medium text-sm">Monero (XMR)</p>
      </div>

      <IconDoubleArrows />
    </button>
  );
};

export default TokenButton;
