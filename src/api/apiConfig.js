const BASE_URL = "http://localhost:3000/api";

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error en la petición");
    }

    if (response.status === 204) return true;
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};