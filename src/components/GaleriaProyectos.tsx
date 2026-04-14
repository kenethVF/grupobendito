import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Camera, Star, ArrowRight } from 'lucide-react';

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  servicio: string;
  fecha: string;
  fotos: string[];
  destacado: boolean;
}

const GaleriaProyectos = ({ servicioId }: { servicioId: string }) => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  const getNombreServicio = (id: string) => {
    const nombres: {[key: string]: string} = {
      'reformas-integrales': 'Reformas Integrales',
      'cocinas-y-banos': 'Cocinas y Baños',
      'reformas-comerciales': 'Reformas Comerciales',
      'reformas-nueva-obra': 'Reformas Nueva Obra',
      'reparaciones-mantenimiento': 'Reparaciones y Mantenimientos',
      'reformas-pladur': 'Especialistas en Pladur'
    };
    return nombres[id] || id;
  };

  useEffect(() => {
    const q = query(collection(db, "proyectos"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todos: Proyecto[] = [];
      snapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: Number(doc.id) } as Proyecto);
      });
      const filtrados = todos
        .filter(p => p.servicio === servicioId)
        .sort((a, b) => (a.destacado === b.destacado ? 0 : a.destacado ? -1 : 1));
      setProyectos(filtrados);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [servicioId]);

  if (loading) return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1c2a42]"></div>
    </div>
  );
  
  if (proyectos.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      {/* MISMOS MÁRGENES EXACTOS QUE LAS TARJETAS DE SERVICIOS */}
      <div className="container mx-auto px-6">
        
        {/* TÍTULOS CENTRADOS CON SUBTÍTULO AMARILLO */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <span className="inline-block text-[#dcb871] text-xs font-black tracking-[0.3em] uppercase mb-4">
            Proyectos Realizados
          </span>
          <h2 className="text-4xl font-black text-[#1c2a42] mb-6">
            Nuestros trabajos en <span className="text-[#dcb871]">{getNombreServicio(servicioId)}</span>
          </h2>
          <div className="h-1 w-20 bg-[#dcb871] mx-auto rounded-full"></div>
        </div>

        {/* GRID EXACTAMENTE IGUAL QUE LAS TARJETAS DE SERVICIOS:
            1 columna en móvil, 2 en tablet, 3 en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[70%] mx-auto">
          {proyectos.map((proyecto) => (
            <div 
              key={proyecto.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* IMAGEN CON MISMA ALTURA QUE LAS TARJETAS DE SERVICIOS */}
              <div className="relative h-60 overflow-hidden bg-gray">
                {proyecto.fotos && proyecto.fotos.length > 0 ? (
                  <img 
                    src={`/proyectos/${proyecto.fotos[0]}`} 
                    alt={proyecto.titulo}
                    className="w-full object-contain group-hover:scale-105  transition-transform duration-500 "
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.png'; }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                    <Camera size={48} strokeWidth={1} />
                  </div>
                )}
                
                {/* Badge Destacado (esquina superior derecha) */}
                {proyecto.destacado && (
                  <div className="absolute top-4 right-4 bg-[#1c2a42] text-[#dcb871] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-lg">
                    DESTACADO
                  </div>
                )}
              </div>

              {/* CONTENIDO CON MISMO PADDING QUE LAS TARJETAS DE SERVICIOS */}
              <div className="p-8">
                {/* FECHA EN DORADO (sin icono, como pediste) */}
                <div className="mb-3 text-[#dcb871] text-xs font-bold uppercase tracking-widest">
                  {proyecto.fecha}
                </div>
                
                <h3 className="text-xl font-bold text-[#1c2a42] mb-3 group-hover:text-[#dcb871] transition-colors">
                  {proyecto.titulo}
                </h3>
                
              <p style={{color: '#6b7280', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'auto'

              }}>
                {proyecto.descripcion}
                </p>
                {/* FOOTER DE LA TARJETA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-[#dcb871]" />
                    <span className="text-xs font-semibold text-gray-500">Calidad Garantizada</span>
                  </div>
                  <ArrowRight size={18} className="text-[#1c2a42] group-hover:text-[#dcb871] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriaProyectos;