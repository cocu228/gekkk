import {Switch} from "antd";
import {Switch as SwitchUi} from "@/shared/ui/!switch/index";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import React, {useContext, useState} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

interface IParams {
	depositType?: 1     // Fixed
		| 10 | 11 | 12  // Safe
		| 20 | 21 | 22  // Balanced
		| 30 | 31 | 32  // Dynamic
}

const DepositDescriptionCard = ({depositType}: IParams) => {
	const {xl, md} = useContext(BreakpointsContext);
	const [isIncreased, setIsIncreased] = useState<boolean>(false);
	const increasingProgramDescription = `The structured deposit placed in EURG will be
        charged double yield, and if there is a loss, it will be expressed as a twofold
        reduction of the loss, but GKE tokens will also be frozen at a ratio of 1:1 to
        EURG for the duration of the deposit.`;
	
	
	
	return (
		<div>
			<div className="row mt-6">
				<div className="grid grid-cols-2 col">
					<h4 className="font-bold">0,8% per month</h4>
					
					<div className='flex gap-2'>
						<Switch
							defaultChecked={isIncreased}
							onChange={setIsIncreased}
						/>
						isIncreased: {`${isIncreased}`}
						<span className='mt-[2px]'>Increase rate
                                    <Tooltip text={increasingProgramDescription}>
                                        <div className="inline-block relative align-middle w-[14px] pb-1 ml-1 mt-[1px] cursor-help">
                                            <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                                        </div>
                                    </Tooltip>
                                </span>
					</div>
				</div>
			</div>
			<div className="row mt-6">
				<div className="col">
					<p className="text-gray-400 text-fs14 font-semibold leading-5">The fixed rate deposit allows
						you to know exactly
						how much
						interest you'll earn on your
						savings over a specific period</p>
				</div>
			</div>
			<div className="grid grid-cols-2 row flex-wrap mt-6 px-10 mb-3 gap-7">
				<div className="col">
					<div className="flex justify-center items-center gap-2 md:flex-col">
						<p className="text-gray-400 text-sm">Return</p>
						<div className="flex gap-1">
							<div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full"/>
							<div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
							<div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="flex justify-center items-center gap-2 md:flex-col">
						<p className="text-gray-400 text-sm">Risk</p>
						<div className="flex gap-1">
							<div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
							<div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
							<div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
						</div>
					</div>
				</div>
			</div>
			<div style={md ? {border: "1px solid #B4C0CD", borderRadius: "4px 4px 0px 0px"} : {}} className="wrapper bg-[var(--color-main-bg)] py-6 px-10 flex items-center">
				<p className="font-bold mr-4">0,8% per month (9,6% annual)</p>
				{/*<Button custom className={styles.scss("Button")}>Open deposit</Button>*/}
			</div>
		</div>
	);
}

export default DepositDescriptionCard;
