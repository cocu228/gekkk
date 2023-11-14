import { NewHeader } from "@/widgets/new-header/ui/NewHeader";
import { Link, Outlet } from "react-router-dom";

export type NewMoneyLayoutProps = {};
export function NewMoneyLayout({}: NewMoneyLayoutProps) {
  return (
    <div >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            border: '1px solid black'
          }}
        >
          this is place for navigation: <Link style={{
            color: 'blue'
          }} to="/new/money/accounts">Accounts</Link>, <Link style={{
            color: 'blue'
          }} to="/new/money/cards">Cards</Link>
        </div>
        <Outlet />
    </div>
  );
}
