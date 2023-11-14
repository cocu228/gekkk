import { NewHeader } from "@/widgets/new-header/ui/NewHeader";
import { Link, Outlet } from "react-router-dom";

export type NewLayoutProps = {};
export function NewLayout({}: NewLayoutProps) {
  return (
    <main style={{
        background: 'var(--new-brand-white)',
        position: 'relative',
        minHeight: '100vh',
    }}>
      <NewHeader></NewHeader>
      <div
        style={{
          padding: "24px 20px",
        }}
      >
        
        <Outlet />
      </div>
    </main>
  );
}
