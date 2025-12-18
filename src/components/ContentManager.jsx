// src/components/ContentManager.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ContentManager = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar todo el contenido
  const fetchData = async () => {
    setLoading(true);
    // 1. Cargar Galería
    const { data: galleryData } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    // 2. Cargar Blog
    const { data: blogData } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (galleryData) setGalleryItems(galleryData);
    if (blogData) setBlogPosts(blogData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función genérica para borrar
  const handleDelete = async (id, table) => {
    // 1. Confirmación de seguridad
    const confirm = window.confirm("¿Estás seguro de que quieres eliminar esto? No se puede deshacer.");
    if (!confirm) return;

    try {
      // 2. Borrar de la base de datos
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // 3. Actualizar la lista visualmente sin recargar
      if (table === 'gallery') {
        setGalleryItems(prev => prev.filter(item => item.id !== id));
      } else {
        setBlogPosts(prev => prev.filter(item => item.id !== id));
      }

      alert("Eliminado correctamente 🗑️");

    } catch (error) {
      console.error("Error al borrar:", error);
      alert("Hubo un error al intentar borrar.");
    }
  };

  if (loading) return <p className="text-white">Cargando contenido...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      
      {/* COLUMNA 1: GESTIONAR GALERÍA */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
          Gestionar Galería ({galleryItems.length})
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {galleryItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-gray-700 p-3 rounded-lg">
              {/* Miniatura */}
              <img src={item.image_url} alt="mini" className="w-16 h-16 object-cover rounded bg-gray-900" />
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-sm truncate">{item.description || "Sin descripción"}</p>
                <p className="text-gray-400 text-xs">Likes: {item.likes}</p>
              </div>

              {/* Botón Borrar */}
              <button 
                onClick={() => handleDelete(item.id, 'gallery')}
                className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-full transition-all"
                title="Eliminar foto"
              >
                🗑️
              </button>
            </div>
          ))}
          {galleryItems.length === 0 && <p className="text-gray-500 text-sm">No hay fotos.</p>}
        </div>
      </div>

      {/* COLUMNA 2: GESTIONAR BLOG */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
          Gestionar Blog ({blogPosts.length})
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 bg-gray-700 p-3 rounded-lg">
              {/* Miniatura (si tiene) */}
              {post.cover_image ? (
                <img src={post.cover_image} alt="cover" className="w-16 h-16 object-cover rounded bg-gray-900" />
              ) : (
                <div className="w-16 h-16 bg-gray-600 rounded flex items-center justify-center text-xs">Texto</div>
              )}
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-sm font-bold truncate">{post.title}</p>
                <p className="text-gray-400 text-xs">{new Date(post.created_at).toLocaleDateString()}</p>
              </div>

              {/* Botón Borrar */}
              <button 
                onClick={() => handleDelete(post.id, 'posts')}
                className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-full transition-all"
                title="Eliminar post"
              >
                🗑️
              </button>
            </div>
          ))}
          {blogPosts.length === 0 && <p className="text-gray-500 text-sm">No hay historias.</p>}
        </div>
      </div>

    </div>
  );
};

export default ContentManager;