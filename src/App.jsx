import React from "react";
import DataTable from "./components/DataTable";
import { columns } from "./components/columns";

const App = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">DDR Table</h1>
      <DataTable columns={columns} />
    </div>
  );
};

export default App;
