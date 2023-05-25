import {Link} from 'react-router-dom';
import Card from "@/shared/ui/card/Card";
import Button from "@/shared/ui/button/Button";

interface IParams {
    title: string,
    subtitle: string,
    price?: number | string,
    until?: string,
    currency?: string,
    onOpenDeposit: () => void,
    linkUrl: string,
    isDeposit?: boolean,
}

function DepositCard({
    title,
    subtitle,
    price,
    until,
    currency,
    onOpenDeposit,
    isDeposit,
    linkUrl
}: IParams) {
    return (
        <Card>
            <p className="text-fs14 font-semibold">{title}</p>
            <p className="text-fs12 mt-[4px] font-medium text-gray-400">{subtitle}</p>
            <div className="mt-auto pt-[20px]">
                <div className='flex justify-between'>
                    {!price ? null : (
                        <p className="text-fs14 font-medium uppercase">
                            <p className='text-fs12 mt-[4px] font-medium text-gray-400'>Amount</p>
                            <strong className="text-fs24 font-bold">{price}</strong> {currency}
                        </p>
                    )}

                    {!until ? null : (
                        <p className="text-fs14 font-medium uppercase">
                            <p className='text-fs12 mt-[4px] font-medium text-gray-400'>Until</p>
                            <strong className="text-fs24 font-bold">{until}</strong>
                        </p>
                    )}
                </div>
                <div className="flex gap-[16px] mt-[16px]">
                    <Button className="flex-1" gray size="sm" onClick={onOpenDeposit}>
                        {!isDeposit ? 'Open deposit' : 'More details'}
                    </Button>
                    <div className="flex items-center flex-1 justify-center">
                        {!isDeposit && (
                            <Link to={linkUrl} className="text-fs14 font-medium underline text-gray-400 hover:text-blue-400">
                                Interest rates →
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default DepositCard;