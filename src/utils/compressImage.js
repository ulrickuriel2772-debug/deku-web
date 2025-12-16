// src/utils/compressImage.js
import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.8,          // Peso máximo (0.8MB es excelente calidad/peso)
    maxWidthOrHeight: 1920,  // Redimensionar si es gigante (Full HD)
    useWebWorker: true,      // Usar hilos secundarios para no trabar la web
    fileType: 'image/webp',  // CONVERTIR A WEBP
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error comprimiendo imagen:", error);
    return file; // Si falla, devolvemos la original para no romper nada
  }
};