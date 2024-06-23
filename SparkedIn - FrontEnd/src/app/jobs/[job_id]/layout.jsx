"use client";

import { Inter } from "next/font/google";
import SideNavBar from "../../../components/SideNavBar/SideNavBar";

export default function RootLayout({ children }) {
  return <SideNavBar>{children}</SideNavBar>;
}
