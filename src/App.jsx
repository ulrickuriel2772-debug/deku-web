// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Importar supabase

// Páginas y Componentes
import Intro from './components/Intro';
import PhotoGallery from './components/PhotoGallery';
import Admin from './pages/Admin';
import Login from './pages/Login'; // <--- Importar Login
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1. Verificamos si ya hay una sesión activa al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Escuchamos cambios (login o logout) en tiempo real
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* RUTA PÚBLICA */}
        <Route path="/" element={
          <div className="bg-[#fafafa] min-h-screen">
            <Intro />
            <PhotoGallery />
            <Blog />
          </div>
        } />

        {/* RUTA DINÁMICA DEL BLOG */}
        {/* :id significa que eso cambiará (ej: /blog/1, /blog/50) */}
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* RUTA PROTEGIDA */}
        {/* Si hay sesión, muestra Admin. Si no, redirige a Login */}
        <Route 
          path="/admin" 
          element={session ? <Admin /> : <Login />} 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;