// =====================================================
// ARCHIVO DE PROYECTOS - GRUPO BENDITO
// =====================================================
// Para añadir un nuevo proyecto:
// 1. Copia uno de los bloques de abajo
// 2. Cambia el id (número único), titulo, descripcion, servicio y fecha
// 3. En "fotos" pon los nombres de las imágenes que subiste
// 4. Guarda el archivo, haz "npm run build" y sube el index.html a Plesk
// =====================================================

export type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  servicio: string; // debe coincidir con el id del servicio
  fecha: string;
  fotos: string[]; // nombres de archivos en /proyectos/ (ej: "obra1.jpg")
  destacado: boolean;
};

export const PROYECTOS: Proyecto[] = [
  {
    id: 1,
    titulo: "Reforma integral de vivienda en Caravaca",
    descripcion: "Reforma completa de 90m² en Caravaca de la Cruz. Distribuición nueva, pladur en toda la vivienda, instalación eléctrica y fontanería nueva. El cliente quedó encantado con el resultado.",
    servicio: "reformas-integrales",
    fecha: "Enero 2025",
    fotos: [],
    destacado: true
  },
  {
    id: 2,
    titulo: "Techo foseado con LED en salón",
    descripcion: "Instalación de techo foseado decorativo con iluminación LED integrada en salón-comedor de 35m². Acabado impecable, sin una sola grieta. El cliente nos dijo que era exactamente lo que había soñado.",
    servicio: "reformas-pladur",
    fecha: "Febrero 2025",
    fotos: [],
    destacado: true
  },
  {
    id: 3,
    titulo: "Cocina y baño reformados en Murcia",
    descripcion: "Sustitución completa de cocina y cuarto de baño. Nuevo alicatado, sanitarios modernos, muebles a medida y griferías de calidad. Terminado en 8 días laborables.",
    servicio: "cocinas-y-banos",
    fecha: "Marzo 2025",
    fotos: [],
    destacado: false
  }
];
