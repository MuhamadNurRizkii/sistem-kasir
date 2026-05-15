import { supabase } from "@/supabase/supabase";

// tambah produk ke transaction
export const createTransaction = async (datas) => {
  const {
    invoiceNumber,
    subtotal,
    pajak,
    total,
    paymentMethod,
    money,
    change,
  } = datas;

  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        invoice_number: invoiceNumber,
        subtotal: subtotal,
        tax: pajak,
        total: total,
        payment_method: paymentMethod,
        cash_paid: money,
        change_amount: change,
      },
    ])
    .select("id");

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "success", data };
};

// masukkan produk ke transaction items
export const insertProduk = async (datas) => {
  const { transactionId, productId, qty, price, subtotal } = datas;

  const { data, error } = await supabase
    .from("transaction_items")
    .insert([
      {
        transaction_id: transactionId,
        product_id: productId,
        qty: qty,
        price: price,
        subtotal: subtotal,
      },
    ])
    .select("id");

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data, message: "Transaksi Berhasil!" };
};

// ambil data invoice
export const getDataTransaction = async (id) => {
  const { data, error } = await supabase
    .from("transaction_items")
    .select(
      `
      qty,
      subtotal,
      transactions (
        invoice_number,
        subtotal,
        tax,
        total,
        payment_method,
        cash_paid,
        change_amount
      ),
      product (
        name
      )
    `,
    )
    .eq("transaction_id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  console.log("data: ", data);

  const formattedData = data.map((item) => ({
    invoice_number: item.transactions.invoice_number,

    name: item.product.name,

    qty: item.qty,

    subtotal_product: item.subtotal,

    subtotal_transaction: item.transactions.subtotal,

    tax: item.transactions.tax,

    total: item.transactions.total,

    payment_method: item.transactions.payment_method,

    cash_paid: item.transactions.cash_paid,

    change_amount: item.transactions.change_amount,
  }));

  return {
    success: true,
    data: formattedData,
  };
};
