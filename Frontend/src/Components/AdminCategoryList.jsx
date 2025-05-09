import { useEffect, useState } from "react";
import { fetchCategories, updateCategory, deleteCategory } from "../Services/api";

function AdminCategoryList()
{
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState("");

    useEffect(() =>
    {
        loadCategories();
    }, []);
    const loadCategories = async () =>
    {
        try
        {
            const data = await fetchCategories();
            setCategories(data);
        }
        catch (err)
        {
            console.error("Failed to load categories:", err);
        }
    };

    const handleEdit = (category) =>
    {
        setEditingId(category.id);
        setEditName(category.name);
    };

    const handleUpdate = async (id) =>
    {
        try
        {
            await updateCategory(id, { id, name: editedName});
            setEditingId(null);
            loadCategories();
        }
        catch (err)
        {
          console.error("Failed to update category:", err);
            alert("Failed to update category");
        }
    };

    const handleDelete = async (id) =>
    {
        if (!confirm("Are you sure?")) return;
        try {
          await deleteCategory(id);
          loadCategories();
        } catch (err)
        {
          console.error("Failed to delete category:", err);
          alert("Failed to delete category");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
          <h2 className="text-xl font-bold mb-2">Manage Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id} className="flex justify-between items-center border p-2 rounded">
                {editingId === cat.id ? (
                  <>
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="border px-2 py-1"
                    />
                    <button
                      onClick={() => handleUpdate(cat.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{cat.name}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
}

export default AdminCategoryList;