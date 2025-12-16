// src/components/Blog.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // <--- IMPORTANTE
import { supabase } from '../supabaseClient';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error:', error);
      else setPosts(data);
      
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center p-10">Cargando historias... 🐾</div>;

  return (
    <section className="bg-[#f8f5f0] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-800 mb-12">
          Diario de Aventuras 📖
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {post.cover_image && (
                <div className="h-48 overflow-hidden">
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3 uppercase tracking-wider">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span>Por: {post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 font-serif">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                  {post.content}
                </p>

                {/* AQUÍ ESTÁ EL CAMBIO: Usamos Link en lugar de Button */}
                <Link 
                  to={`/blog/${post.id}`} 
                  className="text-blue-600 text-sm font-semibold hover:text-blue-800 self-start mt-auto"
                >
                  Leer más →
                </Link>

              </div>
            </article>
          ))}
        </div>
        
        {/* ... resto del código ... */}
      </div>
    </section>
  );
};

export default Blog;