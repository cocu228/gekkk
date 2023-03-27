import descriptions from '@/shared/config/coins/descriptions'
import Button from '@/shared/ui/button/Button';

type AboutParams = {
    currency: string,
    name: string,
    flags: number
}

const About = ({currency, name, flags}: AboutParams) => {
    return (
        <div>
            <div className="flex mb-[22px] items-center">
                <div className="mr-4">
                    <img
                        className='h-[50px] w-[50px]'
                        src={`/img/tokens/${currency.toLowerCase().capitalize()}Icon.svg`}
                        onError={({ currentTarget }) => {
                            if (currentTarget.getAttribute("data-icon") === "empty")
                                return null

                            currentTarget.setAttribute("data-icon", "empty")
                        }}
                        alt={currency}
                    />
                </div>

                <h1 className="font-bold text-base text-gray-600">
                    {name}
                </h1>
            </div>

            <div className='text-gray-500 text-sm font-medium'>
                {descriptions[currency]?? `Description for this token is not done yet.`}
            </div>

            {flags === 2 && (
                <div className='grid gap-5 grid-cols-2 mt-10'>
                    <Button gray size="small" href="/exchange">

                        <span className='pt-1 font-semibold'>Buy</span>
                    </Button>
                    <Button gray size="small" href="/exchange">
                        <span className='pt-1 font-semibold'>Sell</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default About;
