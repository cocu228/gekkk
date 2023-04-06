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
import P404 from '@/pages/404/404';
import ProfileSettings from "@/pages/profile-settings";


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
                path: 'deposit',
                element: <Deposit/>
            },
            {
                path: 'exchange',
                element: <Exchange/>
            },
            {
                path: 'room-creator',
                element: <RoomCreator/>
            },
            {
                path: 'room-visitor',
                element: <RoomVisitor/>
            },
            {
                path: 'assets',
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
                path: 'current-deposit',
                element: <CurrentDeposit/>
            },
        ],
    },
    {
        path: "*",
        element: <P404/>
    },
]);

export default () => {
    return (
        <RouterProvider router={router}/>
    )
}