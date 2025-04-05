import { FC } from "react";

export const FormPage:FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
    <h2 className="text-2xl font-bold dark:text-white">📝 Apply for Insurance</h2>

    <form className="space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
        <input
          type="text"
          className="p-2 rounded border dark:bg-gray-800 dark:text-white"
          placeholder="e.g. John Doe"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Insurance Type</label>
        <select className="p-2 rounded border dark:bg-gray-800 dark:text-white">
          <option>Health</option>
          <option>Car</option>
          <option>Life</option>
          <option>Home</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Submit Application
      </button>
    </form>
  </div>
  )
}
