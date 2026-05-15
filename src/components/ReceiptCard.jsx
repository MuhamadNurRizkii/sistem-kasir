import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Printer } from "lucide-react";

export default function ReceiptPopup({ data, showReceipt, setShowReceipt }) {
  // Jika data kosong atau tidak ada, jangan render apa pun
  if (!data || data.length === 0) return null;

  // Mengambil informasi global transaksi dari item pertama
  const transactionInfo = data[0];

  // Helper untuk format Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AlertDialog open={showReceipt} onOpenChange={setShowReceipt}>
      {/* Isi Pop Up (Struk) */}
      <AlertDialogContent
        className={`max-w-sm font-mono text-sm sm:max-w-sm bg-white text-gray-800`}
      >
        <AlertDialogHeader className="text-center pb-2 relative">
          <AlertDialogTitle className="text-xl w-full text-center font-bold tracking-widest">
            STRUK PEMBELIAN
          </AlertDialogTitle>
          <div className="w-full text-muted-foreground mt-2 flex flex-col items-center space-y-1">
            <span className="text-center">
              No: {transactionInfo.invoice_number}
            </span>
            <Badge className="uppercase bg-green-200 text-green-600 font-semibold border px-2 py-0.5 rounded-full text-xs">
              {transactionInfo.payment_method}
            </Badge>
          </div>
          <X
            onClick={() => setShowReceipt(false)}
            className="absolute text-red-600 cursor-pointer z-20 -top-2.5 -right-2.5"
          />
        </AlertDialogHeader>

        <div className="pb-2">
          {/* List Produk */}
          <div className="space-y-4">
            {data.map((item, index) => {
              const unitPrice = item.subtotal_product / item.qty;

              return (
                <div key={index} className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      {item.qty} x {formatRupiah(unitPrice)}
                    </span>
                    <span className="text-foreground font-medium">
                      {formatRupiah(item.subtotal_product)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <Separator className="my-4 border-dashed border-2 bg-transparent" />

          {/* Ringkasan Biaya */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatRupiah(transactionInfo.subtotal_transaction)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pajak</span>
              <span>{formatRupiah(transactionInfo.tax)}</span>
            </div>
          </div>
        </div>

        {/* Total & Pembayaran */}
        <div className="flex-col pt-0 space-y-4">
          <Separator className="border-dashed border-2 bg-transparent mb-2" />

          <div className="w-full space-y-1">
            <div className="flex justify-between text-lg font-bold">
              <span>TOTAL</span>
              <span>{formatRupiah(transactionInfo.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dibayar</span>
              <span>{formatRupiah(transactionInfo.cash_paid)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kembali</span>
              <span>{formatRupiah(transactionInfo.change_amount)}</span>
            </div>
          </div>

          <Separator className="border-dashed border-2 bg-transparent mt-4" />

          <p className="text-xs text-center text-muted-foreground mt-2 w-full">
            Terima kasih atas kunjungan Anda!
          </p>
        </div>
        <div className="mt-2 flex justify-center">
          <Button className="w-full">
            <Printer /> Cetak Struk
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
