import styles from './styles.module.scss';
import { IconCoin } from '@/shared/ui/icons/icon-coin';
import { useContext } from 'react';
import {CtxCurrencies} from "@/processes/CurrenciesContext";

interface IParams {
	onClick: () => void;
	tokenCurrency: string;
}

const TokenButton = ({ onClick, tokenCurrency }: IParams) => {
	const {currencies} = useContext(CtxCurrencies);
	const currency = currencies.get(tokenCurrency);

	return (
		<button
			onClick={onClick}
			className={`${styles.TokenButton} h-[60px] rounded-sm w-full px-5 py-3 flex items-center justify-between`}
		>
			{!currency ? (
				<div className='text-gray-400 text-base md:text-sm'>
					Choose token...
				</div>
			) : (
				<div className="flex gap-4 items-center">
					<IconCoin width={34} height={34} code={currency.$const} />
					<p className="font-medium text-sm">{currency.name} ({currency.$const})</p>
				</div>
			)}
		</button>
	);
};

export default TokenButton;
