import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="w-full bg-slate-50">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main className="max-sm:px-2 max-md:px-2 px-6 w-full">
          {/* <SidebarTrigger className={"absolute top-6 -left-2"} /> */}
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
