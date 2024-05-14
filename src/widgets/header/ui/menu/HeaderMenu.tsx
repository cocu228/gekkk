import { useContext, useMemo, useRef, useState } from "react";
import RefreshButton from "@/shared/ui/refresh-button";
import { TPropsHeaderMenu } from "@/widgets/header/model/types";
import { storeAccounts } from "@/shared/store/accounts/accounts";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import DropdownMenuFunctions from "../../model/dropdown-menu-functions";
import { useTranslation } from "react-i18next";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";

const HeaderMenu = ({
  children,
  items,
  className = "",
  actions,
}: TPropsHeaderMenu) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [isActive, toggleActive] = useState(false);
  const getAccounts = storeAccounts((state) => state.getAccounts);
  const dropdownMenuFunctions = useMemo(
    () => new DropdownMenuFunctions(ref, toggleActive, actions),
    [ref]
  );
  const { sm, md, xxxl } = useContext(BreakpointsContext);

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
            <div className="flex justify-between px-2 py-1">
              <span className="text-gray-600" data-testid="Accounts">
                {t("header_menu.accounts")}:
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
                  className={`${styles.DropdownItem} h-full gap-[3%]`}
                  onClick={() => dropdownMenuFunctions.onAction(item.action)}
                >
                  {item.icon}
                  {item.item}
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
