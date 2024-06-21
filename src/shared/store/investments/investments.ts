import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Decimal } from "decimal.js";

import { apiGetInvestments } from "@/shared/(orval)api";
import { GetDepositOut } from "@/shared/(orval)api/gek/model";

export interface IStoreInvestments {
  totalAmount: string;
  getInvestments: () => Promise<void>;
  removeInvestment: (id: number) => Promise<void>;
  investments: Array<GetDepositOut & { isGke: boolean }>;
  addInvestment: (investment: GetDepositOut) => Promise<void>;
}

const getTotalAmount = (investments: GetDepositOut[]): string =>
  investments.reduce((sum, invest) => sum.add(invest.cur_amount), new Decimal(0)).toString();

export const storeInvestments = create<IStoreInvestments>()(
  devtools(set => ({
    investments: null,
    totalAmount: null,
    getInvestments: async () => {
      try {
        const { data } = await apiGetInvestments();

        // Filter internal, cashback and noFee investments
        const investments = data.result
          .filter(inv => ![2, 3, 4, 102].includes(inv.dep_type))
          .map(inv => ({
            ...inv,
            isGke: inv.dep_type > 100
          }));

        set(state => ({
          ...state,
          investments,
          totalAmount: getTotalAmount(investments)
        }));
      } catch (er) {
        console.log(er);
      }
    },
    addInvestment: async (investment: GetDepositOut) => {
      set(state => {
        const investments = [
          ...state.investments,
          {
            ...investment,
            isGke: investment.dep_type > 100
          }
        ];

        return {
          ...state,
          investments,
          totalAmount: getTotalAmount(investments)
        };
      });
    },
    removeInvestment: async (id: number) => {
      set(state => {
        const investments = state.investments?.filter(i => i.id !== id);

        return {
          ...state,
          investments,
          totalAmount: getTotalAmount(investments)
        };
      });
    }
  }))
);
