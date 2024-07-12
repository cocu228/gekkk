import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Loader from "@/shared/ui/loader";
import { randomId } from "@/shared/lib";
import { apiGetCards } from "@/shared/(orval)api";
import { CtxRootData } from "@/processes/RootContext";
import { Card as ICardData } from "@/shared/(orval)api/gek/model";

import OrderCardForm from "./order-card-form/OrderCardForm";
import { ICardStorage } from "../model/types";
import MenuForm from "./menu-form";

const CardsMenu = () => {
  const [params] = useSearchParams();
  const newCardUrl = params.has("new");
  const { account, refreshKey } = useContext(CtxRootData);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isNewCardOpened, setIsNewCardOpened] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<ICardData | null>(null);

  const [cardsStorage, setCardsStorage] = useState<ICardStorage>({
    cards: null,
    refreshKey: null
  });

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      setLoading(true);
      const { data } = await apiGetCards(null, {
        cancelToken: cancelTokenSource.token
      });

      setCardsStorage({
        cards: data.result,
        refreshKey: randomId()
      });
      setLoading(false);
    })();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [account, refreshKey]);

  // Open new card form if
  // - user pressed "Issue new card" button
  // - page URL contains "new" query parameter
  // - user has no cards or they can't be loaded
  return isLoading ? (
    <Loader className='relative md:mt-20' />
  ) : isNewCardOpened || newCardUrl || (cardsStorage.cards?.length ?? 0) === 0 ? (
    <OrderCardForm
      card={selectedCard}
      setIsNewCardOpened={setIsNewCardOpened}
      closable={cardsStorage.cards?.length !== 0 || selectedCard !== null}
    />
  ) : (
    <MenuForm
      cardsStorage={cardsStorage}
      setCardsStorage={setCardsStorage}
      setIsNewCardOpened={setIsNewCardOpened}
      onSelectCard={card => setSelectedCard(card)}
    />
  );
};

export default CardsMenu;
