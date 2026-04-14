import { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, 
  ArrowRight, Home as HomeIcon, Hammer, Wrench, 
  Building2, Droplets, CheckCircle, Clock, Shield, ArrowLeft,
  ChevronRight, Layers, Send, Star, AlertTriangle, 
  Eye, Users, Zap, Gift, MessageSquare, PhoneCall
} from 'lucide-react';
import { PROYECTOS as PROYECTOS_INICIALES, type Proyecto } from './proyectos';
import AdminPanel from './AdminPanel';
import AdminPage from './AdminPage';
import GaleriaProyectos  from './components/GaleriaProyectos';

const Instagram = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsApp = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Facebook = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// --- DATOS DE LA EMPRESA ---
const COMPANY = {
  name: "GRUPO BENDITO",
  subtitle: "Interiorismo · Pladur · Reformas",
  address: "Av. Juan Carlos I, 43, Caravaca, Murcia",
  email: "info@grupobendito.es",
  phone: "619 80 27 36",
  whatsappPhone: "619 80 27 36",
  instagram: "grupobendito.oficial",
  instagramUrl: "https://www.instagram.com/grupobendito.oficial",
  whatsappUrl: "https://wa.me/message/RKJ2MBM32Q6YM1",
  facebookUrl: "https://www.facebook.com/GrupoBenditooficial/",
  experience: "+8 años"
};

const COLORS = {
  primary: '#1c2a42', // Navy blue
  secondary: '#2a2a2a', // Dark Gray
  accent: '#dcb871' // Elegant Gold/Accent
};

// --- SERVICIOS DETALLADOS ---
const SERVICES = [
  {
    id: 'reformas-integrales',
    title: 'Reformas Integrales',
    icon: <HomeIcon size={36} color={COLORS.primary} />,
    shortDesc: 'Transformamos viviendas completas con un diseño elegante, funcional y materiales premium.',
    image: '/servicios/reformas-integrales.jpg',
    fullDesc: 'Nuestro servicio de reformas integrales es la solución perfecta para quienes buscan renovar por completo su hogar. Nos ocupamos de absolutamente todo, desde el diseño y la planificación arquitectónica hasta el último detalle de los acabados. Coordinamos todos los oficios: fontanería, electricidad, albañilería, pladur y pintura para que no tengas que preocuparte por nada.',
    features: ['Diseño de interiores personalizado', 'Gestión integral y coordinación de gremios', 'Cumplimiento estricto de plazos', 'Asesoramiento en elección de materiales', 'Control de calidad en cada fase']
  },
  {
    id: 'cocinas-y-banos',
    title: 'Cocinas y Baños',
    icon: <Droplets size={36} color={COLORS.primary} />,
    shortDesc: 'Renovamos los espacios más vitales de tu hogar, maximizando confort, estética y durabilidad.',
    image: '/servicios/cocinas-banos.jpg',
    fullDesc: 'Las cocinas y los baños son los espacios de la casa que sufren más desgaste. Realizamos reformas que no solo mejoran la estética, sino que optimizan la funcionalidad y el almacenamiento. Utilizamos materiales resistentes a la humedad, grifería eficiente y mobiliario a medida de alta calidad.',
    features: ['Diseño 3D previo', 'Sustitución de bañera por plato de ducha', 'Alicatado y solado profesional', 'Mobiliario de cocina a medida', 'Instalaciones de fontanería actualizadas']
  },
  {
    id: 'reformas-comerciales',
    title: 'Reformas Comerciales',
    icon: <Building2 size={36} color={COLORS.primary} />,
    shortDesc: 'Acondicionamiento de locales comerciales y oficinas para transmitir la mejor imagen de tu negocio.',
    image: '/servicios/reformas-comerciales.jpg',
    fullDesc: 'La imagen de tu local comercial es la primera impresión que tienen tus clientes. Diseñamos y ejecutamos reformas de oficinas, tiendas, restaurantes y locales para que reflejen la identidad de tu marca. Garantizamos tiempos de ejecución rápidos para que puedas abrir tu negocio lo antes posible.',
    features: ['Adaptación a normativas de accesibilidad', 'Insonorización y acústica', 'Iluminación comercial eficiente', 'Divisiones de espacios con Pladur', 'Instalaciones de climatización']
  },
  {
    id: 'reformas-nueva-obra',
    title: 'Reformas de Nueva Obra',
    icon: <Hammer size={36} color={COLORS.primary} />,
    shortDesc: 'Personalización, ampliaciones y mejoras en viviendas de nueva construcción o entrega de llaves.',
    image: '/servicios/nueva-obra.jpg',
    fullDesc: '¿Has comprado una casa nueva y quieres adaptarla a tus gustos? Modificamos distribuciones, mejoramos aislamientos, y añadimos detalles de alta calidad como falsos techos foseados, iluminación indirecta y acabados premium que las promotoras no ofrecen por defecto.',
    features: ['Cambios de distribución en obra nueva', 'Instalación de domótica y tecnología', 'Sistemas de iluminación LED integrados', 'Mejoras en aislamiento térmico/acústico', 'Carpintería de alta gama']
  },
  {
    id: 'reparaciones-mantenimiento',
    title: 'Reparaciones y Mantenimientos',
    icon: <Wrench size={36} color={COLORS.primary} />,
    shortDesc: 'Servicios rápidos de mantenimiento preventivo y reparación de averías en hogares y comunidades.',
    image: '/servicios/reparaciones.jpg',
    fullDesc: 'Contar con un equipo de confianza para solucionar incidencias es fundamental. Ofrecemos servicios de mantenimiento preventivo y correctivo. Solucionamos humedades, problemas eléctricos, atascos, repasos de pintura y cualquier desperfecto que afecte al confort de tu inmueble.',
    features: ['Asistencia rápida y profesional', 'Detección y reparación de humedades', 'Mantenimiento en comunidades de vecinos', 'Pequeñas obras y reparaciones exprés', 'Servicio post-venta garantizado']
  },
  {
    id: 'reformas-pladur',
    title: 'Especialistas en Pladur',
    icon: <Layers size={36} color={COLORS.primary} />,
    shortDesc: 'Somos especialistas en pladur. Creamos muebles a medida, duraderos y modernos, integrados totalmente en la estructura de su vivienda.',
    image: '/servicios/pladur.jpg',
    fullDesc: 'Somos especialistas en pladur. Realizamos trabajos con yeso laminado que permite crear muebles a medida, duraderos y modernos, integrados en la estructura de la vivienda. Fabricamos estanterías empotradas, muebles para la televisión, armarios flotantes, cabeceros de cama, bancos, nichos decorativos y vestidores con un acabado premium y elegante.',
    features: ['Muebles de TV y salón a medida', 'Estanterías empotradas', 'Armarios flotantes y vestidores', 'Cabeceros y nichos decorativos', 'Acabados de alta gama']
  }
];

