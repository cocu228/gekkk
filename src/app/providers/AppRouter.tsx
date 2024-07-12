import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "@/pages/dashboard";
import Wallet from "@/pages/wallet";
import Exchange from "@/pages/exchange";
import AppInit from "@/app/providers/AppInit";
import Assets from "@/pages/assets";
import PageProblems from "@/pages/page-problems/PageProblems";
import ProfileSettings from "@/pages/profile-settings";
import Support from "@/pages/support/";
import PartnershipProgram from "@/pages/partnership-program";
import { Faq } from "@/pages/faq";
import { Settings } from "@/pages/settings";
import HistoryPage from "@/pages/history-page";
import Transfers from "@/pages/transfers";
import { GekkardPro } from "@/pages/gekkard-pro";
import { IS_GEKKARD_APP } from "@/shared/lib";
import ReceiptPage from "@/pages/receipt-page";
import CardsMenu from "@/widgets/cards-menu/ui";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppInit />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "partnership-program",
        element: <PartnershipProgram />
      },
      {
        path: "transfers",
        element: <Transfers />
      },
      {
        path: "support",
        children: [
          {
            path: "",
            element: <Support />
          }
        ]
      },
      {
        path: "crypto-assets",
        element: <Assets />
      },
      {
        path: "history",
        element: <HistoryPage />
      },
      {
        path: "receipt",
        element: <ReceiptPage />
      },
      {
        path: "wallet",
        element: <Wallet />
      },
      {
        path: "profile-settings",
        element: <ProfileSettings />
      },
      {
        path: "faq",
        element: <Faq />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "gekkard-pro",
        element: <GekkardPro />
      },
      ...(IS_GEKKARD_APP()
        ? [
            {
              path: "card-menu",
              element: <CardsMenu />
            },
            {
              path: "exchange",
              element: <Exchange />
            },
            {
              path: "private-room",
              element: <Exchange />
            }
          ]
        : [])
    ],
    // Show exception message only in dev mode
    ...(import.meta.env.MODE === "dev.gekkard" ? {} : { errorElement: <PageProblems code={500} /> })
  },
  {
    path: "*",
    element: <PageProblems />
  }
]);

export default () => <RouterProvider router={router} />;
