import axios from "axios";
import MenuForm from "./menu-form";
import Loader from "@/shared/ui/loader";
import { randomId } from "@/shared/lib";
import { useContext, useEffect, useState } from "react";
import { ICardStorage } from "../model/types";
import { apiGetCards } from "@/shared/(orval)api";
import { useSearchParams } from "react-router-dom";
import OrderCardForm from "./order-card-form/OrderCardForm";
import { CtxRootData } from "@/processes/RootContext";

const CardsMenu = () => {
    const [params] = useSearchParams();
    const newCardUrl = params.has("new");
    const { account, refreshKey } = useContext(CtxRootData);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isNewCardOpened, setIsNewCardOpened] = useState<boolean>(false);

    const [cardsStorage, setCardsStorage] = useState<ICardStorage>({
        cards: null,
        refreshKey: null,
    });
    
    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
    
        (async () => {
            setLoading(true);
            const { data } = await apiGetCards(null, {
                cancelToken: cancelTokenSource.token
            });

            setCardsStorage({
                cards: data.result,
                refreshKey: randomId(),
            });
            setLoading(false);
        })();
    
        return () => {cancelTokenSource.cancel()};
    }, [account, refreshKey]);
 
    // Open new card form if
    // - user pressed "Issue new card" button
    // - page URL contains "new" query parameter
    // - user has no cards or they can't be loaded
    return isLoading
        ? <Loader className="relative md:mt-20"/>
        : (isNewCardOpened || newCardUrl || (cardsStorage.cards?.length ?? 0) === 0)
            ? <OrderCardForm
                closable={cardsStorage.cards?.length !== 0}
                setIsNewCardOpened={setIsNewCardOpened}
            />
            : <MenuForm
                cardsStorage={cardsStorage}
                setCardsStorage={setCardsStorage}
                setIsNewCardOpened={setIsNewCardOpened}
            />
}

export default CardsMenu;
