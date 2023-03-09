import {useParams} from "react-router-dom";
import {useEffect} from "react";

function Wallet() {

    const params = useParams();

    return (
        <div className="flex flex-auto">
            <div className="w-full mx-auto my-0 max-w-[1332px] px-4">
                <div className="flex justify-center py-6">
                    <div className="flex justify-start my-auto">
                        <div className="mr-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50px"
                                height="50px"
                                viewBox="0 0 50 50">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M25 50c13.807 0 25-11.193 25-25S38.807 0 25 0C14.056 0 4.754 7.033 1.367 16.826h8.789A16.99 16.99 0 0125.04 8.052c6.13 0 11.479 3.24 14.476 8.087.399.52.641 1.17.641 1.875a3.125 3.125 0 01-3.126 3.118 3.13 3.13 0 01-2.761-1.647 10.74 10.74 0 00-9.23-5.214c-5.937 0-10.758 4.804-10.758 10.73 0 5.931 4.82 10.735 10.758 10.735 4.276 0 7.96-2.481 9.698-6.076h-7.711a3.115 3.115 0 010-6.229h11.828v.007a3.114 3.114 0 013.073 3.462c-.944 8.465-8.143 15.048-16.888 15.048a16.99 16.99 0 01-14.883-8.768H1.37C4.757 42.97 14.057 50 25 50zM.075 26.951h8.088a17.087 17.087 0 010-3.897H.075a25.348 25.348 0 000 3.897z"
                                    fill="url(#EurgIcon_svg__paint0_linear)"
                                />
                                <defs>
                                    <linearGradient
                                        id="EurgIcon_svg__paint0_linear"
                                        x1={75}
                                        y1={25}
                                        x2={25}
                                        y2={-25}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#00AEEF" />
                                        <stop offset={1} stopColor="#72BF44" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        <div>
                            Wallet
                        </div>
                    </div>

                    <div className="ml-auto text-right">
                        <div className="font-bold text-[32px] leading-[48px] text-gekDarkGray mb-4">
                            {params.coin}
                        </div>
                        <div className="font-bold text-[32px] leading-[48px] text-gekDarkGray mb-4">
                            Gekkoin Europe wallet
                        </div>
                        <div className="max-w-[450px] font-medium text-sm text-gray whitespace-pre-line">
                            Utility token with a fixed rate
                            <br/>
                            1 EURG = 1 euro
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet;
