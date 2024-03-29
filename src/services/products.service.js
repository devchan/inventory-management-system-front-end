import httpService from "./http.service";

export default {
  getProducts(payload) {
    return httpService.get(
      `products?search=${payload.filter}&page=${payload.pagination.page}&perPage=${payload.pagination.itemsPerPage}`
    );
  },
  createProduct(payload) {
    return httpService.post(`products`, payload);
  },
  updateProduct(id, payload) {
    return httpService.put(`products/${id}`, payload);
  },
  deleteProduct(id) {
    return httpService.delete(`products/${id}`);
  },
  getProduct(id) {
    return httpService.get(`products/${id}`);
  },
};
