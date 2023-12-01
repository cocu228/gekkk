import {createBrowserRouter, Navigate, RouterProvider,} from 'react-router-dom';
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/new-deposit";
import CurrentDeposit from '@/pages/current-deposit'
import Wallet from '@/pages/wallet';
import Exchange from "@/pages/exchange";
import AppInit from "@/app/providers/AppInit";
import Assets from '@/pages/assets';
import PageProblems from '@/pages/page-problems/PageProblems';
import ProfileSettings from "@/pages/profile-settings";
import Support from "@/pages/support/";
import CryptoDeposits from "@/pages/crypto-deposits";
import PartnershipProgram from "@/pages/partnership-program";
import SupportChatAuthorized from '@/pages/support/chat-authorized';
import SupportChatUnauthorized from '@/pages/support/chat-unauthorized';
// import { NewLayout } from '../layouts/new-layout/NewLayout';
// import { NewAccounts } from '@/pages/new-accounts';
// import { NewMoneyLayout } from '../layouts/new-money-layout/NewMoneyLayout';
// import Chat from "@/features/chat/ui/chat/Chat";
// import ChatModal from '@/features/chat/ui/chat-modal/ChatModal';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppInit/>,
        children: [
            // {
            //     path: '/new',
            //     element: <NewLayout/>,
            //     children: [
            //         {
            //             path: 'money',
            //             element: <NewMoneyLayout />,
            //             children: [
            //                 {
            //                     path: 'accounts',
            //                     element: <NewAccounts/>
            //                 },

            //                 {
            //                     path: 'cards',
            //                     element: <div>this is cards page</div>
            //                 },
            //                 {
            //                     path: '',
            //                     element: <Navigate to="/new/money/accounts" replace />
            //                 }
            //             ]
            //         },
            //         {
            //             path: 'crypto',
            //             element: <div>Crypto page</div>
            //         },
            //         {
            //             path: 'pro',
            //             element: <div>PRO page</div>
            //         },

            //         {
            //             path: '',
            //             element: <Navigate to="/new/money/accounts" replace />
            //         },
            //         {
            //             path: 'pro',
            //             element: <div>PRO page</div>
            //         },
            //     ]
            // },

            {
                path: '',
                element: <Dashboard/>
            },
            {
                path: 'new-deposit',
                children: [
                    {
                        path: '',
                        element: <Deposit/>,
                    }
                ]
            },
            {
                path: 'deposit-types',
                element: <CryptoDeposits/>,
            },
            {
                path: 'partnership-program',
                element: <PartnershipProgram/>,
            },
            {
                path: 'exchange',
                element: <Exchange/>
            },
            {
                path: 'private-room/:roomNumber',
                element: <Exchange/>
            },
            {
                path: 'support',
                children: [
                    {
                        path: '',
                        element: <Support/>
                    },
                    {
                        path: 'chat',
                        element: <SupportChatAuthorized/>
                    },
                ]
            },
            {
                path: 'crypto-assets',
                element: <Assets/>
            },
            {
                path: 'wallet/:currency/:tab?',
                element: <Wallet/>
            },
            {
                path: 'profile-settings',
                element: <ProfileSettings/>
            },
            {
                path: 'deposit/:id',
                element: <CurrentDeposit/>
            },
        ],
    },
    {
        path: 'chat',
        element: <SupportChatUnauthorized/> 
    },
    {
        path: "*",
        element: <PageProblems/>
    },
]);

export default () => {
    return (
        <RouterProvider router={router}/>
    )
}