// --- COMPONENTES ---

const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group">
    <img
      src="/logo.png"
      alt="Logo Grupo Bendito"
      className="h-14 w-auto object-contain flex-shrink-0 drop-shadow-sm"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
    <div className="flex flex-col">
      <h1 className="text-2xl font-black tracking-wider" style={{ color: COLORS.primary }}>
        GRUPO BENDITO
      </h1>
      <p className="text-[11px] font-medium tracking-[0.15em] text-[#2a2a2a] uppercase mt-[1px]">
        Interiorismo · Pladur · Reformas
      </p>
    </div>
  </div>
);

export default function App() {
  // Detectar si la URL es /admin y mostrar el panel admin
  if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
    return <AdminPage />;
  }

  const [currentPage, setCurrentPage] = useState('home');
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>(() => {
    try {
      const saved = localStorage.getItem('grupobendito_proyectos');
      return saved ? JSON.parse(saved) : PROYECTOS_INICIALES;
    } catch {
      return PROYECTOS_INICIALES;
    }
  });
  const [scrolled, setScrolled] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: '',
    mensaje: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, currentService]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: string, serviceId?: string) => {
    setCurrentPage(page);
    if (serviceId) setCurrentService(serviceId);
    setIsMenuOpen(false);
  };

  const handleSaveProjects = (newProjects: Proyecto[]) => {
    setProyectos(newProjects);
    localStorage.setItem('grupobendito_proyectos', JSON.stringify(newProjects));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceName = SERVICES.find(s => s.id === formData.servicio)?.title || formData.servicio;
    
    const subject = encodeURIComponent(`Solicitud de Presupuesto - ${serviceName || 'General'}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.nombre}\n` +
      `Teléfono: ${formData.telefono}\n` +
      `Servicio de interés: ${serviceName || 'No especificado'}\n\n` +
      `Detalles del proyecto:\n${formData.mensaje}\n\n` +
      `---\nEnviado desde la web grupobendito.es`
    );
    
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  const TopBar = () => (
    <div className="bg-[#1c2a42] text-white/90 text-[13px] py-2.5 hidden lg:block">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 font-medium"><MapPin size={14} className="text-[#dcb871]" /> {COMPANY.address}</span>
          <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-white transition-colors font-medium"><Mail size={14} className="text-[#dcb871]" /> {COMPANY.email}</a>
        </div>
        <div className="flex items-center gap-6">
          <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:text-white transition-colors font-semibold"><Phone size={14} className="text-[#dcb871]" /> Llamar: {COMPANY.phone}</a>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-2 font-semibold hover:text-white transition-colors text-[#dcb871]">
            <Instagram size={16} /> Instagram
          </a>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <a href={COMPANY.facebookUrl} target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-2 font-semibold hover:text-white transition-colors text-blue-400">
            <Facebook size={16} /> Facebook
          </a>
          <div className="w-[1px] h-4 bg-white/20"></div>
          <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-2 font-semibold hover:text-white transition-colors text-green-400">
            <WhatsApp size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-5 border-b border-gray-100'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div onClick={() => navigateTo('home')}>
          <Logo />
        </div>
        
        {/* Navegación Desktop */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-[15px] text-gray-700">
          <button onClick={() => navigateTo('home')} className="hover:text-[#1c2a42] transition-colors">Inicio</button>
          <button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('servicios')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-[#1c2a42] transition-colors">Servicios</button>
          <button onClick={() => navigateTo('nosotros')} className="hover:text-[#1c2a42] transition-colors">Nosotros</button>
          
          <a href="#contacto" onClick={(e) => { e.preventDefault(); navigateTo('home'); setTimeout(() => document.getElementById('contacto')?.scrollIntoView({behavior: 'smooth'}), 100); }} 
             className="ml-4 px-7 py-3 rounded-full text-white transition-transform hover:scale-105 shadow-lg bg-[#1c2a42] hover:bg-[#142033]">
            Pedir Presupuesto
          </a>
        </nav>

        {/* Botón Menú Móvil */}
        <button className="lg:hidden p-2 text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú Móvil */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} overflow-hidden`}>
        <div className="flex flex-col px-6 py-6 space-y-4">
          <button onClick={() => navigateTo('home')} className="text-left font-bold text-lg text-gray-800 py-2 border-b border-gray-100">Inicio</button>
          <button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('servicios')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-left font-bold text-lg text-gray-800 py-2 border-b border-gray-100">Servicios</button>
          <button onClick={() => navigateTo('nosotros')} className="text-left font-bold text-lg text-gray-800 py-2 border-b border-gray-100">Nosotros</button>
          
          <div className="pt-4 flex flex-col gap-4">
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-gray-600 font-medium"><Phone size={20} className="text-[#1c2a42]"/> {COMPANY.phone}</a>
            <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold text-[#dcb871]">
              <Instagram size={20} /> Instagram
            </a>
            <a href={COMPANY.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold text-blue-500">
              <Facebook size={20} /> Facebook
            </a>
            <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold text-green-500">
              <WhatsApp size={20} /> WhatsApp
            </a>
          </div>
          
          <button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('contacto')?.scrollIntoView(), 100); }} 
             className="w-full mt-4 py-4 rounded-xl text-white font-bold text-center bg-[#1c2a42]">
            Contactar Ahora
          </button>
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-[#0d1520] text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dcb871]/30 to-transparent"></div>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-1">
          <div className="mb-6 bg-white inline-block p-4 rounded-xl">
            <Logo />
          </div>
          <p className="text-gray-400 leading-relaxed font-light mb-8 text-[15px]">
            Especialistas en transformar espacios con materiales de alta calidad, acabados premium y máxima dedicación. Tu proyecto de reforma en las mejores manos.
          </p>
          <div className="flex gap-3">
            <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 transition-all" title="Instagram">
              <Instagram size={20} />
            </a>
            <a href={COMPANY.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all" title="Facebook">
              <Facebook size={20} />
            </a>
            <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-all" title="WhatsApp">
              <WhatsApp size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Contacto</h4>
          <ul className="space-y-4 text-gray-400 text-[15px]">
            <li className="flex items-start gap-3"><MapPin className="shrink-0 mt-1 text-[#dcb871]" size={18} /> <span>{COMPANY.address}</span></li>
            <li className="flex items-center gap-3"><Phone className="text-[#dcb871]" size={18} /> <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">{COMPANY.phone}</a></li>
            <li className="flex items-center gap-3"><Mail className="text-[#dcb871]" size={18} /> <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">{COMPANY.email}</a></li>
          </ul>
          <div className="mt-6 space-y-3">
            <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#dcb871] transition-colors font-medium">
              <Instagram size={18} /> Instagram
            </a>
            <a href={COMPANY.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors font-medium">
              <Facebook size={18} /> Facebook
            </a>
            <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors font-medium">
              <WhatsApp size={18} /> WhatsApp
            </a>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Nuestros Servicios</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-400 text-[15px]">
            {SERVICES.map(service => (
              <button key={service.id} onClick={() => navigateTo('service', service.id)} className="text-left hover:text-[#dcb871] transition-colors flex items-center gap-2 group">
                <ChevronRight size={14} className="text-[#1c2a42] group-hover:text-[#dcb871] transition-colors" /> {service.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Grupo Bendito. Todos los derechos reservados.</p>
        <div className="mt-4 md:mt-0 flex items-center gap-4 text-gray-500">
          <p>Interiorismo · Pladur · Reformas — Caravaca de la Cruz, Murcia</p>
        </div>
      </div>
    </footer>
  );

  // =============================================
  // --- VISTA: PÁGINA NOSOTROS (LANDING PAGE) ---
  // =============================================
  if (currentPage === 'nosotros') {
    return (
      <div className="min-h-screen flex flex-col bg-white font-sans">
        <TopBar />
        <Header />

        <main className="flex-grow">

          {/* HERO NOSOTROS */}
          <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/hero-bg.jpg" 
                alt="Reformas Premium" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1c2a42]/95 via-[#1c2a42]/85 to-[#1c2a42]/95"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10 py-20">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-[#dcb871] font-bold tracking-wide text-sm">
                  <Star size={16} className="fill-[#dcb871]" />
                  ESPECIALISTAS EN PLADUR Y REFORMAS
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                  ¿Cansado de que las reformas te saquen de quicio y dejen la casa{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dcb871] to-yellow-200">hecha un desastre?</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
                  En Grupo Bendito ejecutamos tu pladur con <strong className="text-white font-semibold">precisión quirúrgica</strong>, sin sorpresas de precio y con una limpieza que te deja la casa lista para vivir el mismo día.
                </p>
                <button 
                  onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('contacto')?.scrollIntoView({behavior: 'smooth'}), 100); }}
                  className="px-10 py-5 rounded-xl text-[#1c2a42] font-black text-lg shadow-[0_0_30px_rgba(220,184,113,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(220,184,113,0.6)] bg-[#dcb871] hover:bg-[#e8c97d] cursor-pointer inline-flex items-center gap-3"
                >
                  QUIERO MI PRESUPUESTO GRATIS AHORA <ArrowRight size={22} />
                </button>
              </div>
            </div>
          </section>

          {/* 💥 EL PROBLEMA */}
          <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold text-sm mb-6">
                  <AlertTriangle size={18} /> EL PROBLEMA
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1c2a42] mb-6">
                  Sabemos lo que has vivido
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { text: 'Presupuestos que luego suben un 30% por "imprevistos"' },
                  { text: 'Obreros que desaparecen y vuelven cuando les da la gana' },
                  { text: 'Polvo en todos lados durante semanas' },
                  { text: 'Acabados chapuceros que se ven mal a los 3 meses' },
                  { text: 'Nadie te responde cuando hay un problema' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={16} className="text-red-500" />
                    </div>
                    <p className="text-gray-700 font-medium text-lg">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <div className="inline-block bg-[#1c2a42] text-white px-12 py-6 rounded-2xl shadow-xl">
                  <p className="text-2xl md:text-3xl font-black">No debería ser así.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ✅ LA SOLUCIÓN */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-bold text-sm mb-6">
                  <CheckCircle size={18} /> LA SOLUCIÓN
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1c2a42] mb-6">
                  Transformamos tu espacio sin drama
                </h2>
                <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                  Somos especialistas en <strong className="text-[#1c2a42] font-semibold">pladur decorativo y técnico</strong> en Caravaca de la Cruz y Murcia. No somos "unos chicos que ponen pladur". Somos técnicos de acabados que entendemos que tu casa es tu inversión más importante.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { 
                    icon: <Star size={28} className="text-[#dcb871]" />,
                    title: 'Techos que parecen de revista',
                    desc: 'Decorativos con LED, foseados, diseños personalizados que transforman cualquier estancia.'
                  },
                  { 
                    icon: <Wrench size={28} className="text-[#dcb871]" />,
                    title: 'Soluciones inteligentes',
                    desc: 'Registrables para acceso a instalaciones, insonorización, soluciones para humedades.'
                  },
                  { 
                    icon: <Shield size={28} className="text-[#dcb871]" />,
                    title: 'Acabados que duran',
                    desc: 'Estructuras bien calculadas que no se agrietan ni se caen. Calidad que perdura.'
                  },
                  { 
                    icon: <HomeIcon size={28} className="text-[#dcb871]" />,
                    title: 'Obras limpias',
                    desc: 'Protegemos tu mobiliario, recogemos escombros y dejamos todo usable desde el primer día.'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group flex gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#1c2a42] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1c2a42] mb-2">{item.title}</h3>
                      <p className="text-gray-600 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 🎯 POR QUÉ NOSOTROS */}
          <section className="py-24 bg-[#1c2a42] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#dcb871]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#dcb871]/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#dcb871] font-bold text-sm mb-6">
                  <Eye size={18} /> POR QUÉ NOSOTROS
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Diferenciación real, no palabrería
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#dcb871]/20 flex items-center justify-center mb-6">
                    <Users size={28} className="text-[#dcb871]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">El dueño está en tu obra</h3>
                  <p className="text-gray-300 font-light leading-relaxed text-lg">
                    No mandamos peones ajenos. Yo (Keneth) superviso y ejecuto cada proyecto. Tienes un <strong className="text-white font-semibold">solo interlocutor responsable</strong>.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#dcb871]/20 flex items-center justify-center mb-6">
                    <CheckCircle size={28} className="text-[#dcb871]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Precio cerrado, no "aproximado"</h3>
                  <p className="text-gray-300 font-light leading-relaxed text-lg">
                    Te damos el <strong className="text-white font-semibold">precio exacto antes de empezar</strong>. Si hay que ajustar algo, lo hablamos. Cero sustos en la factura final.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#dcb871]/20 flex items-center justify-center mb-6">
                    <Shield size={28} className="text-[#dcb871]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Garantía de 12 meses real</h3>
                  <p className="text-gray-300 font-light leading-relaxed text-lg">
                    No desaparecemos cuando cobramos. Si algo se agrieta o falla, venimos y lo resolvemos. <strong className="text-white font-semibold">Nuestro nombre vale más que un euro ahorrado.</strong>
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#dcb871]/20 flex items-center justify-center mb-6">
                    <Zap size={28} className="text-[#dcb871]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Especialistas en lo difícil</h3>
                  <p className="text-gray-300 font-light leading-relaxed text-lg">
                    ¿Tienes una estructura americana complicada? ¿Un pasillo estrecho? ¿Alicatados que no quieres dañar? <strong className="text-white font-semibold">Eso es exactamente lo que hacemos mejor.</strong> Los demás te dirán que "no se puede". Nosotros te diremos cómo.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 🛡️ GARANTÍA RIESGO CERO */}
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#dcb871] via-yellow-300 to-[#dcb871]"></div>
                <div className="w-20 h-20 rounded-full bg-[#dcb871]/10 flex items-center justify-center mx-auto mb-8">
                  <Shield size={40} className="text-[#dcb871]" />
                </div>
                <h2 className="text-sm font-bold text-[#dcb871] uppercase tracking-[0.2em] mb-4">Garantía de Riesgo Cero</h2>
                <blockquote className="text-3xl md:text-4xl font-black text-[#1c2a42] leading-tight mb-8">
                  "Si no quedas satisfecho con los acabados finales, no pagas el último tramo."
                </blockquote>
                <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                  Así de claro. Confiamos tanto en nuestro trabajo que asumimos el riesgo contigo.
                </p>
              </div>
            </div>
          </section>

          {/* 📍 CÓMO FUNCIONA */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#1c2a42] font-bold text-sm mb-6">
                  <Clock size={18} /> CÓMO FUNCIONA
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1c2a42] mb-6">
                  Proceso sin fricción
                </h2>
              </div>

              <div className="space-y-0">
                {[
                  { step: '1', title: 'Contáctanos', desc: `Haz clic o llama → WhatsApp al ${COMPANY.whatsappPhone}`, icon: <PhoneCall size={24} className="text-[#dcb871]" /> },
                  { step: '2', title: 'Vamos en 24-48h', desc: 'Medición y diagnóstico gratis en tu domicilio', icon: <MapPin size={24} className="text-[#dcb871]" /> },
                  { step: '3', title: 'Recibes presupuesto', desc: 'Claro, por escrito, sin letra pequeña', icon: <Mail size={24} className="text-[#dcb871]" /> },
                  { step: '4', title: 'Programamos', desc: 'En cuanto tú digas, empezamos la obra', icon: <Clock size={24} className="text-[#dcb871]" /> },
                  { step: '5', title: 'Entregamos', desc: 'Limpio, garantizado, y listo para disfrutar', icon: <CheckCircle size={24} className="text-[#dcb871]" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#1c2a42] flex items-center justify-center text-white text-2xl font-black shadow-lg group-hover:bg-[#dcb871] group-hover:text-[#1c2a42] transition-all">
                        {item.step}
                      </div>
                      {i < 4 && <div className="w-0.5 h-16 bg-gray-200 my-2"></div>}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        {item.icon}
                        <h3 className="text-2xl font-bold text-[#1c2a42]">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 text-lg font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <p className="text-lg text-gray-600 font-medium">
                  ⏱️ <strong className="text-[#1c2a42]">Tiempo promedio:</strong> Techos de 20-30m² en 3-4 días laborables.
                </p>
              </div>
            </div>
          </section>

          {/* 🎁 PROMO LANZAMIENTO */}
          <section className="py-24 bg-gradient-to-br from-[#1c2a42] via-[#253650] to-[#1c2a42] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 border border-[#dcb871] rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 border border-[#dcb871] rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#dcb871] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#dcb871] text-[#1c2a42] font-black text-sm mb-8 shadow-lg animate-pulse">
                 <Zap size={18} /> PROMO LANZAMIENTO 2026
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Los primeros <span className="text-[#dcb871]">10 clientes</span> que contacten esta semana reciben:
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
                {[
                  { icon: <Gift size={32} className="text-[#dcb871]" />, title: 'Diseño LED incluido', desc: 'Diseño de iluminación LED valorado en €150' },
                  { icon: <Shield size={32} className="text-[#dcb871]" />, title: 'Garantía extendida', desc: 'Garantía ampliada a 18 meses' },
                  { icon: <Star size={32} className="text-[#dcb871]" />, title: 'Limpieza incluida', desc: 'Limpieza profesional post-obra incluida' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('contacto')?.scrollIntoView({behavior: 'smooth'}), 100); }}
                className="px-10 py-5 rounded-xl text-[#1c2a42] font-black text-lg shadow-[0_0_30px_rgba(220,184,113,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(220,184,113,0.6)] bg-[#dcb871] hover:bg-[#e8c97d] cursor-pointer inline-flex items-center gap-3"
              >
                SÍ, QUIERO MI PRESUPUESTO GRATIS <ArrowRight size={22} />
              </button>
            </div>
          </section>

          {/* 💬 TESTIMONIO */}
          <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dcb871]/10 text-[#dcb871] font-bold text-sm mb-6">
                  <MessageSquare size={18} /> TESTIMONIOS
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl border border-gray-100 relative">
                <div className="absolute top-8 left-10 text-8xl font-serif text-[#dcb871]/20 leading-none">"</div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-8 justify-center">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={24} className="text-[#dcb871] fill-[#dcb871]" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-10 font-light italic">
                    "Pensaba que poner pladur en el techo viejo iba a ser un caos de polvo durante semanas. Keneth lo hizo en 3 días, protegieron todo el salón, y cuando se fueron ni siquiera tuve que pasar la escoba. El techo con luces quedó espectacular."
                  </blockquote>
                  <div className="text-center">
                    <p className="font-bold text-[#1c2a42] text-lg">María G.</p>
                    <p className="text-gray-500 font-medium">Caravaca de la Cruz</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 📞 CTA FINAL */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl text-center">
              <h2 className="text-4xl md:text-5xl font-black text-[#1c2a42] mb-8 leading-tight">
                Deja de posponer la reforma que tu casa necesita
              </h2>
              <p className="text-xl text-gray-600 font-light mb-4 max-w-2xl mx-auto leading-relaxed">
                Cada mes que pasa con ese techo feo o esa pared mal aislada, pierdes confort y valor en tu vivienda.
              </p>
              <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto">
                Llámanos ahora al <strong className="text-[#1c2a42] font-bold">{COMPANY.whatsappPhone}</strong> o escríbenos por WhatsApp.
              </p>
              <p className="text-lg text-[#dcb871] font-bold mb-10 uppercase tracking-wide">
                Consulta y presupuesto 100% gratis y sin compromiso
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href={COMPANY.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-10 py-5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-black text-lg shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl inline-flex items-center justify-center gap-3"
                >
                  <WhatsApp size={24} /> HABLAR POR WHATSAPP AHORA
                </a>
                <a 
                  href={`tel:${COMPANY.whatsappPhone}`}
                  className="px-10 py-5 rounded-xl bg-[#1c2a42] hover:bg-[#142033] text-white font-black text-lg shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl inline-flex items-center justify-center gap-3"
                >
                  <PhoneCall size={24} /> LLAMAR POR TELÉFONO
                </a>
              </div>
            </div>
          </section>

        </main>

        {/* Botón flotante de WhatsApp */}
        <a 
          href={COMPANY.whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 whatsapp-pulse"
          title="Contáctanos por WhatsApp"
        >
          <WhatsApp size={32} className="text-white" />
        </a>

        <Footer />

        {showAdmin && (
          <AdminPanel
            proyectos={proyectos}
            onSave={handleSaveProjects}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </div>
    );
  }

  // --- VISTA DE SERVICIO DETALLADO ---
  if (currentPage === 'service' && currentService) {
    const serviceData = SERVICES.find(s => s.id === currentService);
    if (!serviceData) return <div />;

    return (
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <TopBar />
        <Header />
        
        <main className="flex-grow">
          {/* Service Hero */}
          <div className="relative h-[40vh] min-h-[300px] flex items-center">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${serviceData.image})` }}
            ></div>
            <div className="container mx-auto px-6 relative z-20">
              <button onClick={() => navigateTo('home')} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium text-sm uppercase tracking-wider">
                <ArrowLeft size={16} /> Volver a inicio
              </button>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                {serviceData.title}
              </h1>
              <div className="w-20 h-1.5 bg-[#dcb871] rounded-full"></div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-20">
            <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
              {/* Contenido Principal */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-blue-50/50">
                      {serviceData.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-[#1c2a42]">Descripción del Servicio</h2>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed mb-12 font-light">
                    {serviceData.fullDesc}
                  </p>

                  <h3 className="text-xl font-bold mb-6 text-[#2a2a2a] flex items-center gap-3">
                    <CheckCircle className="text-[#dcb871]" /> ¿Qué incluye este servicio?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceData.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-50/80 p-4 rounded-xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1c2a42] mt-2 shrink-0"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                <div className="bg-[#1c2a42] rounded-3xl p-8 text-white sticky top-32 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">¿Hablamos sobre tu proyecto?</h3>
                  <p className="text-gray-300 mb-8 font-light leading-relaxed">Ponte en contacto con nuestro equipo de expertos para solicitar un presupuesto sin compromiso para {serviceData.title.toLowerCase()}.</p>
                  
                  <div className="space-y-4">
                    <a href={`tel:${COMPANY.phone}`} className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-bold transition-all bg-[#dcb871] hover:bg-[#cda45a] hover:shadow-lg hover:-translate-y-1">
                      <Phone size={20} /> Llamar ahora
                    </a>
                    <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold transition-all bg-green-500 hover:bg-green-600 hover:shadow-lg hover:-translate-y-1">
                      <WhatsApp size={20} /> WhatsApp
                    </a>
                    <a href={`mailto:${COMPANY.email}`} className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/20 font-bold transition-colors hover:bg-white/10">
                      <Mail size={20} /> Enviar email
                    </a>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-3">Síguenos en redes sociales</p>
                    <div className="flex gap-4">
                      <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-medium hover:text-[#dcb871] transition-colors">
                        <Instagram size={20} /> {COMPANY.instagram}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ===== GALERÍA DE PROYECTOS DEL SERVICIO ===== */}
          <GaleriaProyectos 
            servicioId={currentService} 
            serviceTitle={serviceData.title}
            proyectos={proyectos}
          />
        </main>
        
        <Footer />

        {showAdmin && (
          <AdminPanel
            proyectos={proyectos}
            onSave={handleSaveProjects}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </div>
    );
  }

  // --- VISTA DE INICIO (HOME) ---
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/nosotros-bg.jpg" 
            alt="Interiorismo y Reformas Premium" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1520]/95 via-[#1c2a42]/85 to-[#1c2a42]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520]/60 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-white font-medium tracking-wide text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dcb871] animate-pulse"></span>
              Especialistas en Reformas e Interiorismo · Caravaca, Murcia
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-8 tracking-tight text-balance">
              Construimos espacios{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dcb871] via-[#e8d5a0] to-[#dcb871]">extraordinarios</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-200/90 mb-12 leading-relaxed font-light max-w-2xl">
              Elevamos el nivel de hogares y negocios con soluciones en pladur de alta precisión. {COMPANY.experience} de experiencia garantizan resultados duraderos.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button onClick={() => document.getElementById('contacto')?.scrollIntoView({behavior: 'smooth'})} className="group px-10 py-5 rounded-xl text-[#1c2a42] font-black text-lg text-center shadow-[0_0_30px_rgba(220,184,113,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(220,184,113,0.5)] bg-[#dcb871] hover:bg-[#e8c97d] cursor-pointer inline-flex items-center justify-center gap-3">
                Solicitar Presupuesto <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => document.getElementById('servicios')?.scrollIntoView({behavior: 'smooth'})} className="px-10 py-5 rounded-xl text-white border-2 border-white/20 backdrop-blur-sm font-bold text-lg text-center transition-all hover:bg-white/10 hover:border-white/40 cursor-pointer">
                Ver Nuestros Servicios
              </button>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
      </section>

      {/* Stats / Experiencia */}
      <section className="relative z-20 -mt-12 container mx-auto px-6 animate-scale-in">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100/80">
          <div className="text-center p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center group hover:bg-[#1c2a42]/[0.02] transition-colors">
            <div className="text-5xl font-black text-[#1c2a42] mb-2 group-hover:scale-110 transition-transform duration-300">{COMPANY.experience.replace(' años','')}</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-[0.15em]">Años de Exp.</div>
          </div>
          <div className="text-center p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center group hover:bg-[#1c2a42]/[0.02] transition-colors">
            <div className="text-5xl font-black text-[#1c2a42] mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-[0.15em]">Satisfacción</div>
          </div>
          <div className="text-center p-8 md:p-10 border-b sm:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center group hover:bg-[#1c2a42]/[0.02] transition-colors">
            <Shield size={44} strokeWidth={1.5} className="text-[#dcb871] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-xs text-gray-400 font-bold uppercase tracking-[0.15em]">Calidad Premium</div>
          </div>
          <div className="text-center p-8 md:p-10 flex flex-col items-center justify-center group hover:bg-[#1c2a42]/[0.02] transition-colors">
            <Clock size={44} strokeWidth={1.5} className="text-[#dcb871] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-xs text-gray-400 font-bold uppercase tracking-[0.15em]">Plazos Firmes</div>
          </div>
        </div>
      </section>

      {/* Nosotros Resumen */}
      <section id="nosotros" className="py-28 bg-white mt-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-[#dcb871]/10 rounded-3xl"></div>
                <img 
                  src="/nosotros-bg.jpg" 
                  alt="Grupo Bendito - Nosotros"
                  className="rounded-3xl shadow-2xl w-full object-cover h-[520px] relative z-10"
                />
                <div className="absolute -bottom-8 -right-8 bg-[#1c2a42] text-white p-8 rounded-2xl shadow-2xl z-20 border-4 border-white">
                  <div className="text-4xl font-black text-[#dcb871]">{COMPANY.experience}</div>
                  <div className="text-sm font-bold uppercase tracking-wider mt-1 text-gray-300">de experiencia</div>
                </div>
                <div className="absolute top-6 right-6 bg-[#dcb871] text-[#1c2a42] px-4 py-2 rounded-full font-black text-sm z-20 shadow-lg">
                  ★ 98% Satisfacción
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c2a42]/5 text-[#dcb871] font-bold text-xs uppercase tracking-[0.2em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dcb871]"></span> Quiénes Somos
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-[#1c2a42] mb-8 leading-tight">Nosotros</h3>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                En Grupo Bendito ejecutamos reformas con <strong className="text-[#1c2a42] font-semibold">precisión quirúrgica</strong>, sin sorpresas de precio y con una limpieza que te deja la casa lista para vivir el mismo día.
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                Somos especialistas en pladur decorativo y técnico en Caravaca de la Cruz y Murcia. El dueño está en cada obra. Precio cerrado. Garantía real de 12 meses.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1c2a42]"><CheckCircle size={18} className="text-[#dcb871]" /> Precio cerrado</div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1c2a42]"><CheckCircle size={18} className="text-[#dcb871]" /> Garantía 12 meses</div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1c2a42]"><CheckCircle size={18} className="text-[#dcb871]" /> Obra limpia</div>
              </div>
              <button 
                onClick={() => navigateTo('nosotros')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#1c2a42] hover:bg-[#142033] text-white font-bold text-lg transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Conocer más sobre nosotros <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-28 gradient-section">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c2a42]/5 text-[#dcb871] font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dcb871]"></span> Lo que hacemos
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-[#1c2a42] mb-6 text-balance">Nuestros Servicios</h3>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              Desde pequeñas renovaciones hasta proyectos integrales llave en mano. Aportamos profesionalidad y diseño a cada rincón.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={service.id} className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100/80 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group flex flex-col animate-fade-in-up delay-${index * 100}`}>
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg z-20 group-hover:bg-[#1c2a42] transition-colors duration-300">
                    <div className="group-hover:[&>svg]:stroke-[#dcb871] transition-colors duration-300">{service.icon}</div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-[#1c2a42] group-hover:text-[#dcb871] transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-500 mb-8 font-light leading-relaxed flex-grow">
                    {service.shortDesc}
                  </p>
                  <button 
                    onClick={() => navigateTo('service', service.id)}
                    className="inline-flex items-center justify-between w-full py-4 border-t border-gray-100 font-bold text-[#1c2a42] group-hover:text-[#dcb871] transition-all mt-auto pt-6"
                  >
                    <span className="text-sm uppercase tracking-wider">Más información</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-100 via-pink-100 to-orange-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-green-100 via-pink-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-[2rem] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100/80 text-center max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#1c2a42] mb-4 text-balance">Síguenos en nuestras redes sociales</h2>
            <p className="text-lg text-gray-500 mb-10 font-light max-w-2xl leading-relaxed">
              Descubre el antes y después de nuestros proyectos, ideas de interiorismo y la calidad de nuestros acabados en tiempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg transition-all hover:scale-105 hover:-translate-y-1 shadow-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:shadow-2xl">
                <Instagram size={22} /> Instagram
              </a>
              <a href={COMPANY.facebookUrl} target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg transition-all hover:scale-105 hover:-translate-y-1 shadow-xl bg-[#1877F2] hover:bg-[#1565d8] hover:shadow-2xl">
                <Facebook size={22} /> Facebook
              </a>
              <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg transition-all hover:scale-105 hover:-translate-y-1 shadow-xl bg-[#25D366] hover:bg-[#1ebe5d] hover:shadow-2xl">
                <WhatsApp size={22} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-28 bg-[#1c2a42] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#dcb871]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#dcb871]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-w-6xl mx-auto">
            <div className="lg:w-[45%] p-12 lg:p-16 bg-[#142033] text-white">
              <h2 className="text-sm font-bold text-[#dcb871] uppercase tracking-[0.2em] mb-3">Comencemos</h2>
              <h3 className="text-4xl font-black mb-6">Hablemos de tu proyecto</h3>
              <p className="text-gray-300 mb-12 font-light text-lg">Cuéntanos qué tienes en mente y nuestro equipo preparará un presupuesto a medida sin compromiso.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#dcb871]/20 transition-colors"><MapPin size={28} className="text-[#dcb871]" /></div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Visítanos</h4>
                    <p className="text-gray-400">{COMPANY.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#dcb871]/20 transition-colors"><Phone size={28} className="text-[#dcb871]" /></div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Llámanos</h4>
                    <a href={`tel:${COMPANY.phone}`} className="text-gray-400 hover:text-white text-lg">{COMPANY.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#dcb871]/20 transition-colors"><Mail size={28} className="text-[#dcb871]" /></div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Escríbenos</h4>
                    <a href={`mailto:${COMPANY.email}`} className="text-gray-400 hover:text-white text-lg">{COMPANY.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-green-500/20 transition-colors">
                    <WhatsApp size={28} className="text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">WhatsApp</h4>
                    <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 text-lg">Enviar mensaje</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-[55%] p-12 lg:p-16 bg-white">
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-[#1c2a42] mb-4">¡Gracias!</h3>
                  <p className="text-gray-600 text-lg">Se abrirá tu cliente de correo para enviar los datos. Si no se abre, escríbenos directamente a <strong>{COMPANY.email}</strong></p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nombre completo</label>
                      <input 
                        type="text" 
                        maxLength={60} 
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all" 
                        placeholder="Juan Pérez" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono</label>
                      <input 
                        type="tel" 
                        maxLength={13} 
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all" 
                        placeholder="+34 600 000 000" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Servicio de interés</label>
                    <select 
                      value={formData.servicio}
                      onChange={(e) => setFormData({...formData, servicio: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all appearance-none"
                    >
                      <option value="">Selecciona un servicio...</option>
                      {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Detalles del proyecto</label>
                    <textarea 
                      rows={4} 
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all resize-none" 
                      placeholder="Cuéntanos un poco sobre lo que necesitas..."
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 rounded-xl text-white font-bold text-lg mt-4 transition-all hover:shadow-lg hover:-translate-y-1 bg-[#1c2a42] hover:bg-[#142033] flex items-center justify-center gap-3">
                    <Send size={22} /> Solicitar Presupuesto Gratuito
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">Tus datos están seguros y no serán compartidos con terceros.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Botón flotante de WhatsApp */}
      <a 
        href={COMPANY.whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 whatsapp-pulse"
        title="Contáctanos por WhatsApp"
      >
        <WhatsApp size={32} className="text-white" />
      </a>

      <Footer />

      {showAdmin && (
        <AdminPanel
          proyectos={proyectos}
          onSave={handleSaveProjects}
          onClose={() => setShowAdmin(false)}
        />
      )}


    </div>
  );
}
