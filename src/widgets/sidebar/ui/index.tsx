import { useContext } from "react";

import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";

import SidebarMobile from "./mobile";
import SidebarDesktop from "./desktop";

// Displayed only at GKK/GKW
const Sidebar = () => {
  const { md } = useContext(BreakpointsContext);

  return md ? <SidebarMobile /> : <SidebarDesktop />;
};

export default Sidebar;
