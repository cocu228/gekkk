import descriptions from '@/shared/config/coins/descriptions'
import Button from '@/shared/ui/button/Button';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {CtxWalletCurrency} from "@/widgets/wallet-stage/top-up/model/context";


const About = () => {

    const currency = useContext(CtxWalletCurrency),
        {
            name,
            defaultInfoToken: {flags}
        } = currency

    const navigate = useNavigate()

    return (
        <div>
            <div className="flex mb-6 items-center">
                <div className="mr-4">
                    <img
                        className='h-[50px] w-[50px]'
                        src={`/img/tokens/${currency.const.toLowerCase().capitalize()}Icon.svg`}
                        onError={({currentTarget}) => {
                            if (currentTarget.getAttribute("data-icon") === "empty")
                                return null

                            currentTarget.setAttribute("data-icon", "empty")
                        }}
                        alt={currency.const}
                    />
                </div>

                <h1 className="font-bold text-base text-gray-600">
                    {name}
                </h1>
            </div>

            <div className='text-gray-500 text-sm font-medium'>
                {descriptions[currency.const] ?? `Description for this token is not done yet.`}
            </div>

            {flags === 2 && (
                <div className='grid gap-5 grid-cols-2 mt-10'>
                    <Button gray size="sm" onClick={() => navigate("/exchange")}>Buy
                    </Button>
                    <Button onClick={() => navigate("/exchange")} className="relative" gray size="sm">
                        Sell
                    </Button>
                </div>
            )}
        </div>
    );
};

export default About;
