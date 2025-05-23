import { Props } from "./types";

export const InsuranceSelector = ({ options, onSelect }: Props) => {
  return (
    <div className=" p-2 mb-2 lg:mb-2 lg:p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        Select Insurance Type
      </h2>
      <div className="flex flex-col lg:flex-row gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className="flex-grow rounded-md bg-blue-500 dark:bg-dark-surface px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};
