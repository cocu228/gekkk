
type IProps = {
    children: JSX.Element[] | [JSX.Element]
}

export default function TransfersWrapper({children}: IProps) {

    function returnTitle(tag){
        console.log(tag);
        
        if(tag === "select_currency"){            
            return "Currency:"
        }else if(tag === "choose_network"){
            return "Type:"
        }
    }

    return (
        <>
            {
                children.map((child):JSX.Element => {
                    if(child?.props["data-tag"] !== "main" && child){
                        return(
                            <div className="flex h-[54px] w-full items-center flex-row justify-start mb-5 rounded-[8px] bg-[white]">
                                <span className="ml-5 min-w-[80px] text-start">{returnTitle(child?.props["data-tag"])}</span>
                                <div className="flex w-[236px] justify-center items-center">{child}</div>
                            </div>
                        )
                    }else{
                        return(
                            <div>

                            </div>
                        )
                    }
                })
            }
        </>
    )
}