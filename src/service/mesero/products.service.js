import { apiRequest } from "../../api/apiConfig";

export const getProductos = () => apiRequest("/productos");
