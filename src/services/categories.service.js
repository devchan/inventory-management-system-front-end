import httpService from "./http.service";

export default {
  getCategories(payload) {
    return httpService.get(
      `categories?search=${payload.filter}&page=${payload.pagination.page}&perPage=${payload.pagination.itemsPerPage}`
    );
  },
  createCategory(payload) {
    return httpService.post(`categories`, payload);
  },
  updateCategory(id, payload) {
    return httpService.put(`categories/${id}`, payload);
  },
  deleteCategory(id) {
    return httpService.delete(`categories/${id}`);
  },
  getCategory(id) {
    return httpService.get(`categories/${id}`);
  },
};
