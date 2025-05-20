import { LayoutDashboardIcon, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

const SidePanel = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
  ];

  // const linkClass = ({ isActive }) =>
  //   `block font-bold px-4 py-2 rounded transition ${
  //     isActive
  //       ? "bg-blue-500 text-white"
  //       : "hover:bg-gray-100 dark:hover:bg-gray-800"
  //   }`;

  return (
    // <Sidebar collapsible="icon">
    <Sidebar>
      {/* <SidebarHeader className="flex items-center justify-center h-20 transition-all duration-300 ">
        <img
          src={collapsed === true ? "/fabicon.png" : "/images/logo.gif"}
          alt="Logo"
          className={collapsed === true ? "h-6 w-6" : "h-16 w-auto"}
        />
      </SidebarHeader> */}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-xl">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={linkClass}>
                    <item.icon />
                    <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidePanel;
