import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/constants/app";

type MainLayoutProps = {
  children: React.ReactNode;
}

const MainLayout = (prop: MainLayoutProps) => {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <h1 className="px-2 text-lg font-semibold">{APP_NAME}</h1>
        </SidebarHeader>
        <SidebarContent>
          {/* Sidebar navigation will go here */}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-6">{prop.children}</main>
      </SidebarInset>
    </>
  );
}

export default MainLayout
