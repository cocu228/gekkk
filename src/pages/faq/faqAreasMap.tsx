import { AccountOpening } from './components/AccountOpening'
import CreateIntelligentAnalysisTask from '@/assets/create-intelligent-analysis-task.svg?react'
import Wallet from '@/assets/wallet.svg?react'
import Balances from '@/assets/balances.svg?react'
import Account from '@/assets/account.svg?react'
import Security from '@/assets/security.svg?react'
import CreditCard from '@/assets/credit-card.svg?react'
import PosMachine from '@/assets/pos-machine.svg?react'
import Atm from '@/assets/atm.svg?react'
import History from '@/assets/history.svg?react'
import Euro from '@/assets/euro.svg?react'
import Other from '@/assets/other.svg?react'
import SupportIcon from '@/assets/support-icon.svg?react'

export const faqAreasMap = {
  '': null,
  'Account opening': {
    icon: <CreateIntelligentAnalysisTask />,
    area: <AccountOpening />,
  },
  'Account': {
    icon: <Wallet />,
    area: <div>'Account'</div>,
  },
  'Account balance': {
    icon: <Balances />,
    area: <div>'Account balance'</div>,
  },
  'Personal information': {
    icon: <Account />,
    area: <div>'Personal information'</div>,
  },
  'Security': {
    icon: <Security />,
    area: <div>'Security'</div>,
  },
  'Cards': {
    icon: <CreditCard />,
    area: <div>'Cards'</div>,
  },
  'Card purchases': {
    icon: <PosMachine />,
    area: <div>'Card purchases'</div>,
  },
  'ATM transactions': {
    icon: <Atm />,
    area: <div>'ATM transactions'</div>,
  },
  'Money transfers': {
    icon: <History />,
    area: <div>'Money transfers'</div>,
  },
  'Fees': {
    icon: <Euro />,
    area: <div>'Fees'</div>,
  },
  'Other': {
    icon: <Other />,
    area: <div>'Other'</div>,
  },
  'Support chat': {
    icon: <SupportIcon />,
    area: <div>'Support chat'</div>,
  },
}
export type AvailableFaqAreas = keyof typeof faqAreasMap
export const faqAreasMapKeys = Object.keys(faqAreasMap) as AvailableFaqAreas[]
