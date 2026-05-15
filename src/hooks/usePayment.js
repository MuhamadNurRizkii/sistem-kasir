import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createTransaction, insertProduk } from "@/api/transactions";
import { supabase } from "@/supabase/supabase";

export const usePayment = ({
  subtotal,
  pajak,
  total,
  cart,
  setCart,
  setDisplay,
  getProducts,
  setTransactionId,
  setShowReceipt,
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [money, setMoney] = useState(0);
  const [locked, setLocked] = useState(false);

  const change = Math.max(Number(money) - total, 0);

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (Number(money) < total) {
        toast.error("Uang tidak cukup");
        return;
      }

      const invoiceNumber = `INV-${new Date().getTime()}`;

      const datas = {
        invoiceNumber,
        subtotal,
        pajak,
        total,
        paymentMethod,
        money,
        change,
      };

      const result = await createTransaction(datas);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const transaction_Id = result.data[0].id;
      console.log(transaction_Id);
      setTransactionId(transaction_Id);

      // insert transaction items
      await Promise.all(
        cart.map((item) =>
          insertProduk({
            transactionId: transaction_Id,
            productId: item.id,
            qty: item.qty,
            price: item.price,
            subtotal: item.price * item.qty,
          }),
        ),
      );

      // update stock
      await Promise.all(
        cart.map(async (item) => {
          const newStock = Number(item.stock) - Number(item.qty);

          const { error } = await supabase
            .from("product")
            .update({ stock: newStock })
            .eq("id", item.id);

          if (error) {
            console.log(error.message);
          }
        }),
      );

      await getProducts();

      setCart([]);
      setDisplay(false);
      setShowReceipt(true);

      toast.success("Transaksi berhasil!");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentMethod === "qris") {
      setMoney(total);
    } else {
      setMoney(0);
    }
  }, [paymentMethod, total]);

  return {
    loading,
    paymentMethod,
    setPaymentMethod,
    money,
    setMoney,
    locked,
    setLocked,
    change,
    handlePayment,
  };
};
