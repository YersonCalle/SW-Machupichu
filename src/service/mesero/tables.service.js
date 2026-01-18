import { apiRequest } from "../../api/apiConfig";

export const getMesas = () => apiRequest("/mesas");
