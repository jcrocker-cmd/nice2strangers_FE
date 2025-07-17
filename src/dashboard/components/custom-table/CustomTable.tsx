import React, { useState, useMemo } from 'react';

interface Column {
  field: string;
  label: string;
}

interface CustomTableProps {
  data: any[];
  columns: Column[];
  title?: string;
  pageSizeOptions?: number[];
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  title = 'Data Table',
  pageSizeOptions = [2, 5, 10, 20],
}) => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const filteredRows = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((field) =>
        field?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [data, searchText]);

  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded w-1/2"
          value={searchText}
          onChange={handleSearchChange}
        />

        <div className="flex items-center gap-2">
          <label htmlFor="pageSize">Rows per page:</label>
          <select
            id="pageSize"
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.field} className="p-2 border">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, index) => (
            <tr key={row.id || index} className="text-center hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.field} className="p-2 border">
                  {row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
