import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/hooks/useTransaction";

const ProductList = ({ product }) => {
  const { incrementQty, decrementQty } = useTransaction();
  return (
    <Card className="flex mb-2 flex-row items-center gap-18 p-2 shadow-sm hover:shadow-md transition-shadow">
      {/* Padding bawaan dihilangkan agar sejajar dengan parent */}
      <CardHeader className="p-0">
        <Avatar className="h-14 w-14 border">
          <AvatarImage
            src={product?.image_url}
            alt={product?.name}
            className="object-cover"
          />
        </Avatar>
      </CardHeader>

      {/* flex-1 agar teks mengisi sisa ruang yang ada */}
      <CardContent className="p-0 flex-1">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-base text-slate-800 dark:text-slate-100 line-clamp-2">
              {product?.name}
            </h3>
            <p className="text-sm font-semibold text-purple-600">
              Rp {(product.price * product.qty).toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex relative top-2.5 items-center gap-1">
            <Button
              variant="outline"
              onClick={() => decrementQty(product.id)}
              disabled={product.qty === 0}
              className={`h-6 w-6 p-0 rounded-full border-slate-300 text-slate-600`}
            >
              -
            </Button>

            <p className="text-base font-medium w-5 text-center">
              {product.qty}
            </p>

            <Button
              onClick={() => incrementQty(product.id)}
              className="h-6 w-6 p-0 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              +
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
