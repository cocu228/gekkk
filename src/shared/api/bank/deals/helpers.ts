import { ActiveBonusProgram } from "./get-deals";

export const DealDesc = {
  [ActiveBonusProgram.CASHBACK1]: {
    start: 'NEW',
    end: 'FINISH',
  },
  [ActiveBonusProgram.CASHBACK2]: {
    start: 'NEW_3',
    end: 'FINISH_4',
  },
  [ActiveBonusProgram.CASHBACK3]: {
    start: 'NEW_5',
    end: 'FINISH_6'
  },
  [ActiveBonusProgram.CASHBACK_AMAZON]: {
    start: 'NEW_7',
    end: 'FINISH_8'
  },
  [ActiveBonusProgram.CASHBACK_MOBILE_STORES]: {
    start: 'NEW_9',
    end: 'FINISH_10'
  }
};