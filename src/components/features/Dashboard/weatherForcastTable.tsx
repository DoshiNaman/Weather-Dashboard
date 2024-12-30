import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type WeatherDataType = {
  date: string;
  temperature_2m_max: number | null;
  apparent_temperature_max: number | null;
  temperature_2m_mean: number | null;
  apparent_temperature_mean: number | null;
  temperature_2m_min: number | null;
  apparent_temperature_min: number | null;
};

export const columns: ColumnDef<WeatherDataType>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "temperature_2m_max",
    header: "Temperature 2m Max",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("temperature_2m_max") != null
          ? (row.getValue("temperature_2m_max") as number).toFixed(2)
          : row.getValue("temperature_2m_max")}
      </div>
    ),
  },
  {
    accessorKey: "apparent_temperature_max",
    header: "Apparent Temperature Max",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("apparent_temperature_max") != null
          ? (row.getValue("apparent_temperature_max") as number).toFixed(2)
          : row.getValue("apparent_temperature_max")}
      </div>
    ),
  },
  {
    accessorKey: "temperature_2m_mean",
    header: "Temperature 2m Mean",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("temperature_2m_mean") != null
          ? (row.getValue("temperature_2m_mean") as number).toFixed(2)
          : row.getValue("temperature_2m_mean")}
      </div>
    ),
  },
  {
    accessorKey: "apparent_temperature_mean",
    header: "Apparent Temperature Mean",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("apparent_temperature_mean") != null
          ? (row.getValue("apparent_temperature_mean") as number).toFixed(2)
          : row.getValue("apparent_temperature_mean")}
      </div>
    ),
  },
  {
    accessorKey: "temperature_2m_min",
    header: "Temperature 2m Min",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("temperature_2m_min") != null
          ? (row.getValue("temperature_2m_min") as number).toFixed(2)
          : row.getValue("temperature_2m_min")}
      </div>
    ),
  },
  {
    accessorKey: "apparent_temperature_min",
    header: "Apparent Temperature Min",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("apparent_temperature_min") != null
          ? (row.getValue("apparent_temperature_min") as number).toFixed(2)
          : row.getValue("apparent_temperature_min")}
      </div>
    ),
  },
];

const WeatherForcastTable = ({
  data,
  pageSize,
  setPageSize,
  loader,
  setLoader,
}: {
  data: WeatherDataType[];
  pageSize: number;
  setPageSize: any;
  loader: boolean;
  setLoader: any;
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const currentPage = table.getState().pagination.pageIndex + 1; // Pages are 0-indexed
  const totalPages = table.getPageCount();

  return (
    <>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Temperature Insights</CardTitle>
            <CardDescription>
              Explore daily temperature stats, including max, mean, and min
              values.
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="md:ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4 gap-1">
            <div className="flex-1 text-sm text-muted-foreground max-md:text-[10px]">
              You are on page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-1 items-center">
              <Select
                value={pageSize.toString()}
                onValueChange={(value: string) => {
                  setLoader(true);
                  setPageSize(parseInt(value));
                  setTimeout(() => {
                    setLoader(false);
                  }, 1000);
                }}
              >
                <SelectTrigger className="w-auto h-8">
                  <SelectValue placeholder="Select a page size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rows per page</SelectLabel>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WeatherForcastTable;
