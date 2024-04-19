import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@/shared/ui/button/Button';
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import { useTranslation } from 'react-i18next';

interface IParams {
    description: string | JSX.Element;
}

const About = ({description}: IParams) => {
    const navigate = useNavigate();
    const {$const, name} = useContext(CtxWalletData);
    const {xl, md} = useContext(BreakpointsContext);
    const isEUR: boolean = $const === 'EUR';
    const {t} = useTranslation();

    return (
        <div className=" bg-white rounded-md px-6 py-3 mt-3"> 
            <div className="flex mt-1 mb-3 items-center">
                {/* <div className="mr-4">
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
                </div> */}

                <h1 className="font-bold text-base text-gray-600">
                    {name}
                </h1>
            </div>

            <div className='text-gray-500 text-sm font-medium'>
                {description}
            </div>

            {isEUR ? null : (
                <div className={`grid gap-5 grid-cols-2 mt-10 ${!md ? "max-w-[320px]" : ""}`}>
                    <Button variant="darkBlue" size="sm" onClick={() => navigate(`/exchange?to=${$const}`)}>
                        {t("buy")}
                    </Button>

                    <Button onClick={() => navigate(`/exchange?from=${$const}`)} className="relative" variant="darkBlue" size="sm">
                        {t("sell")}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default About;
