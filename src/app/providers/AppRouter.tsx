import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
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
import {Faq} from '@/pages/faq';
import {Settings} from '@/pages/settings';
import HistoryPage from "@/pages/history-page";
import Transfers from '@/pages/transfers';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppInit/>,
        children: [
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
                path: "transfers",
                element: <Transfers/>
                
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
                path: 'history',
                element: <HistoryPage/>
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
            {
                path: 'faq',
                element: <Faq />
            },
            {
                path: 'settings',
                element: <Settings />
            }
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
