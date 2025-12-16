// src/utils/compressImage.js
import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
  const options = {
    // 1. Objetivo de peso: 0.3MB = 200KB (Antes estaba en 0.8)
    maxSizeMB: 0.3,          
    
    // 2. Tamaño máximo: 1280px (Suficiente para verse bien en pantalla completa)
    // Si la imagen es más grande, la encogerá.
    maxWidthOrHeight: 1280,  
    
    // 3. Calidad inicial: Empezar probando al 60% de calidad
    initialQuality: 0.6,     
    
    useWebWorker: true,      // Usar hilos secundarios para velocidad
    fileType: 'image/webp',  // Formato WebP (esencial)
  };

  try {
    console.log(`Peso original: ${file.size / 1024 / 1024} MB`);
    
    const compressedFile = await imageCompression(file, options);
    
    console.log(`Peso comprimido: ${compressedFile.size / 1024 / 1024} MB`);
    
    return compressedFile;
  } catch (error) {
    console.error("Error comprimiendo imagen:", error);
    // Si falla, devolvemos la original (peor es nada)
    return file; 
  }
};