import descriptions from '@/shared/config/coins/descriptions'
import Button from '@/shared/ui/button/Button';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {CtxCurrencyData} from "@/widgets/wallet/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const About = () => {

    const {asset} = useContext(CtxCurrencyData);
    const {xl, md} = useContext(BreakpointsContext);
    const navigate = useNavigate();

    if (!asset) return;

    return (
        <div>
            <div className="flex mb-6 items-center">
                <div className="mr-4">
                    <img
                        className='h-[50px] w-[50px]'
                        src={`/img/tokens/${asset.code.toLowerCase().capitalize()}Icon.svg`}
                        onError={({currentTarget}) => {
                            if (currentTarget.getAttribute("data-icon") === "empty")
                                return null

                            currentTarget.setAttribute("data-icon", "empty")
                        }}
                        alt={asset.code}
                    />
                </div>

                <h1 className="font-bold text-base text-gray-600">
                    {asset.name}
                </h1>
            </div>

            <div className='text-gray-500 text-sm font-medium'>
                {descriptions[asset.code] ?? `Description for this token is not done yet.`}
            </div>
            <div className={`grid gap-5 grid-cols-2 mt-10 ${!md ? "max-w-[320px]" : ""}`}>
                <Button gray size="sm" onClick={() => navigate("/exchange")}>Buy
                </Button>
                <Button onClick={() => navigate("/exchange")} className="relative" gray size="sm">
                    Sell
                </Button>
            </div>
        </div>
    );
};

export default About;
