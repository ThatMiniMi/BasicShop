import { useState } from "react";
import { createProduct} from "../Services/api";

function ProductForm()
{
    const [ form, setForm ] = useState(
        {
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            imageUrl: "",
        });
    
    const [ success, setSuccess ] = useState(false);
    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name] : e.target.value});
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try
        {
            await createProduct(
                {
                    ...form,
                    price: parseFloat(form.price),
                    stock: parseInt(form.stock),
                    categoryId: parseInt(form.categoryId),
                });
            setSuccess(true);
            setForm(
                {
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    categoryId: "",
                    imageUrl: "",
                });
        }
        catch (err)
        {
            console.error(err);
            alert("Product creation failed.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Admin: Add Product</h2>
        {success && <p className="text-green-600 mb-2">Product created!</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2" />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border p-2" />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="w-full border p-2" />
          <input name="categoryId" type="number" placeholder="Category ID" value={form.categoryId} onChange={handleChange} className="w-full border p-2" />
          <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="w-full border p-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Product</button>
        </form>
      </div>
    );
}

export default ProductForm;