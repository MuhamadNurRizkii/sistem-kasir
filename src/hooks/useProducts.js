import { fetchProducts, searchProduct } from "@/api/produk";
import { useState } from "react";
import toast from "react-hot-toast";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async (name = null) => {
    try {
      setLoading(true);

      const { success, message, data } = await fetchProducts(name);

      if (!success) {
        toast.error(message);
        return;
      }

      setProducts(data);
    } catch (error) {
      console.log(error.message);
      toast.error("Terjadi Kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (keyword) => {
    try {
      setLoading(true);

      const data = await searchProduct(keyword);

      setProducts(data);
    } catch (error) {
      console.log(error.message);
      toast.error("Gagal mencari produk");
    } finally {
      setLoading(false);
    }
  };

  return { loading, products, getProducts, searchProducts };
};
