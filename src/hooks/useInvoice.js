import { InvoiceContext } from "@/context/InvoiceContext";
import { useContext } from "react";

export const useInvoice = () => {
  return useContext(InvoiceContext);
};
