// src/components/PhotoGallery.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const getPhotos = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setPhotos(data);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const handleLike = async (e, id, currentLikes) => {
    e.stopPropagation();
    
    const newLikes = (currentLikes || 0) + 1;

    setPhotos(prevPhotos => 
      prevPhotos.map(photo => 
        photo.id === id ? { ...photo, likes: newLikes } : photo
      )
    );

    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto(prev => ({ ...prev, likes: newLikes }));
    }

    await supabase
      .from('gallery')
      .update({ likes: newLikes })
      .eq('id', id);
  };

  return (
    <section className="max-w-4xl mx-auto py-6 md:py-10 px-0 md:px-4">
      
      {/* CAMBIO AQUÍ: Eliminé 'hidden md:block' para que se vea siempre */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-4xl font-serif text-gray-800">Galería de Deku 🐾</h2>
        <p className="text-gray-500 text-sm mt-2">Momentos capturados</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-0.5 md:gap-4 md:grid-cols-3">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            onClick={() => setSelectedPhoto(photo)}
            className="relative group aspect-square bg-gray-200 overflow-hidden cursor-pointer md:rounded-lg"
          >
            <img 
              src={photo.image_url} 
              alt={photo.description}
              className="w-full h-full object-cover md:transform md:transition-transform md:duration-500 md:group-hover:scale-110"
            />
            
            <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
              <span className="text-white font-bold flex items-center gap-2">
                 ❤️ {photo.likes || 0}
              </span>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p className="text-center text-gray-400 mt-10">Cargando fotos...</p>
      )}

      {/* MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col justify-center items-center p-4 animate-fadeIn">
          
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white text-4xl leading-none hover:text-gray-300 z-50"
          >
            &times;
          </button>

          <div className="w-full max-w-lg bg-black md:bg-transparent flex flex-col max-h-[90vh]">
            <div className="flex-grow flex items-center justify-center bg-black overflow-hidden rounded-t-lg">
              <img 
                src={selectedPhoto.image_url} 
                alt="Detalle" 
                className="w-full max-h-[60vh] md:max-h-[70vh] object-contain"
              />
            </div>

            <div className="bg-white p-4 rounded-b-lg text-gray-800 flex flex-col gap-2">
              <p className="text-sm md:text-base text-gray-700 font-medium">
                {selectedPhoto.description || "Sin descripción 🐾"}
              </p>

              <div className="flex justify-between items-center mt-2 border-t pt-3 border-gray-100">
                <span className="text-xs text-gray-400 uppercase">
                  {new Date(selectedPhoto.created_at).toLocaleDateString()}
                </span>

                <button 
                  onClick={(e) => handleLike(e, selectedPhoto.id, selectedPhoto.likes)}
                  className="flex items-center gap-2 text-red-500 hover:scale-110 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span className="font-bold text-lg">{selectedPhoto.likes || 0}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default PhotoGallery;