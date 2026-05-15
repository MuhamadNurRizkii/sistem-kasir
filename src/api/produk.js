import { supabase } from "@/supabase/supabase";

export const insertProduk = async (body, file) => {
  let { namaProduk, harga, stok, kategori } = body;

  if (!file) {
    return { success: false, message: "file belum dipilih" };
  }

  const extensionFile = file.name.split(".").pop().toLowerCase();

  if (
    extensionFile !== "jpg" &&
    extensionFile !== "png" &&
    extensionFile !== "jpeg"
  ) {
    return { success: false, message: "file harus jpg/png/jpeg" };
  }

  const filename = `product-${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("image_product")
    .upload(filename, file);

  if (uploadError) {
    return { success: false, message: "upload gambar gagal" };
  }

  const { data: publicUrl } = supabase.storage
    .from("image_product")
    .getPublicUrl(filename);

  if (kategori === "makanan") {
    kategori = 1;
  } else if (kategori === "minuman") {
    kategori = 2;
  } else if (kategori === "ice cream") {
    kategori = 3;
  } else {
    kategori = 4;
  }

  const { data, error } = await supabase.from("product").insert([
    {
      name: namaProduk,
      price: Number(harga),
      stock: Number(stok),
      category_id: kategori,
      image_url: publicUrl.publicUrl,
    },
  ]);

  if (error) {
    return { success: false, message: error.message };
  } else {
    return { success: true, message: "produk berhasil di tambahkan" };
  }
};

export const fetchProducts = async (categoryId = null) => {
  let query = supabase
    .from("product")
    .select("id, name, price, stock, image_url, category(category_name)");

  if (categoryId !== null) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data };
};

export const fetchCategory = async () => {
  const { data, error } = await supabase.from("category").select("*");

  return data;
};

export const searchProduct = async (namaProduk) => {
  const { data, error } = await supabase
    .from("product")
    .select("id, name, price, stock, image_url, category(category_name)")
    .ilike("name", `%${namaProduk}%`);

  if (error) {
    console.log(error.message);
    return [];
  }

  return data ?? [];
};
