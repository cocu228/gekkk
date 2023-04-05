import React from 'react';
import IconParticipant from '@/shared/ui/icons/IconParticipant';

interface Props {
    quantity: number,
    showIcon?: boolean,
    onLeave: () => void,
}

function ParticipantsNumber({quantity, showIcon = false, onLeave}: Props) {
    return (
        <div className="flex flex-col items-center lg:items-start gap-2 lg:gap-1 sm:gap-2 lg:w-full">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-2 lg:w-full">
                <div className="font-semibold">Number of participants</div>
                <div className="inline-flex items-center gap-2">
                    <span className="font-medium text-3xl leading-7 sm:text-xl">{quantity}</span>
                    {showIcon && (
                        <IconParticipant/>
                    )}
                </div>
            </div>
            <button className="font-medium text-secondary" onClick={onLeave}>Leave the room</button>
        </div>
    );
}

export default ParticipantsNumber;