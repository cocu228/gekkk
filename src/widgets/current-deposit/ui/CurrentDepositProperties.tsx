import {differenceInDays} from 'date-fns';
import InlineProperty from '@/shared/ui/inline-property';
import {formatForCustomer} from '@/shared/lib/date-helper';

interface IOpenDepositProperties {
    closed: Date;
    opened: Date;
    amount: string;
    isClosed?: boolean;
}

function CurrentDepositProperties({ opened, amount, closed, isClosed = false }: IOpenDepositProperties) {
    return (
        <div className="flex flex-col gap-3 md:gap-2 column w-[24rem] h-[6rem] xxxl:w-[22rem] xxl:w-[20rem] xl:w-full">
            <InlineProperty left="Opened" right={formatForCustomer(opened)} />
            <InlineProperty left="Amount" right={amount} />
            {isClosed ? (
                <InlineProperty left={'Closed'} right={formatForCustomer(opened)} />
            ) : (
                <InlineProperty
                    left={'Term'}
                    right={
                        `${differenceInDays(closed, opened) + 1} days (until ${formatForCustomer(closed)})`
                    }
                />
            )}
        </div>
    )
}

export default CurrentDepositProperties;
