import { Props } from "./types";

  export const InsuranceSelector = ({ options, onSelect }: Props) => {
    return (
      <div className=" p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Select Insurance Type</h2>
        <div className="flex gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {option.title}
            </button>
          ))}
        </div>
      </div>
    );
  };