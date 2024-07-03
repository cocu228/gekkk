import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/new-deposit";
import AppInit from "@/app/providers/AppInit";
import PageProblems from '@/pages/page-problems/PageProblems';
import Support from "@/pages/support";
import ProfileSettings from "@/pages/profile-settings";
import DepositTypes from "@/pages/deposit-types";
import CurrentDeposit from "@/pages/current-deposit";
import Wallet from '@/pages/wallet';

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
                path: 'open-deposit',
                element: <Deposit/>
            },
            {
                path: 'deposit-types',
                element: <DepositTypes/>,
            },
            {
                path: 'deposit/:id',
                element: <CurrentDeposit/>
            },
            {
                path: 'wallet',
                element: <Wallet />
            },
            {
                path: 'support',
                children: [
                    {
                        path: '',
                        element: <Support/>
                    },
                ]
            },
            {
                path: 'support',
                element: <Support/>
            },
            {
                path: 'profile-settings',
                element: <ProfileSettings/>
            },
        ],
        // Show exception message only in dev mode
        ...(import.meta.env.MODE === "dev.gekkoin"
            ? {}
            : {errorElement: <PageProblems code={500}/>})
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