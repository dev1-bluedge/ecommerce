"use client"
import { fetchProducts } from "@/app/actions/products";
import { Inventorycolumns } from "@/app/table/columns"
import { InventoryTable } from "@/app/table/inventory-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";


export default  function Page() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error: {error?.message || 'Failed to load products.'}</div>;
  }
  
  if (data?.error) {
    return <div>{data.error}</div>;
  }
  
  if (!data) {
    return <div>No products found.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-4xl text-center mb-3">Your inventory</h1>
    
      <InventoryTable columns={Inventorycolumns} data={data}  />
    </div>
  )
}
