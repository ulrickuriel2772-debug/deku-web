// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Asegúrate que la ruta sea correcta

const CreatePost = () => {
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

      // 1. SUBIR LA IMAGEN (Si seleccionaste una)
      if (image) {
        // Creamos una ruta única para que no se repitan nombres
        const fileExt = image.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `blog/${fileName}`;

        // Subir al Bucket 'deku-content'
        const { error: uploadError } = await supabase.storage
          .from('deku-content')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        // Obtener la URL pública para guardarla en la base de datos
        const { data } = supabase.storage
          .from('deku-content')
          .getPublicUrl(filePath);
        
        imageUrl = data.publicUrl;
      }

      // 2. GUARDAR DATOS EN LA TABLA 'posts'
      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            title: title,
            author: author,
            content: content,
            cover_image: imageUrl,
          },
        ]);

      if (insertError) throw insertError;

      alert('¡Historia publicada con éxito!');
      // Limpiar formulario
      setTitle('');
      setAuthor('');
      getContent('');
      setImage(null);

    } catch (error) {
      console.error('Error subiendo el post:', error);
      alert('Ocurrió un error al subir el post. Revisa la consola.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="bg-white p-8 max-w-2xl mx-auto my-10 rounded-lg shadow-lg border border-gray-100">
      <h2 className="text-3xl font-serif text-gray-800 mb-6 text-center">
        Nueva Entrada del Blog ✍️
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Título */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Ej: Un día en el parque"
            required
          />
        </div>

        {/* Autor */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Ej: Juan"
            required
          />
        </div>

        {/* Contenido */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Historia</label>
          <textarea
            value={content}
            onChange={(e) => getContent(e.target.value)}
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Escribe aquí lo que pasó..."
            required
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Foto de portada</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-3 px-4 rounded-md text-white font-bold transition-colors
            ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {uploading ? 'Publicando...' : 'Publicar Historia'}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;