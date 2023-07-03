import { CtxRootData } from '@/app/RootContext';
import styles from './styles.module.scss';
import { IResMarketAsset } from '@/shared/api';
import { IconCoin } from '@/shared/ui/icons/icon-coin';
import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';
import { useContext } from 'react';

interface IParams {
	onClick: () => void;
	tokenCurrency: string;
}

const TokenButton = ({ onClick, tokenCurrency }: IParams) => {
	const {currencies} = useContext(CtxRootData);
	const tokenData = currencies.get(tokenCurrency);

	return (
		<button
			onClick={onClick}
			className={`${styles.TokenButton} h-[60px] rounded-sm w-full px-5 py-3 flex items-center justify-between`}
		>
			{!tokenData ? (
				<div className='text-gray-400 text-base md:text-sm'>
					Choose token...
				</div>
			) : (
				<div className="flex gap-4 items-center">
					<IconCoin width={34} height={34} code={tokenData.currency} />
					<p className="font-medium text-sm">{tokenData.name} ({tokenData.currency})</p>
				</div>
			)}

			<IconDoubleArrows />
		</button>
	);
};

export default TokenButton;
