import { ActiveBonusProgram } from "@/shared/api/bank/deals";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "../ui/style.module.scss";

export const dealsData = {
  EUR: [
    {
      id: ActiveBonusProgram.CASHBACK1,
      name: "cashback_programs.1_perc_cash",
      accrualPeriod: "cashback_programs.paid_monthly",
      conditions: [
        "cashback_programs.block_GKE_tokens",
        "cashback_programs.cashback_accrued",
        "cashback_programs.gke_blocked_30days"
      ],
      className: styles.CashbackCardLightOrange,
      mobileModalColor: styles.CashbackCardLightOrange,
      icon: <IconApp lib={2} code='t76' size={107} color='#A2BEB8' />,
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: "cashback_programs.cash_without_commision",
      accrualPeriod: "",
      conditions: ["cashback_programs.necessary_block", "cashback_programs.gke_blocked_90days"],
      className: styles.CashbackCardLightBlue,
      mobileModalColor: styles.CashbackCardLightBlue,
      icon: <IconApp lib={2} code='t74' size={107} color='#A2BEB8' />,
      isActive: false
    }
  ],
  EURG: [
    {
      id: ActiveBonusProgram.CASHBACK,
      name: "cashback_programs.4_perc_cash",
      accrualPeriod: "cashback_programs.paid_monthly_interest",
      conditions: ["cashback_programs.higher_300", "cashback_programs.limit_100000"],
      className: styles.CashbackCardLightGreen,
      mobileModalColor: styles.CashbackCardLightGreen,
      icon: <IconApp lib={2} code='t75' size={107} color='#A2BEB8' />,
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: "cashback_programs.cash_without_commision",
      accrualPeriod: "",
      conditions: [
        "cashback_programs.block_GKE_tokens",
        "cashback_programs.cashback_accrued",
        "cashback_programs.once_a_month"
      ],
      className: styles.CashbackCardLightBlue,
      mobileModalColor: styles.CashbackCardLightBlue,
      icon: <IconApp lib={2} code='t74' size={107} color='#A2BEB8' />,
      isActive: false
    },
    {
      id: ActiveBonusProgram.PARTNERSHIP,
      name: "partnership_program.referal_title",
      accrualPeriod: "",
      conditions: ["partnership_program.referal_info"],
      className: styles.CashbackCardLightOrange,
      mobileModalColor: styles.CashbackCardLightOrange,
      icon: <IconApp lib={2} code='t89' size={107} color='#A2BEB8' />,
      isActive: false
    }
  ],
  GKE: [
    {
      id: ActiveBonusProgram.CASHBACK,
      name: "cashback_programs.5_perc_cash",
      accrualPeriod: "cashback_programs.paid_monthly_interest",
      conditions: ["cashback_programs.first_year", "cashback_programs.second_year"],
      className: styles.CashbackCardLightGreen,
      mobileModalColor: styles.CashbackCardLightGreen,
      icon: <IconApp lib={2} code='t75' size={107} color='#A2BEB8' />,
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK1,
      name: "cashback_programs.1_perc_cash",
      accrualPeriod: "cashback_programs.paid_monthly",
      conditions: [
        "cashback_programs.block_GKE_tokens",
        "cashback_programs.cashback_accrued",
        "cashback_programs.gke_blocked_30days"
      ],
      className: styles.CashbackCardLightOrange,
      mobileModalColor: styles.CashbackCardLightOrange,
      icon: <IconApp lib={2} code='t76' size={107} color='#A2BEB8' />,
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: "cashback_programs.cash_without_commision",
      accrualPeriod: "",
      conditions: ["cashback_programs.necessary_block", "cashback_programs.gke_blocked_90days"],
      className: styles.CashbackCardLightBlue,
      mobileModalColor: styles.CashbackCardLightBlue,
      icon: <IconApp lib={2} code='t74' size={107} color='#A2BEB8' />,
      isActive: false
    },
    {
      id: ActiveBonusProgram.PARTNERSHIP,
      name: "partnership_program.referal_title",
      accrualPeriod: "",
      conditions: ["partnership_program.referal_condition_first", "partnership_program.referal_condition_second"],
      className: styles.CashbackCardLightOrange,
      mobileModalColor: styles.CashbackCardLightOrange,
      icon: <IconApp lib={2} code='t89' size={107} color='#A2BEB8' />,
      isActive: false
    }
  ]
};
