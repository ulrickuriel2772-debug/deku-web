// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { compressImage } from '../utils/compressImage'; // <--- 1. IMPORTAR

const CreatePost = () => {
  // ... estados ...
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, getContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = null;

      if (image) {
        // --- 2. NUEVO: Comprimir imagen ---
        const compressedFile = await compressImage(image);
        
        // --- 3. NUEVO: Usar extensión .webp ---
        const fileName = `${Date.now()}.webp`; 
        const filePath = `blog/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('deku-content')
          .upload(filePath, compressedFile); // Subir la comprimida

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('deku-content')
          .getPublicUrl(filePath);
        
        imageUrl = data.publicUrl;
      }

      // ... Guardar en base de datos (igual que antes) ...
      const { error: insertError } = await supabase
        .from('posts')
        .insert([{ title, author, content, cover_image: imageUrl }]);

      if (insertError) throw insertError;

      alert('¡Historia publicada y optimizada!');
      // ... limpiar estados ...
      setTitle(''); setAuthor(''); getContent(''); setImage(null);

    } catch (error) {
      console.error('Error:', error);
      alert('Error al subir post');
    } finally {
      setUploading(false);
    }
  };

  // ... (El return del formulario sigue igual) ...
  return (
     // ... tu JSX existente ...
     <section className="bg-white p-8 max-w-2xl mx-auto my-10 rounded-lg shadow-lg border border-gray-100">
      <h2 className="text-3xl font-serif text-gray-800 mb-6 text-center">
        Nueva Entrada del Blog ✍️
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... inputs de titulo, autor, contenido ... */}
          {/* Replicar inputs existentes aquí para no perder contexto */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Título</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Autor</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Historia</label>
            <textarea value={content} onChange={(e) => getContent(e.target.value)} rows="6" className="w-full p-3 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Foto de portada</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>

          <button type="submit" disabled={uploading} className="w-full py-3 px-4 rounded-md text-white font-bold bg-blue-600 hover:bg-blue-700">
            {uploading ? 'Procesando imagen...' : 'Publicar Historia'}
          </button>
      </form>
    </section>
  );
};

export default CreatePost;