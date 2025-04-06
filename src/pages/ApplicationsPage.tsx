import { Pagination, SearchBar, SortableTable } from "@/components/pages";
import { useFetchApplications } from "@/hooks";
import { ApplicationSchema } from "@/types/application";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";

export const ApplicationsPage: FC = () => {
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<keyof ApplicationSchema["data"][0] | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useFetchApplications();
  const [filteredData, setFilteredData] = useState<ApplicationSchema | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setFilteredData({ ...data, data: [...data.data] });
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
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData((prev) => prev && { ...prev, data: updatedData });
    setCurrentPage(1);
  }, [search, sortColumn, sortDirection, data]);

  
  const handleChangePage = (event:ChangeEvent<HTMLSelectElement>)=>{
    const number = event.target.value;
    setPerPage(+number)
    setCurrentPage(1)
  }
  const paginatedData = useMemo(() => {
    return filteredData?.data.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    ) || [];
  }, [perPage,filteredData])
  const totalPages = filteredData ? Math.ceil(filteredData.data.length / perPage) : 0;

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>;


  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center">

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📋 Applications</h2>
      <div className="text-black dark:text-white flex gap-2 items-center justify-center">
          <label>Per Page:</label>
          <select className="border border-black dark:border-white p-1 rounded-md" onChange={handleChangePage} value={perPage}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>5</option>
            <option>10</option>
          </select>
      </div>
      </div>
      <SearchBar search={search} setSearch={setSearch} />
      <SortableTable
        columns={filteredData?.columns || []}
        data={paginatedData}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={(column) => {
          if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          } else {
            setSortColumn(column);
            setSortDirection("asc");
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