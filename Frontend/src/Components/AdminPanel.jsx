import ProductForm from "./ProductForm";
import AdminProductList from "./AdminProductList";
import CategoryForm from "./CategoryForm";
import AdminCategoryList from "./AdminCategoryList";

function AdminPanel() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Categories */}
        <div className="space-y-4">
          <CategoryForm />
          <AdminCategoryList />
        </div>

        {/* Products */}
        <div className="space-y-4">
          <ProductForm />
          <AdminProductList />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;