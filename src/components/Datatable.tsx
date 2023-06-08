import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";
import { IconExclamationTriangle } from "./Icons/Outline";
import Loader from "./Loader";
import Pagination from "./Pagination";

export type Column<T> = {
  label: string;
  headerClassName?: string;
  cell: (data: T) => ReactNode;
};

interface RowSpanProps extends PropsWithChildren {
  length: number;
}

const RowSpan = ({ length, children }: RowSpanProps) => {
  return (
    <tr className="relative block p-2 text-center lg:table-row">
      <td colSpan={length} className="py-sm">
        {children}
      </td>
    </tr>
  );
};

const DataCell = ({ label, render }: { label: string; render: ReactNode }) => {
  return (
    <td
      data-title={label}
      className="flex items-center justify-between whitespace-nowrap before:text-xs before:uppercase before:text-gray-500 before:content-[attr(data-title)] md:table-cell md:py-4 md:before:content-[]"
    >
      {render}
    </td>
  );
};

interface DataRowProps<T> {
  data: T;
  columns: Column<T>[];
}

export const DataRow = <T extends {}>({ columns, data }: DataRowProps<T>) => {
  return (
    <tr className="relative block p-2 text-center md:table-row">
      {columns.map(({ label, cell }, key) => (
        <DataCell key={key} label={label} render={cell(data)} />
      ))}
    </tr>
  );
};

interface DataTableProps<T> {
  loading?: boolean;
  columns: Column<T>[];
  data?: T[];
  limit?: number;
  total?: number;
}

export const DataTable = <T extends {}>({
  loading,
  columns,
  data,
  limit,
  total,
}: DataTableProps<T>) => {
  return (
    <table className="w-full table-auto">
      <thead className="hidden bg-slate-600 text-xs uppercase text-white md:table-row-group">
        <tr>
          {columns.map(({ label, headerClassName }, key) => (
            <th
              key={key}
              className={clsx("font-medium tracking-wide", headerClassName)}
            >
              <span className="flex items-center justify-center p-4">
                {label}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block divide-y divide-dashed text-sm md:table-row-group">
        {loading && (
          <RowSpan length={columns.length}>
            <Loader className="mx-auto h-10 w-10" />
          </RowSpan>
        )}

        {data && !data.length && (
          <RowSpan length={columns.length}>
            <div className="mt-4 text-center text-slate-300">
              <IconExclamationTriangle className="mx-auto h-10 w-10" />
              <h2 className="text-sm font-extrabold uppercase">
                Nothing to display
              </h2>
            </div>
          </RowSpan>
        )}

        {data?.map((row, key) => (
          <DataRow key={key} columns={columns} data={row} />
        ))}
      </tbody>
      {!!limit && !!total && (
        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <Pagination limit={limit} totalItems={total} />
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};
