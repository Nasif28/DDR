import ThemeToggle from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4  bg-gray-200 dark:bg-gray-800 ">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
      </div>

      <div className=" mx-auto  p-4">
        <h1 className="text-2xl font-bold mb-2">DDR Table</h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
