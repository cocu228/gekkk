﻿import styles from './style.module.scss';

const BankCard = () => {
	return (
		<div className="flex justify-center">
			<div className='flex absolute w-full h-full items-center justify-center font-bold select-none text-lg'>
				<div className='mb-10 rounded-[6px] p-1  text-white bg-black bg-opacity-25'>
					Open new card...
				</div>
			</div>
			
			<div className={styles.BankCard}>
				<img
					src='/img/payment-card/payment-card-background.jpg'
					className='rounded-[10px]'
				/>
			</div>
		</div>
	)
}

export default BankCard;
