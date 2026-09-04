const Table = ({
    columns = [],
    data = [],
    emptyMessage = "No data found",
    onView,
    onEdit,
    onDelete
}) => {
    const allColumns = [
        ...columns,
        {
            key: "actions",
            label: "Actions",
            render: (item) => {
                const staffId = item?._id || item?.id;

                return (
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                console.log("Full item:", item);
                                console.log("Staff ID:", staffId);
                                console.log("ID type:", typeof staffId);
                                onView?.(staffId);
                            }}
                            className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                        >
                            View
                        </button>
                        <button
                            onClick={() => onEdit?.(staffId)}
                            className="rounded bg-green-500 px-3 py-1 text-sm text-white"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete?.(staffId)}
                            className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                        >
                            Delete
                        </button>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {allColumns.map((column) => (
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
                            <tr key={item?._id || item?.id || item?.email || index}>
                                {allColumns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`whitespace-nowrap px-6 py-4 ${
                                            column.className || ""
                                        }`}
                                    >
                                        {column.render
                                            ? column.render(item, index)
                                            : item?.[column.key] ?? "-"}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={allColumns.length}
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
