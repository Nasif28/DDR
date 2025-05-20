import React from "react";
import DataTable from "./components/DataTable";
import { columns } from "./components/columns";
import { SidebarProvider } from "./components/ui/sidebar";
import SidePanel from "./components/SidePanel";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <SidebarProvider>
        <SidePanel />

        <div className="flex flex-col flex-1 min-w-0">
          <Navbar />
          <main className="p-4 overflow-y-auto ">
            <DataTable columns={columns} />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default App;
