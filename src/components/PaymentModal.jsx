import React from "react";
import { useTransaction } from "@/hooks/useTransaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";
import { usePayment } from "@/hooks/usePayment";

const PaymentModal = ({ display, setDisplay, getProducts, setShowReceipt }) => {
  const { subtotal, pajak, total, cart, setCart, setTransactionId } =
    useTransaction();
  const {
    loading,
    paymentMethod,
    setPaymentMethod,
    money,
    setMoney,
    locked,
    setLocked,
    change,
    handlePayment,
  } = usePayment({
    subtotal,
    pajak,
    total,
    cart,
    setCart,
    setDisplay,
    getProducts,
    setTransactionId,
    setShowReceipt,
  });

  return (
    <div
      className={`${display ? "fixed" : "hidden"} max-md:p-2 inset-0 bg-black/10 flex items-center justify-center z-50`}
    >
      <Card className={`w-full relative max-w-md`}>
        <CardHeader>
          <CardTitle className={`text-lg text-center font-semibold mb-2`}>
            Pembayaran
          </CardTitle>
          <X
            onClick={() => setDisplay(false)}
            size={28}
            className="absolute z-30 top-3 right-3 text-red-600"
          />
          <hr className="border-slate-300 rounded-full mb-4" />
        </CardHeader>
        <CardContent>
          {/* subtotal */}
          <div className="flex justify-between mb-2">
            <p className="text-base font-medium">subtotal</p>
            <p className="text-base">Rp. {subtotal.toLocaleString("id-ID")}</p>
          </div>
          {/* pajak */}
          <div className="flex justify-between mb-4">
            <p className="text-base font-medium">PPN 11%</p>
            <p className="text-base">Rp. {pajak.toLocaleString("id-ID")}</p>
          </div>
          {/* metode pembayaran */}
          <div className="mb-4">
            <p className="text-base font-medium mb-4">metode pembayaran</p>
            <RadioGroup
              defaultValue={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="qris" id="qris" />
                <Label htmlFor="qris">Qris</Label>
              </div>
            </RadioGroup>
          </div>
          {/* uang baayar */}
          <div className=" mb-4">
            <div className="flex justify-between mb-4">
              <p className="text-base font-medium">jumlah pembayaran</p>
              <p
                onClick={() => setLocked(false)}
                className="text-base cursor-pointer"
              >
                Rp. {Number(money).toLocaleString("id-ID")}
              </p>
            </div>

            {paymentMethod === "cash" && !locked ? (
              <Input
                type={"number"}
                value={money}
                disabled={locked}
                onChange={(e) => setMoney(e.target.value)}
                onBlur={() => {
                  if (money !== 0) {
                    setLocked(true);
                  }
                }}
                autoFocus={true}
              />
            ) : (
              ""
            )}
          </div>
          <hr className="border-slate-300 rounded-full mb-4" />
          {/* total */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-bold">total</p>
            <p className="text-lg font-bold text-purple-600">
              Rp. {total.toLocaleString("id-ID")}
            </p>
          </div>
          {/* kembalian */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-bold">kembalian</p>
            <p className="text-lg font-bold text-purple-600">
              Rp. {change.toLocaleString("id-ID")}
            </p>
          </div>
          <Button onClick={handlePayment} size="lg" className={"w-full"}>
            {loading ? <Spinner /> : "Bayar Sekarang"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
