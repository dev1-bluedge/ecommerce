"use client";

import { fetchOrders } from "@/app/actions/products";
import { columns } from "@/app/table/columns";
import { DataTable } from "@/app/table/data-table";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error: {error?.message || 'Failed to fetch orders.'}</div>;
  }

  if (data?.error) {
    return <div className="text-center py-10 text-red-500">{data.error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-10">No orders found.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-4xl text-center mb-3">Incoming Orders</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
