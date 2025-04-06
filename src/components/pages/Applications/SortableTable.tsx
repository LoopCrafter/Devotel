import { FC } from "react";

type RowData = {
  [key: string]: string | number | null;
};

type Props = {
  columns: string[];
  data: RowData[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
};

export const SortableTable: FC<Props> = ({
  columns,
  data,
  sortColumn,
  sortDirection,
  onSort,
}) => {
  return (
    <div className="overflow-auto rounded-lg shadow-md">
      <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            {columns.map((column) => (
              <th
                key={column}
                className="p-2 border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 whitespace-nowrap"
                onClick={() => onSort(column)}
              >
                {column}
                <span className="ml-1">
                  {sortColumn === column ? (
                    sortDirection === "asc" ? "↑" : "↓"
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 text-sm">↕</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item.id ?? idx}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="p-2 border border-gray-200 dark:border-gray-700 whitespace-nowrap text-center"
                >
                  {item[col] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
