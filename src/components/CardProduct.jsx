import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/hooks/useTransaction";

const CardProduct = ({ id, name, price, stock, image_url, category }) => {
  const { addToCart } = useTransaction();
  return (
    <Card id={id} className="relative mx-auto w-full max-w-sm pt-0">
      {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
      <div className="p-2">
        <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-100">
          <img
            src={image_url}
            alt="product"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <CardHeader>
        {/* <CardAction>
                  <Badge variant="secondary">Featured</Badge>
                </CardAction> */}
        <CardTitle>{name}</CardTitle>
        <CardDescription className={"flex mt-4 justify-between"}>
          <p>Rp. {price.toLocaleString("id-ID")}</p>
          <p>stok: {stock}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => addToCart({ id, name, price, stock, image_url })}
          className="w-full"
          disabled={stock === 0}
        >
          {stock > 0 ? "Tambah" : "Kosong"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
