"use client";

import SideNavBar from "../../components/SideNavBar/SideNavBar";

export default function RootLayout({ children }) {
  return <SideNavBar showFilter>{children}</SideNavBar>;
}
