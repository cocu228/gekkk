import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useMemo, useState } from "react";
// @ts-ignore
// eslint-disable-next-line import/extensions
import { getDefaultItems } from "@VAR/widgets/header/model/{{mode-}}header-menu-items.tsx";

import { CtxRootData } from "@/processes/RootContext";
import { getFormattedIBAN, logout } from "@/shared/lib/helpers";
import { AccountRights } from "@/shared/config/mask-account-rights";
import { TOnActionParams } from "@/widgets/header/model/types";
import { storeAccounts } from "@/shared/store/accounts/accounts";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { ItemAccount, ItemOrganization } from "@/widgets/header/ui/menu/HeaderMenuIComponents";

import HeaderDesktop from "./desktop/desktop";
import HeaderMobile from "./mobile/mobile";

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { md } = useContext(BreakpointsContext);
  const { account, setAccount } = useContext(CtxRootData);
  const accounts = storeAccounts(state => state.accounts);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const defaultMenuItems = useMemo(() => getDefaultItems(t, md), [i18n.language, md]);
  const [items, setItems] = useState(defaultMenuItems);

  const actionsForMenuFunctions: TOnActionParams = useMemo(
    () => [
      { type: "logout", action: () => logout() },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      { type: "link", action: value => navigate(value.toString()) },
      {
        type: "change-account",
        action: value => {
          navigate("/");
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          setAccount(value.toString());
          window.location.reload();
        }
      }
    ],
    []
  );

  useEffect(() => {
    if (!account?.rights) return;

    const newItems = [...defaultMenuItems];

    accounts
      .sort(acc => (acc.current ? 1 : acc.rights[AccountRights.IsJuridical] ? -1 : 0))
      .forEach(acc => {
        newItems.unshift({
          id: acc.number,
          item: acc.rights[AccountRights.IsJuridical] ? (
            <ItemOrganization
              number={getFormattedIBAN(acc.number)}
              name={acc.name}
              active={account.number === acc.number}
            />
          ) : (
            <ItemAccount number={getFormattedIBAN(acc.number)} name={acc.name} active={account.number === acc.number} />
          ),
          action: {
            type: "change-account",
            value: acc.number
          },
          style: {
            backgroundColor: "#FFF",
            borderRadius: "8px",
            marginBottom: "1px"
          }
        });
      });
    setItems(
      !account.rights[AccountRights.IsJuridical]
        ? newItems
        : newItems.filter(i => !(i.id === "investPlatform" || i.id === "partnership"))
    );
  }, [account?.rights, defaultMenuItems]);

  return md ? (
    <HeaderMobile items={items} actions={actionsForMenuFunctions} />
  ) : (
    <HeaderDesktop items={items} actions={actionsForMenuFunctions} />
  );
};

export default Header;
