import { getDataTransaction } from "@/api/transactions";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(null);

  const getInvoiceData = async (id) => {
    try {
      const data = await getDataTransaction(id);
      console.log(data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setInvoiceData(data.data);
    } catch (error) {
      toast.error(error.message || "Terjadi kesalahan");
    }
  };

  return (
    <InvoiceContext.Provider value={{ invoiceData, getInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};
