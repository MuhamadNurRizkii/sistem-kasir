import { TransactionContext } from "@/context/TransactionContext";
import { useContext } from "react";

export const useTransaction = () => {
  return useContext(TransactionContext);
};
