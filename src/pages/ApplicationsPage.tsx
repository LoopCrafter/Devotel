import { Pagination, SearchBar, SortableTable } from "@/components/pages/Applications";
import { useFetchApplications } from "@/hooks";
import { ApplicationSchema } from "@/types/application";
import { FC, useEffect, useState } from "react";

export const ApplicationsPage: FC = () => {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof ApplicationSchema["data"][0] | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

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

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>;

  const paginatedData = filteredData?.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];
  const totalPages = filteredData ? Math.ceil(filteredData.data.length / itemsPerPage) : 0;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📋 Applications</h2>
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