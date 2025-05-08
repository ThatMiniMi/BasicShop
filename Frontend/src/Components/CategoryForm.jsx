import { useState } from "react";
import { createCategory } from "../Services/api";

function CategoryForm()
{
    const [name, setName] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try
        {
            await createCategory({ name });
            setName("");
            setSuccess(true);
        }
        catch(err)
        {
            console.error(err);
            alert ("Failed to create category");
        }
    };

    return(
        <div className="max-w-md mx-auto p-4">
          <h2 className="text-xl font-bold mb-2">Add Category</h2>
          {success && <p className="text-green-600 mb-2">Category created!</p>}
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="w-full border p-2"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Add Category
            </button>
          </form>
        </div>
      );
}

export default CategoryForm;