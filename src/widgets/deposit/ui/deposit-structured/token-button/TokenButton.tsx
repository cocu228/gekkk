import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';
import styles from './styles.module.scss';
import {IResMarketAsset} from '@/shared/api';
import { IconCoin } from '@/shared/ui/icons/icon-coin';

interface IParams {
  onClick: () => void;
  token: IResMarketAsset;
}

const TokenButton = ({onClick, token}: IParams) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.TokenButton} h-[60px] rounded-sm w-full px-5 py-3 flex items-center justify-between`}
    >
      {!token ? (
        <div className='text-gray-400 text-base md:text-sm'>
          Choose token...
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <IconCoin width={34} height={34} code={token.code}/>
          <p className="font-medium text-sm">{token.name} ({token.code})</p>
        </div>
      )}

      <IconDoubleArrows />
    </button>
  );
};

export default TokenButton;
