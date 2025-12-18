// src/pages/Admin.jsx
import React from 'react';
import UploadPhoto from '../components/UploadPhoto';
import CreatePost from '../components/CreatePost';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // <--- Importar Supabase
import ContentManager from '../components/ContentManager';

const Admin = () => {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Te manda al Home después de salir
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl text-white font-bold">Panel de Control 🛠️</h1>
          
          <div className="flex gap-4">
            <Link to="/" className="text-gray-300 hover:text-white pt-2">
              Ver Web
            </Link>
            
            {/* BOTÓN DE LOGOUT */}
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Sección de Subida */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Subir Foto a la Galería
          </h2>
          <UploadPhoto />
          <CreatePost />

        </div>

        <div className="border-t border-gray-700 pt-10">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Gestionar Contenido Existente</h2>
          <p className="text-gray-400 text-center text-sm mb-6">Aquí puedes eliminar fotos o entradas antiguas</p>
          
          <ContentManager />
        </div>
        
      </div>
    </div>
  );
};

export default Admin;