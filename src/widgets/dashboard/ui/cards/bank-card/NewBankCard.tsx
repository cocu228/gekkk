import styles from './style.module.css';

const NewBankCard = () => {
	return (
		<div className="flex justify-center">
			<div className='flex absolute w-full h-[143px] items-center justify-center font-bold select-none text-lg'>
				<div className='my-10 rounded-[6px] p-1  text-white bg-black bg-opacity-25'>
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

export default NewBankCard;
