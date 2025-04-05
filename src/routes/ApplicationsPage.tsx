import { FC } from "react";

export const  ApplicationsPage:FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold dark:text-white">📋 Applications</h2>
        <button className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded cursor-pointer">
          Select Columns
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full table-auto border-collapse dark:text-white">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Insurance Type</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">28</td>
              <td className="p-2 border">Health</td>
              <td className="p-2 border">New York</td>
              <td className="p-2 border">Pending</td>
            </tr>
            <tr className="border-t">
              <td className="p-2 border">Jane Smith</td>
              <td className="p-2 border">32</td>
              <td className="p-2 border">Life</td>
              <td className="p-2 border">LA</td>
              <td className="p-2 border">Approved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
