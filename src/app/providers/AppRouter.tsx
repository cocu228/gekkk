import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/deposit";
import CurrentDeposit from '@/pages/current-deposit'
import Wallet from '@/pages/wallet';
import Exchange from "@/pages/exchange";
import RoomCreator from "@/pages/room-creator";
import RoomVisitor from "@/pages/room-visitor";
import AppInit from "@/app/providers/AppInit";
import Assets from '@/pages/assets';
import PageProblems from '@/pages/page-problems/PageProblems';
import ProfileSettings from "@/pages/profile-settings";
import Support from "@/pages/support";
import CryptoDeposits from "@/pages/crypto-deposits";


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
                path: 'exchange/:to?',
                element: <Exchange/>
            },
            {
                path: 'room-creator',
                element: <RoomCreator/>
            },
            {
                path: 'support',
                element: <Support/>
            },
            {
                path: 'room-visitor',
                element: <RoomVisitor/>
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
        path: "*",
        element: <PageProblems/>
    },
]);

export default () => {
    return (
        <RouterProvider router={router}/>
    )
}