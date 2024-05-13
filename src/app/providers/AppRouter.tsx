import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Dashboard from '@/pages/dashboard'
import Wallet from '@/pages/wallet';
import Exchange from "@/pages/exchange";
import AppInit from "@/app/providers/AppInit";
import Assets from '@/pages/assets';
import PageProblems from '@/pages/page-problems/PageProblems';
import ProfileSettings from "@/pages/profile-settings";
import Support from "@/pages/support/";
import PartnershipProgram from "@/pages/partnership-program";
// import SupportChatAuthorized from '@/pages/support/chat-authorized';
// import SupportChatUnauthorized from '@/pages/support/chat-unauthorized';
import {Faq} from '@/pages/faq';
import {Settings} from '@/pages/settings';
import HistoryPage from "@/pages/history-page";
import Transfers from '@/pages/transfers';
import { MainCardPage } from '@/pages/card-menu';
import { CardData } from '@/pages/card-menu/components/card-data';
import { GekkardPro } from '@/pages/gekkard-pro';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppInit/>,
        children: [
            {
                path: '',
                element: <Dashboard/>
            },
            // Used in Gekkoin
            // {
            //     path: 'new-deposit',
            //     children: [
            //         {
            //             path: '',
            //             element: <Deposit/>,
            //         }
            //     ]
            // },
            // {
            //     path: 'deposit-types',
            //     element: <CryptoDeposits/>,
            // },
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
                path: 'private-room',
                element: <Exchange/>
            },
            {
                path: 'support',
                children: [
                    {
                        path: '',
                        element: <Support/>
                    },
                    // {
                    //     path: 'chat',
                    //     element: <SupportChatAuthorized/>
                    // },
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
                path: 'wallet',
                element: <Wallet/>
            },
            {
                path: 'profile-settings',
                element: <ProfileSettings/>
            },
            // Used in Gekkoin
            // {
            //     path: 'deposit/:id',
            //     element: <CurrentDeposit/>
            // },
            {
                path: 'faq',
                element: <Faq />
            },
            {
                path: 'settings',
                element: <Settings />
            },
            {
                path: 'card-menu',
                element: <MainCardPage/>,
            },
            {
                path: 'card-data',
                element: <CardData/>,
            },
            {
                path: 'gekkard-pro',
                element: <GekkardPro/>,
            }
        ],
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
