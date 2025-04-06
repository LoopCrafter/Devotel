import { ChangeEvent, FC } from "react";
type Props = {
  handleChangePage: (event: ChangeEvent<HTMLSelectElement>) => void
  perPage: number;
};
export const PageCounts: FC<Props> = ({handleChangePage, perPage}) => {
  return (
    <div className="text-black dark:text-white flex gap-2 items-center justify-center">
      <label>Per Page:</label>
      <select
        className="border border-black dark:border-white p-1 rounded-md"
        onChange={handleChangePage}
        value={perPage}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>5</option>
        <option>10</option>
      </select>
    </div>
  );
};
