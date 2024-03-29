import httpService from "./http.service";

export default {
  getRoles() {
    return httpService.get("roles");
  },
  getAllBusModels() {
    return httpService.get(`bus-models`);
  },
  getAllRouteLocations() {
    return httpService.get(`locations`);
  },
  getAllRoutes() {
    return httpService.get(`routes`);
  },
  getAllBuses() {
    return httpService.get(`buses`);
  },
  getAllCategories() {
    return httpService.get(`categories`);
  },
  getAllProducts() {
    return httpService.get(`products`);
  },
};
