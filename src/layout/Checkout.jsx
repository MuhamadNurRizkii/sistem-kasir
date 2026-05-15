import { useTransaction } from "@/hooks/useTransaction";
import React, { useEffect } from "react";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/ProductList";
import PaymentModal from "@/components/PaymentModal";
import ReceiptPopup from "@/components/ReceiptCard";
import { useProducts } from "@/hooks/useProducts";
import { useInvoice } from "@/hooks/useInvoice";
import { Link } from "react-router";

const Checkout = () => {
  const { subtotal, pajak, total, cart, transactionId } = useTransaction();
  const { getProducts } = useProducts();
  const [display, setDisplay] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const { invoiceData, getInvoiceData } = useInvoice();

  console.log(showReceipt);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (transactionId) {
      getInvoiceData(transactionId);
    }
  }, [transactionId]);
  return (
    <div>
      <div className="flex-1  min-h-0 flex flex-col rounded-md overflow-hidden">
        {/* 1. TITLE: Tambahkan shrink-0 agar tidak terkompres saat list penuh */}
        <div className="p-4 flex justify-between items-center shrink-0">
          <h1 className="text-xl text-center font-bold text-purple-600">
            Pesanan saat ini
          </h1>
          <Link
            to={"/products"}
            className="p-2 bg-purple-100 text-purple-700 rounded-md font-semibold"
          >
            Kembali
          </Link>
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

export default Checkout;
