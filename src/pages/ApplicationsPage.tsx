import {
  Columns,
  PageCounts,
  Pagination,
  SearchBar,
  SortableTable,
} from "@/components/pages";
import { useFetchApplications } from "@/hooks";
import { ApplicationSchema } from "@/types/application";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setPerPage,
  setSortColumn,
  setSortDirection,
  setVisibleColumns,
} from "@/store/slices";
import { Button } from "@/components/ui";

export const ApplicationsPage: FC = () => {
  const dispatch = useAppDispatch();

  const { perPage, sortColumn, sortDirection, visibleColumns } = useAppSelector(
    (state) => state.table
  );
  const [showSettings, setShowSettings] = useState(false)
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useFetchApplications();
  const [filteredData, setFilteredData] = useState<
    ApplicationSchema | undefined
  >(undefined);

  useEffect(() => {
    if (data) {
      setFilteredData({ ...data, data: [...data.data] });

      if (visibleColumns.length === 0 && data.columns) {
        dispatch(setVisibleColumns(data.columns));
      }
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;

    let updatedData = [...data.data];

    if (search) {
      updatedData = updatedData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (sortColumn) {
      updatedData.sort((a, b) => {
        const key = sortColumn as keyof typeof a;
        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData((prev) => prev && { ...prev, data: updatedData });
    setCurrentPage(1);
  }, [search, sortColumn, sortDirection, data]);

  const handleChangePage = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPerPage(+event.target.value));
    setCurrentPage(1);
  };

  const paginatedData = useMemo(() => {
    return (
      filteredData?.data.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      ) || []
    );
  }, [perPage, filteredData, currentPage]);


  const handleCloseSettings = ()=>{
    setShowSettings(false)
  }

  const totalPages = filteredData
    ? Math.ceil(filteredData.data.length / perPage)
    : 0;

  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Error: {error}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          📋 Applications
        </h2>
        <PageCounts handleChangePage={handleChangePage} perPage={perPage} />
      </div>

      {showSettings && <Columns columns={data?.columns} close={handleCloseSettings}/>}
      <div className="flex justify-between items-center">
        <SearchBar search={search} setSearch={setSearch} />
        <Button onClick={()=>setShowSettings(true)}>Settings</Button>
      </div>

      <SortableTable
        columns={
          filteredData?.columns.filter((col) => visibleColumns.includes(col)) ||
          []
        }
        data={paginatedData.map((row) =>
          Object.fromEntries(
            Object.entries(row).filter(([key]) => visibleColumns.includes(key))
          )
        )}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={(column) => {
          if (sortColumn === column) {
            dispatch(
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            );
          } else {
            dispatch(setSortColumn(column));
            dispatch(setSortDirection("asc"));
          }
        }}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
