"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { PiDotsThreeCircleLight } from "react-icons/pi";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateOrderStatus } from "../actions/products";

export function DataTable({ columns, data }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);

  const mutation = useMutation({
    mutationFn: async ({ status, id }) => {
      try {
        const result = await updateOrderStatus({ status, id });
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(error.message || "Status not updated");
    },
  });

  const previewColumn = {
    id: "preview",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-center gap-10">
        <button
          onClick={() => handlePreview(row.original)}
          className="text-black hover:underline "
        >
          <Eye className="w-5 h-5" />
        </button>
        <button className="text-black hover:underline ">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="text-black hover:underline">
                <PiDotsThreeCircleLight className="w-5 h-5" />
              </MenubarTrigger>
              <MenubarContent>
                {[
                  "pending",
                  "processing",
                  "completed",
                  "cancelled",
                  "shipped",
                ].map((status) => (
                  <MenubarItem
                    key={status}
                    onClick={() =>
                      mutation.mutate({ status: status, id: row.original._id })
                    }
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </button>
      </div>
    ),
  };

  const updatedColumns = [...columns, previewColumn];

  const table = useReactTable({
    data,
    columns: updatedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handlePreview(rowData) {
    setOpen(true);
    setSelectedOrder(rowData);
    // Add your preview logic here
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={updatedColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="bg-white rounded-xl">
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center justify-between">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedOrder?.user?.firstName}{" "}
                    {selectedOrder?.user?.lastName}
                  </p>
                  <p>
                    <span
                      className={`ml-2 px-3 py-1 rounded-md text-sm font-medium ${
                        selectedOrder?.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : selectedOrder?.status === "processing"
                          ? "bg-blue-200 text-blue-800"
                          : selectedOrder?.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {selectedOrder?.status}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-[70%]">
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {selectedOrder?.user?.address},{" "}
                      {selectedOrder?.user?.city},{" "}
                      {selectedOrder?.user?.country}
                    </p>
                  </div>
                  <p>{selectedOrder?.user?.contact}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Products
                </h3>
                <ScrollArea className={"w-full h-[30vh]"}>
                  <div className="mt-3 max-h-60 overflow-y-auto border rounded-md p-2 bg-gray-50">
                    <ul className="divide-y divide-gray-300">
                      {selectedOrder?.items?.map((item, idx) => (
                        <li key={idx} className="p-3">
                          <div className="flex justify-between items-center">
                            <p className="text-gray-900 font-medium">
                              {item.productId?.name || "Unknown Product"}
                            </p>
                            <p className="text-gray-600">x {item.quantity}</p>
                          </div>
                          <p className="text-gray-600 mt-1">
                            Price: Rs. {item.productId?.amount || "N/A"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollArea>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xl font-bold text-gray-800">
                    Total: Rs. {selectedOrder?.totalAmount}
                  </p>
                  <div className="flex gap-3">
                    <Button className="bg-red-600 text-white hover:bg-red-700">
                      Decline
                    </Button>
                    <Button className="bg-green-600 text-white hover:bg-green-700">
                      Accept
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
