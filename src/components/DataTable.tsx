import React from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row?: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No data available</div>
        <div className="text-gray-500 text-sm">No records found for this category</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={row._id || index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {column.render 
                    ? column.render(row[column.key], row)
                    : (row[column.key] || '-')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;