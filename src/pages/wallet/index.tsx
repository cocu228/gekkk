function Wallet() {
    return (
        <div className="flex flex-auto">
            <div className="w-full mx-auto my-0 max-w-[1332px] px-4">
                <div className="flex justify-center py-6">
                    <div className="flex justify-start my-auto">
                        <div className="mr-6 w-[50px] h-[50px]">
                            <img src="/public/img/icon/EurgIcon.svg" alt="logo"/>
                        </div>

                        </div>

                        <div>
                            Wallet
                        </div>
                    </div>

                    <div className="ml-auto text-right">
                        <div className="font-bold text-[32px] leading-[48px] text-gekDarkGray mb-4">
                            Gekkoin Europe wallet
                        </div>
                        <div className="max-w-[450px] font-medium text-sm text-gekLightGray whitespace-pre-line">
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
