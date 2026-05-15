import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { Plus, ScrollText } from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar variant="floating">
      <SidebarHeader className={`bg-white/50`}>
        <h1 className="mt-2 text-center text-purple-600 text-xl font-semibold">
          Sistem Kasir
        </h1>
      </SidebarHeader>
      <SidebarContent className={`bg-white/50`}>
        <SidebarGroup className={`mt-16`}>
          <SidebarMenuItem>
            <Link
              to={"/products/add"}
              className={`${location.pathname === "/products/add" ? "text-purple-600 font-semibold" : "flex gap-2"} `}
            >
              <SidebarMenuButton>
                <Plus /> Tambah Produk
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              to={"/products"}
              className={`${location.pathname === "/products" ? "text-purple-600 font-semibold" : "flex gap-2"} `}
            >
              <SidebarMenuButton>
                <ScrollText /> Transaksi
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
