// src/components/BlogPost.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const BlogPost = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      // Pedimos a Supabase SOLO el post que coincida con el ID
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single(); // .single() nos devuelve un objeto directo, no un array

      if (error) {
        console.error("Error cargando post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center p-20">Cargando historia... 📖</div>;
  if (!post) return <div className="text-center p-20">No se encontró la historia 😢</div>;

  return (
    <article className="min-h-screen bg-[#f8f5f0] font-serif text-[#1a1a1a]">
      
      {/* Botón Volver (Flotante o fijo arriba) */}
      <div className="max-w-3xl mx-auto pt-8 px-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-sans text-sm font-bold flex items-center gap-2">
          ← Volver al Inicio
        </Link>
      </div>

      <div className="max-w-3xl mx-auto py-10 px-4">
        
        {/* Encabezado */}
        <header className="text-center mb-10">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">
            {new Date(post.created_at).toLocaleDateString()} • Por {post.author}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            {post.title}
          </h1>
        </header>

        {/* Imagen Principal */}
        {post.cover_image && (
          <div className="w-full h-64 md:h-96 mb-10 overflow-hidden rounded-xl shadow-lg">
            <img 
              src={post.cover_image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Contenido del Texto */}
        {/* 'whitespace-pre-wrap' respeta los saltos de línea que escribiste */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
          {post.content}
        </div>

      </div>
    </article>
  );
};

export default BlogPost;