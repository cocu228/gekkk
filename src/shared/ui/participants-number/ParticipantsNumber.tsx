import {useState} from 'react';
import styles from './style.module.scss';
import {isActiveClass} from "@/shared/lib/helpers";
import IconParticipant from '@/shared/ui/icons/IconParticipant';

interface Props {
    quantity: number,
    showIcon?: boolean,
    onLeave: () => void,
    onIconClick?: () => void
}

function ParticipantsNumber({quantity, showIcon = false, onLeave, onIconClick}: Props) {
    const [active, setActive] = useState(false);

    const onClick = async () => {
        setActive(true);
        setTimeout(() => setActive(false), 3000);
    }

    return (
        <div className="flex flex-col items-center lg:items-start gap-2 lg:gap-1 sm:gap-2 lg:w-full">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2 lg:w-full">
                <div className="flex gap-1">
                    <span className='font-semibold'>Number of participants</span>

                    <div data-text={"Update"} className="ellipsis">
                        <span className={`cursor-pointer ${styles.UpdateBtn} ${isActiveClass(active)}`}
                            onClick={onClick}>
                            <img width={20} height={20} src="/img/icon/DepositCurrentRateIcon.svg" alt="DepositCurrentRateIcon" />
                        </span>
                    </div>
                </div>

                <div className="inline-flex items-center gap-2">
                    <span className="font-medium text-3xl leading-7 sm:text-xl">
                        {quantity}
                    </span>

                    {showIcon && (
                        <div
                            onClick={onIconClick}
                            className='hover:cursor-pointer hover:fill-blue-400'
                        >
                            <IconParticipant
                                height={24}
                                width={24}
                                fill='inherit'
                                />
                        </div>
                    )}
                </div>
            </div>
            <button className="font-medium text-secondary" onClick={onLeave}>Leave the room</button>
        </div>
    );
}

export default ParticipantsNumber;
