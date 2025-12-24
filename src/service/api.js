export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`/src/assets/data/${endpoint}`);
    if (!response.ok) throw new Error("Error al cargar los datos");
    return await response.json();
  } catch (error) {
    console.error("Error en API:", error);
    return null;
  }
};