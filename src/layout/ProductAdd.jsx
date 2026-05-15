import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@base-ui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertProduk } from "@/api/produk";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const ProductAdd = () => {
  const [namaProduk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [kategori, setKategori] = useState("");
  const navigate = useNavigate();

  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = e.target.upload_gambar.files[0];

    const body = {
      namaProduk: namaProduk,
      harga: harga,
      stok: stok,
      kategori: kategori,
    };

    const result = await insertProduk(body, fileInput);

    console.log(result);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      navigate("/products");
    }

    setNamaProduk("");
    setHarga(0);
    setStok(0);
    setKategori("");
    fileRef.current.value = "";
  };

  console.log({ namaProduk, harga, stok, kategori });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster />
      <Card className={"w-full max-w-md"}>
        <CardHeader className={"text-center text-xl font-semibold"}>
          Tambah Produk
        </CardHeader>
        <CardContent>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="nama_produk">nama produk</Label>
              <Input
                className={`w-full p-2 border ring-0 mt-2 rounded-md focus:outline-0 focus:border-slate-500`}
                id="nama_produk"
                name="nama_produk"
                value={namaProduk}
                onChange={(e) => setNamaProduk(e.target.value)}
                placeholder="nama produk"
                autoComplete="off"
              />
            </div>

            <div className="flex mb-4 gap-2">
              <div className="">
                <Label htmlFor="harga">harga</Label>
                <Input
                  type="number"
                  className={`w-full p-2 border ring-0 mt-2 rounded-md focus:outline-0 focus:border-slate-500`}
                  id="harga"
                  name="harga"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  placeholder="harga"
                  autoComplete="off"
                />
              </div>
              <div className="">
                <Label htmlFor="stok">stok</Label>
                <Input
                  type="number"
                  className={`w-full p-2 border ring-0 mt-2 rounded-md focus:outline-0 focus:border-slate-500`}
                  id="stok"
                  name="stok"
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                  placeholder="stok"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="mb-4">
              <Select
                value={kategori}
                onValueChange={(value) => setKategori(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>kategori</SelectLabel>
                    <SelectItem value="makanan">makanan</SelectItem>
                    <SelectItem value="minuman">minuman</SelectItem>
                    <SelectItem value="ice cream">ice cream</SelectItem>
                    <SelectItem value="pastry">pastry</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="upload_gambar">upload gambar</Label>
              <Input
                type="file"
                className={`w-full p-2 border ring-0 mt-2 rounded-md focus:outline-0 focus:border-slate-500`}
                id="upload_gambar"
                name="upload_gambar"
                ref={fileRef}
              />
            </div>

            <Button type="submit" size="lg" className={"w-full"}>
              Tambah
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductAdd;
