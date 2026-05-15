import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import CardProduct from "@/components/CardProduct";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchCategory } from "@/api/produk";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import ProductList from "@/components/ProductList";
import { useProducts } from "@/hooks/useProducts";
import { useTransaction } from "@/hooks/useTransaction";
import PaymentModal from "@/components/PaymentModal";
import { useInvoice } from "@/hooks/useInvoice";
import ReceiptPopup from "@/components/ReceiptCard";
import { Link } from "react-router";

const Transaction = () => {
  const { subtotal, pajak, total, transactionId } = useTransaction();
  const { loading, products, getProducts, searchProducts } = useProducts();
  const { cart } = useTransaction();
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const { invoiceData, getInvoiceData } = useInvoice();

  const getCategory = async () => {
    const data = await fetchCategory();
    setCategory(data);
  };

  const cariProduk = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      getProducts();
      return;
    }

    await searchProducts(search);
  };

  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  useEffect(() => {
    if (transactionId) {
      getInvoiceData(transactionId);
    }
  }, [transactionId]);

  return (
    <div className="w-full h-screen p-2 flex gap-4 overflow-hidden">
      <Toaster />
      {/* bagian kiri */}
      <div className="flex-2 flex flex-col h-full rounded-md lg:border overflow-hidden">
        {/* title */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-600">Daftar Produk</h1>
          <div className="flex items-center gap-2">
            <Link className="lg:hidden" to={"/products/checkout"}>
              <div
                className={
                  "p-3 relative bg-purple-100 text-purple-700 border rounded-full"
                }
              >
                <ShoppingCart size={24} />
                <span
                  className={`${cart.length === 0 ? "hidden" : "block"} text-white absolute -top-2 -right-2  w-6 h-6 text-center bg-purple-600 rounded-full`}
                >
                  {cart.length}
                </span>
              </div>
            </Link>
            <SidebarTrigger className="md:hidden" />
          </div>
        </div>
        {/* search produk */}
        <div className="p-2">
          <form onSubmit={cariProduk}>
            <Input
              className={
                "max-sm:w-62.5 max-w-xs p-2 border ring-0 mt-2 rounded-md focus:outline-0 focus:border-slate-500"
              }
              id="search_produk"
              name="search_produk"
              placeholder="cari produk"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" className={"ml-2 px-3 bg-purple-600"}>
              cari
            </Button>
          </form>
        </div>
        {/* searchh by category */}
        <div className="w-full flex flex-wrap gap-4 p-3">
          <Badge
            className={
              "py-3 px-4 bg-purple-100 hover:bg-purple-200 hover:cursor-pointer text-purple-700 dark:bg-purple-950 dark:text-purple-300"
            }
            onClick={() => getProducts()}
          >
            semua
          </Badge>
          {category.map((item, index) => (
            <Badge
              className={
                "py-3 px-4 bg-purple-100 hover:bg-purple-200 hover:cursor-pointer text-purple-700 dark:bg-purple-950 dark:text-purple-300"
              }
              key={item.id}
              onClick={() => getProducts(item.id)}
            >
              {item.category_name}
            </Badge>
          ))}
        </div>
        {/* list produk */}
        <div className="w-full flex-1 min-h-0 rounded-md  no-scrollbar overflow-y-auto">
          {loading ? (
            <div className="w-full h-full flex items-center">
              <Spinner className={"size-8 mx-auto"} />
            </div>
          ) : (
            <div className="p-4 max-md:mb-4 grid max-sm:grid-cols-1 grid-cols-3 gap-4">
              {products.length === 0 ? (
                <p className="text-center text-xl text-slate-200">
                  Data Masih Kosong
                </p>
              ) : (
                products.map((product) => (
                  <CardProduct
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    image_url={product.image_url}
                  />
                ))
              )}
            </div>
          )}
        </div>
        {/* button checkout untuk mobile */}
        <div className="w-full lg:hidden">
          <Link to={"/products/checkout"}>
            <Button size="lg" className={"w-full bg-purple-600 py-6 text-lg"}>
              <ShoppingCart className="w-6! h-6!" /> Checkout
            </Button>
          </Link>
        </div>
      </div>

      {/* bagian kanan */}
      {/* list transaksi pesanan */}
      <div className="flex-1 max-md:hidden min-h-0 flex flex-col border rounded-md overflow-hidden">
        {/* 1. TITLE: Tambahkan shrink-0 agar tidak terkompres saat list penuh */}
        <div className="p-4 flex items-center shrink-0">
          <h1 className="text-xl font-bold text-purple-600">
            Pesanan saat ini
          </h1>
        </div>

        {/* 2. DAFTAR KERANJANG: flex-1, min-h-0, overflow-y-auto adalah kunci utamanya */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4  no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex justify-center items-center flex-col gap-2">
              <p className="text-slate-700">Tidak ada transaksi</p>

              <ShoppingCart
                size={100}
                strokeWidth={1}
                className="mt-6 text-slate-700"
              />
            </div>
          ) : (
            cart.map((item) => <ProductList key={item.id} product={item} />)
          )}
        </div>

        {/* 3. PRICE/CHECKOUT: Tambahkan shrink-0 agar tidak tertimpa/menyusut */}
        <div className="p-4 w-full bg-slate-50 border-t border-slate-200 shrink-0 mt-auto">
          {/* subtotal */}
          <div className="flex justify-between mb-2">
            <p className="text-base text-slate-500 font-medium">subtotal</p>
            <p className="text-base text-slate-700">
              Rp. {subtotal.toLocaleString("id-ID")}
            </p>
          </div>
          {/* pajak */}
          <div className="flex justify-between mb-4">
            <p className="text-base text-slate-500 font-medium">PPN 11%</p>
            <p className="text-base text-slate-700">
              Rp. {pajak.toLocaleString("id-ID")}
            </p>
          </div>
          <hr className="border-slate-300 rounded-full mb-4" />
          {/* total */}
          <div className="flex justify-between items-center mb-5">
            <p className="text-base font-bold text-slate-800">total</p>
            <p className="text-lg font-bold text-purple-600">
              Rp. {total.toLocaleString("id-ID")}
            </p>
          </div>
          <Button
            size="lg"
            className={"w-full"}
            onClick={() => setDisplay(true)}
            disabled={cart.length === 0}
          >
            Lanjut Pembayaran
          </Button>
        </div>
      </div>
      {/* pop up pembayaran */}
      <PaymentModal
        display={display}
        setDisplay={setDisplay}
        getProducts={getProducts}
        setShowReceipt={setShowReceipt}
      />
      {/* pop up hasil transaksi */}
      <ReceiptPopup
        data={invoiceData}
        showReceipt={showReceipt}
        setShowReceipt={setShowReceipt}
      />
    </div>
  );
};

export default Transaction;

// tinggal bikin kembalian + logic
// pisah komponen pop up pembayaran
