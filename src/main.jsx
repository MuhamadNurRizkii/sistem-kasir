import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import ProductAdd from "./layout/ProductAdd";
import Transaction from "./layout/Transaction";
import { TransactionProvider } from "./context/TransactionContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import Checkout from "./layout/Checkout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/products"} />} />
        <Route path="/products" element={<Layout />}>
          <Route
            index
            element={
              <TransactionProvider>
                <InvoiceProvider>
                  <Transaction />
                </InvoiceProvider>
              </TransactionProvider>
            }
          />
          <Route
            path="checkout"
            element={
              <TransactionProvider>
                <InvoiceProvider>
                  <Checkout />
                </InvoiceProvider>
              </TransactionProvider>
            }
          />
          <Route path="add" element={<ProductAdd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
