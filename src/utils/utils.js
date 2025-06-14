async function getData(rutaArchivo) {
  try {
    const response = await fetch(rutaArchivo);
    
    if (!response.ok) {
      throw new Error(`No se pudo encontrar: ${rutaArchivo}`);
    }
    
    const data = await response.json();
    
    return data;
    
  } catch (error) {
    console.error(`Error leyendo ${rutaArchivo}:`, error.message);
  }
}

export { getData };