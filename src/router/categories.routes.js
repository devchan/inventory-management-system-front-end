import CreateView from "@/views/categories/CreateView";
import EditView from "@/views/categories/EditView";
import ListView from "@/views/categories/ListView";

export default [
  {
    path: "/categories/create",
    name: "createCategory",
    component: CreateView,
    meta: {
      permission: "store_category",
    },
  },
  {
    path: "/categories/:id/edit",
    name: "editCategory",
    component: EditView,
    meta: {
      permission: "update_category",
    },
  },
  {
    path: "/categories",
    name: "categories",
    component: ListView,
    meta: {
      permission: "index_categories",
    },
  },
];
