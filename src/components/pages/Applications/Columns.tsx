import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setVisibleColumns } from "@/store/slices/table/tableSlice";
import { FC } from "react";
type Props = {
  columns?: string[];
  close: () => void;
};
export const Columns: FC<Props> = ({ columns, close }) => {
  const visibleColumns = useAppSelector((state) => state.table.visibleColumns);
  const dispatch = useAppDispatch();
  const toggleColumn = (col: string) => {
    const isRemoving = visibleColumns.includes(col);
    const remainingCols = visibleColumns.filter((c) => c !== col);

    if (isRemoving && visibleColumns.length === 1) {
      return;
    }
    dispatch(
      setVisibleColumns(
        visibleColumns.includes(col) ? remainingCols : [...visibleColumns, col]
      )
    );
  };
  return (
    <div className="bg-black/50 fixed w-screen h-screen z-100 top-0 right-0   flex flex-row-reverse">
      <div className="w-xs h-screen z-100 bg-white dark:bg-dark-surface top-0 right-0 text-black dark:text-white p-4 flex flex-col gap-2 ">
        <h2 className="text-md dark:text-white text-black">
          Select the columns:
        </h2>
        {columns?.map((col) => (
          <label key={col} className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={visibleColumns.includes(col)}
              disabled={
                visibleColumns.length === 1 && visibleColumns[0] === col
              }
              onChange={() => {
                toggleColumn(col);
              }}
            />
            {col}
          </label>
        ))}
        <Button onClick={close}>Close</Button>
      </div>
    </div>
  );
};
