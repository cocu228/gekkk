import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@/shared/ui/button/Button';
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {getTokenDescriptions} from '@/shared/config/coins/descriptions';

const About = () => {
    const navigate = useNavigate();
    const {$const, name} = useContext(CtxWalletData);
    const {xl, md} = useContext(BreakpointsContext);
    const isEUR: boolean = $const === 'EUR';
    const descriptions = getTokenDescriptions(navigate);

    return (
        <div>
            <div className="flex mb-6 items-center">
                <div className="mr-4">
                    <img
                        className='h-[50px] w-[50px]'
                        src={`/img/tokens/${$const.toLowerCase().capitalize()}Icon.svg`}
                        onError={({currentTarget}) => {
                            if (currentTarget.getAttribute("data-icon") === "empty")
                                return null;

                            currentTarget.setAttribute("data-icon", "empty");
                            currentTarget.setAttribute("src", `/img/tokens/${$const.toLowerCase().capitalize()}Icon.png`)
                        }}
                        alt={$const}
                    />
                </div>

                <h1 className="font-bold text-base text-gray-600">
                    {name}
                </h1>
            </div>

            <div className='text-gray-500 text-sm font-medium'>
                {descriptions[$const] ?? `Description for this token is not done yet.`}
            </div>

            {isEUR ? null : (
                <div className={`grid gap-5 grid-cols-2 mt-10 ${!md ? "max-w-[320px]" : ""}`}>
                    <Button gray size="sm" onClick={() => navigate(`/exchange?to=${$const}`)}>
                        Buy
                    </Button>

                    <Button onClick={() => navigate(`/exchange?from=${$const}`)} className="relative" gray size="sm">
                        Sell
                    </Button>
                </div>
            )}
        </div>
    );
};

export default About;
