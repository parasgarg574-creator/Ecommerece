import React from "react";
const Table = ({ columns = [], data = [], emptyMessage = "No data found" }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={item.id || item.email || index}>
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`whitespace-nowrap px-6 py-4 ${column.className || ""}`}
                                    >
                                        {column.render
                                            ? column.render(item, index)
                                            : item[column.key] ?? "-"}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-8 text-center text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default Table;