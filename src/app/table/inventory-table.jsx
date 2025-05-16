"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiDotsThreeCircle } from "react-icons/pi";
import {
  addProducts,
  deleteProducts,
  fetchCatagory,
  HandleImageUpload,
} from "../actions/products";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import Editdialog from "../componensts/edit-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InventoryTable({ columns, data }) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [editState, setEditState] = useState(false);

  const [addProductModel, setAddProductModel] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const previewColumn = {
    id: "preview",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-black hover:underline relative">
            <PiDotsThreeCircle className="w-6 h-6" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handlePreview(row.original)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setEditState(true);
                setSelectedOrder(row.original);
              }}
            >
              Edit
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteMutation.mutate(row.original._id);
              }}
            >
              Delete
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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
  }

  const mutation = useMutation({
    mutationFn: addProducts,
    onSuccess: () => {
      toast.success("Product added successfully!");
      setAddProductModel(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
  const onSubmit = async (data) => {
    const result = await HandleImageUpload(data.image[0]);
    if (result.imageUrl) {
      data.image = result.imageUrl;
      console.log("after update object", data);
      mutation.mutate(data);
      reset();
      setAddProductModel(false);
    } else {
      toast.error(result.message);
    }
  };

  // catagory
  const catagory = useQuery({
    queryKey: ["catagory"],
    queryFn: fetchCatagory,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Products({data.length})
        </h1>
        <Button onClick={() => setAddProductModel(true)}>Add Product</Button>
      </div>

      {/* Table Section */}
      <Table className="bg-white rounded-xl border shadow-sm mt-4">
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
                className="hover:bg-gray-50 transition"
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
                className="text-center py-8 text-gray-500"
              >
                🚫 No products found. Add your first product to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Product Detail Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 text-gray-700">
              {selectedOrder.image ? (
                <Image
                  src={selectedOrder.image}
                  alt="Product Image"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full h-60"
                />
              ) : (
                <p>No image available</p>
              )}
              <div>
                <span className="font-semibold">Product Name:</span>{" "}
                <p>{selectedOrder.name}</p>
              </div>
              <div>
                <span className="font-semibold">Description:</span>{" "}
                <p>{selectedOrder.description}</p>
              </div>
              <div>
                <span className="font-semibold">Amount:</span>{" "}
                <p>${selectedOrder.amount}</p>
              </div>
              <div>
                <span className="font-semibold">Stock:</span>{" "}
                <p>{selectedOrder.stock}</p>
              </div>
              <div>
                <span className="font-semibold">Created:</span>{" "}
                <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={addProductModel} onOpenChange={setAddProductModel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Product Name
              </label>
              <Input
                {...register("name", { required: "Product name is required" })}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue={"category"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {catagory.data && catagory.data.length > 0 ? (
                    catagory.data.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="No catagory">
                      Not found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-600 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Price</label>
              <Input
                {...register("price", { required: "price is required" })}
                type="number"
                placeholder="Enter amount"
              />
              {errors.price && (
                <p className="text-red-600 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Sell price
              </label>
              <Input
                {...register("Sellprice", {
                  required: "Sell price is required",
                })}
                type="number"
                placeholder="Enter amount"
              />
              {errors.Sellprice && (
                <p className="text-red-600 text-sm">
                  {errors.Sellprice.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="text-red-600 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Available Stock
              </label>
              <Input
                {...register("stock", { required: "Stock is required" })}
                type="number"
                placeholder="Enter stock"
              />
              {errors.stock && (
                <p className="text-red-600 text-sm">{errors.stock.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <div className="flex flex-col items-center justify-center h-30 border-2 border-dashed rounded-lg hover:border-blue-500 transition cursor-pointer bg-gray-50">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-upload-icon lucide-upload"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  <span className="text-sm text-gray-600">Click to upload</span>
                </label>
                <input
                  id="image-upload"
                  {...register("image", { required: "Select an image" })}
                  type="file"
                  className="hidden"
                />
              </div>
              {errors.image && (
                <p className="text-red-600 text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={mutation.isLoading}>
                {mutation.isPending ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Editdialog
        open={editState}
        onOpenChange={setEditState}
        seletedata={selectedOrder}
      />
    </div>
  );
}
