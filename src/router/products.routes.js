import CreateView from "@/views/products/CreateView";
import EditView from "@/views/products/EditView";
import ListView from "@/views/products/ListView";

export default [
  {
    path: "/products/create",
    name: "createProduct",
    component: CreateView,
    meta: {
      permission: "store_product",
    },
  },
  {
    path: "/products/:id/edit",
    name: "editProduct",
    component: EditView,
    meta: {
      permission: "update_product",
    },
  },
  {
    path: "/products",
    name: "products",
    component: ListView,
    meta: {
      permission: "index_products",
    },
  },
];
