import { ChangeEvent, FC } from "react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export const SearchBar: FC<Props> = ({ search, setSearch }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        className="w-full max-w-md p-2 border rounded-md shadow-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search across all fields..."
      />
    </div>
  );
};