import { useState } from "react";
import { createProduct } from "../Services/api";

function ProductForm()
{
  const [form, setForm] = useState(
  {
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
  {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) =>
  {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try
    {
      let imageUrl = "";

      if (imageFile)
      {
        const formData = new FormData();
        formData.append("file", imageFile);

        const res = await fetch("http://localhost:5156/api/product/upload-image",
        {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Image upload failed.");
        const data = await res.json();
        imageUrl = data.imageUrl;
      }

      const payload =
      {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        CategoryID: parseInt(form.categoryId),
        imageUrl: imageUrl,
      };

      await createProduct(payload);
      setSuccess(true);

      setForm(
      {
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
      });
      setImageFile(null);
    }
    catch (err)
    {
      console.error("Failed to create product:", err);
      alert("Product creation failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin: Add Product</h2>
      {success && <p className="text-green-600 mb-2">Product created!</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="categoryId"
          type="number"
          placeholder="Category ID"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;