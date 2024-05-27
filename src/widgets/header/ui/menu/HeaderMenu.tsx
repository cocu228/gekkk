import { useContext, useEffect, useMemo, useRef, useState } from "react";
import RefreshButton from "@/shared/ui/refresh-button";
import { TPropsHeaderMenu } from "@/widgets/header/model/types";
import { storeAccounts } from "@/shared/store/accounts/accounts";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import DropdownMenuFunctions from "../../model/dropdown-menu-functions";
import { useTranslation } from "react-i18next";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { CtxRootData } from "@/processes/RootContext";

// TODO: visual fixes
const HeaderMenu = ({
  children,
  items,
  className = "",
  actions,
  onStateChange = () => {}
}: TPropsHeaderMenu) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const { account } = useContext(CtxRootData);
  const { md } = useContext(BreakpointsContext);
  const [isActive, toggleActive] = useState(false);
  const getAccounts = storeAccounts((state) => state.getAccounts);
  const dropdownMenuFunctions = useMemo(() =>
    new DropdownMenuFunctions(ref, toggleActive, actions),
    [ref]
  );

  useEffect(() => {
    onStateChange(isActive);
  }, [isActive]);

  return (
    <>
      <div
        ref={ref}
        onClick={dropdownMenuFunctions.onOpen}
        className={className + " flex items-center cursor-pointer h-full"}
      >
        <div
          className={`wrapper relative ${
            !md && "md:pl-14 pl-7"
          }   md:pr-0  pr-7 min-w-[250px] ${isActive ? "active" : ""}`}
        >
          {children}
          <div className={`${styles.DropdownMenu} ${isActive ? "active" : ""}`}>
            <div className="flex justify-end items-center gap-2 px-2 py-1">
              <span className="text-[var(--gek-additional)] md:text-[12px] font-semibold" data-testid="Accounts">
                {t("update")}
              </span>

              <RefreshButton
                calloutFunc={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  getAccounts(true);
                }}
              />
            </div>
            {items.map((item, i) => {
              if (!item || (!md && item.id === "logout")) return null;

              return (
                <button
                  style={item.style}
                  key={"ItemMenu_" + i}
                  className={`${styles.DropdownItem} ${item.id === account?.number ? styles.SelectedAccount : ""} h-full gap-[3%]`}
                  onClick={() => dropdownMenuFunctions.onAction(item.action)}
                >
                  {item.icon && <div>{item.icon}</div>}
                  <span className="text-[var(--gek-dark-blue)] w-full">{item.item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
