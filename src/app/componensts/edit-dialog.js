import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HandleImageUpload, updateProducts } from '../actions/products';
import { toast } from 'sonner';

function Editdialog({ open, onOpenChange, seletedata }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const state = seletedata.image ? true : false; 

  useEffect(() => {
    if (seletedata && open) {
      reset({
        name: seletedata.name || '',
        amount: seletedata.amount || '',
        description: seletedata.description || '',
        stock: seletedata.stock || '',
        image: '',
      });
    }
  }, [seletedata, open, reset]);

  const getChangedFields = (original, updated) => {
    const changes = {};
    changes._id = original._id;
    for (const key in updated) {
      // For file field
      if (key === "image") {
        if (updated.image?.[0]) changes.image = updated.image[0];
      } else {
        if (updated[key] !== original[key]) {
          changes[key] = updated[key];
        }
      }
    }
    return changes;
  };

  const onSubmit = async (data) => {
    try {
      const changed = getChangedFields(seletedata, data);
      if (changed.image) {
        const result = await HandleImageUpload(changed.image);
        changed.image = result.imageUrl;
      }
      mutation.mutate(changed);
      reset();
      console.log("TCL: after -> changed", changed)

    } catch (error) {
      toast.error(result.message);

    }

  };

  const mutation = useMutation({
    mutationFn: updateProducts,
    onSuccess: () => {
      toast.success("Product updated successfully!");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("name")} placeholder="Product Name" />
          <Input {...register("amount")} placeholder="Amount" type="number" />
          <Textarea {...register("description")} placeholder="Description" />
          <Input {...register("stock")} placeholder="Available stock" type="number" />

          <div className="flex flex-col items-center h-[25vh] border-2 border-dashed border-gray-300 rounded-lg justify-center">
            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
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
                className="lucide lucide-upload"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <span className="text-gray-600 text-sm">
                Click here to upload Image
              </span>
            </label>
            <input id="image-upload" {...register("image")} type="file" className="hidden" />
          </div>




          <div className="flex items-center justify-center">
            <Button type="submit" >{mutation.isPending ? "Saving..." : "Save"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Editdialog;
