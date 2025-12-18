// src/components/Intro.jsx
import React from "react";

const Intro = () => {
  return (
    // SECCIÓN PRINCIPAL: Ocupa todo el ancho y alto (min-h-screen), centra el contenido
    <section className="min-h-screen w-full bg-[#f8f5f0] text-[#1a1a1a] font-serif flex items-center justify-center p-4 md:p-8">
      
      {/* TARJETA CONTENEDORA: Fondo blanco con ligera transparencia y sombra para resaltar */}
      <div className="bg-white/80 backdrop-blur-sm w-full max-w-6xl rounded-2xl shadow-xl overflow-hidden p-6 md:p-12">
        
        {/* TÍTULO: Grande y centrado */}
        <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] text-center mb-10 md:mb-16 text-gray-800">
          DEKU
        </h1>

        {/* LAYOUT PRINCIPAL: 1 columna en móvil, 2 columnas en tablet/PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* COLUMNA IZQUIERDA: Datos del perfil */}
          <div className="order-2 md:order-1 space-y-8 text-base tracking-wide">
            
            {/* Cumpleaños */}
            <div className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <span className="text-3xl">🎂</span>
              <div>
                <p className="font-bold uppercase text-xs text-gray-500 tracking-wider">
                  Cumpleaños
                </p>
                <p className="text-lg">14 de Julio, 2024</p>
              </div>
            </div>

            {/* Día de adopción */}
            <div className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <span className="text-3xl">🏠</span>
              <div>
                <p className="font-bold uppercase text-xs text-gray-500 tracking-wider">
                  Día de Adopción
                </p>
                <p className="text-lg">4 de Agosto, 2024</p>
              </div>
            </div>

            {/* Dueños (Pawrents) */}
            <div className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
              <div>
                <p className="font-bold uppercase text-xs text-gray-500 tracking-wider">
                  Mis Humanos
                </p>
                {/* Aquí puedes poner tu nombre y el de tu esposa */}
                <p className="text-lg">Uriel y Paulina</p> 
              </div>
            </div>

            {/* Raza */}
            <div className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <span className="text-3xl">🐾</span>
              <div>
                <p className="font-bold uppercase text-xs text-gray-500 tracking-wider">
                  Raza
                </p>
                <p className="text-lg">Werito comun mexicano</p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Imagen */}
          {/* En móvil la imagen se verá arriba (order-1) para mejor impacto visual */}
          <div className="order-1 md:order-2 h-full w-full">
            <div className="relative overflow-hidden rounded-xl shadow-md h-50 md:h-[450px] w-full">
              <img
                src="/images/deku.jpeg" 
                alt="Foto de Deku"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* FRASE */}
        <div className="border-t border-gray-200 mt-10 pt-8">
          <p className="italic text-center text-xl text-gray-600 font-light">
            “¡Llenas nuestros días de amor, risas y pequeños maullidos!”
          </p>
        </div>

        {/* SECCIÓN DE FAVORITOS (3 columnas en PC, 1 en móvil) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center md:text-left">
          
          <div className="bg-[#fcfbf9] p-6 rounded-lg">
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-4 tracking-wider">
              Premios Favoritos
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Pedacitos de Pollito</li>
              <li>• Churus del sabor que sea</li>
              <li>• Pedacitos de Salmón hidrolizado</li>
            </ul>
          </div>

          <div className="bg-[#fcfbf9] p-6 rounded-lg">
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-4 tracking-wider">
              Actividades Favoritas
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Perseguir el láser</li>
              <li>• Dormir con mi mamá</li>
              <li>• Ver videos de aves(ipad kid)</li>
            </ul>
          </div>

          <div className="bg-[#fcfbf9] p-6 rounded-lg">
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-4 tracking-wider">
              Juguetes Favoritos
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Mis peces de peluche</li>
              <li>• Pelotitas</li>
              <li>• Cajas de cartón</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Intro;