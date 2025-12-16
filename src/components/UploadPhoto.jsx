// src/components/UploadPhoto.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const UploadPhoto = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('¡Elige una foto primero!');

    setUploading(true);

    try {
      // 1. Subir imagen al Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `gallery/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('deku-content')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Obtener URL pública
      const { data } = supabase.storage
        .from('deku-content')
        .getPublicUrl(fileName);

      // 3. Guardar en la tabla 'gallery'
      const { error: dbError } = await supabase
        .from('gallery')
        .insert([
          {
            image_url: data.publicUrl,
            description: caption,
            likes: 0
          }
        ]);

      if (dbError) throw dbError;

      // Limpiar formulario y avisar que terminó
      setFile(null);
      setCaption('');
      alert('¡Foto subida!');
      if (onUploadSuccess) onUploadSuccess(); // Para recargar la galería automáticamente

    } catch (error) {
      console.error('Error:', error);
      alert('Error subiendo la foto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
      <h3 className="text-lg font-bold text-gray-700 mb-4">📸 Subir foto rápida</h3>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        
        {/* Input de Archivo */}
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* Input de Descripción */}
        <input
          type="text"
          placeholder="Escribe un pie de foto..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Botón */}
        <button 
          type="submit" 
          disabled={uploading}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {uploading ? 'Subiendo...' : 'Publicar Foto'}
        </button>
      </form>
    </div>
  );
};

export default UploadPhoto;