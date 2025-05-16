"use client";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = [
  {
    accessorKey: "user.firstName",
    header: "Name",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "totalAmount",
    header: "Order amount",
  },
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status");

       const statusClass =
      status === "pending"
        ? "bg-yellow-200 text-yellow-800"
        : status === "processing"
        ? "bg-blue-200 text-blue-800"
        : status === "completed"
        ? "bg-green-200 text-green-800"
        : status === "cancelled"
        ? "bg-red-200 text-red-800"
        : "bg-gray-200 text-gray-800";

    return (
      <Badge className={`rounded-full text-sm font-medium  ${statusClass}`}>
        {status}
      </Badge>
    );
  },
}

];
export const Inventorycolumns = [
  {
    accessorKey: "image", // Fixed typo
    header: "Product Image",
    cell: ({ row }) => (
      <Image
        src={row?.original?.image}
        alt="Product Image"
        height={50}
        width={50}
        priority={true}
        style={{
          objectFit:'cover'
        }}
        className="w-26 h-16 rounded-xl"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
