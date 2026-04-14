import { useState } from 'react';
import { Plus, Trash2, Save, Lock, LogOut, Eye, EyeOff, CheckCircle, X, Image } from 'lucide-react';

// ⚠️ CAMBIA ESTA CONTRASEÑA POR UNA SEGURA
const ADMIN_PASSWORD = "grupobendito2025";

const SERVICIOS_OPCIONES = [
  { id: "reformas-integrales", label: "Reformas Integrales" },
  { id: "cocinas-y-banos", label: "Cocinas y Baños" },
  { id: "reformas-comerciales", label: "Reformas Comerciales" },
  { id: "reformas-nueva-obra", label: "Reformas de Nueva Obra" },
  { id: "reparaciones-mantenimiento", label: "Reparaciones y Mantenimiento" },
  { id: "reformas-pladur", label: "Especialistas en Pladur" },
];

type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  servicio: string;
  fecha: string;
  fotos: string[];
  destacado: boolean;
};

type AdminPanelProps = {
  proyectos: Proyecto[];
  onSave: (proyectos: Proyecto[]) => void;
  onClose: () => void;
};

export default function AdminPanel({ proyectos, onSave, onClose }: AdminPanelProps) {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const [listaProyectos, setListaProyectos] = useState<Proyecto[]>(proyectos);
  const [guardado, setGuardado] = useState(false);

  const COLORS = {
    primary: '#1c2a42',
    accent: '#dcb871'
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAutenticado(true);
      setErrorLogin('');
    } else {
      setErrorLogin('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  const nuevoProyecto = (): Proyecto => ({
    id: Date.now(),
    titulo: '',
    descripcion: '',
    servicio: 'reformas-integrales',
    fecha: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
    fotos: [],
    destacado: false
  });

  const handleGuardar = () => {
    onSave(listaProyectos);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const handleEliminar = (id: number) => {
    if (confirm('¿Seguro que quieres eliminar este proyecto?')) {
      setListaProyectos(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEditarCampo = (id: number, campo: keyof Proyecto, valor: any) => {
    setListaProyectos(prev =>
      prev.map(p => p.id === id ? { ...p, [campo]: valor } : p)
    );
  };

  const handleAñadirFoto = (id: number, nombreFoto: string) => {
    if (!nombreFoto.trim()) return;
    setListaProyectos(prev =>
      prev.map(p => p.id === id ? { ...p, fotos: [...p.fotos, nombreFoto.trim()] } : p)
    );
  };

  const handleEliminarFoto = (proyectoId: number, fotoIndex: number) => {
    setListaProyectos(prev =>
      prev.map(p => p.id === proyectoId
        ? { ...p, fotos: p.fotos.filter((_, i) => i !== fotoIndex) }
        : p
      )
    );
  };

  const handleAñadirProyecto = () => {
    const nuevo = nuevoProyecto();
    setListaProyectos(prev => [nuevo, ...prev]);
  };

  // --- PANTALLA DE LOGIN ---
  if (!autenticado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: COLORS.primary }}>
              <Lock size={28} color="white" />
            </div>
            <h2 className="text-2xl font-black" style={{ color: COLORS.primary }}>Panel de Administración</h2>
            <p className="text-gray-500 mt-2">Introduce la contraseña para continuar</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Contraseña de administrador"
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1c2a42] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errorLogin && (
              <p className="text-red-500 text-sm flex items-center gap-2">
                <X size={16} /> {errorLogin}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl text-white font-bold text-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: COLORS.primary }}
            >
              Entrar
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PANEL DE ADMINISTRACIÓN ---
  return (
    <div className="fixed inset-0 z-50 bg-gray-100 overflow-auto">
      {/* Header del panel */}
      <div className="sticky top-0 z-10 shadow-md px-6 py-4 flex items-center justify-between" style={{ backgroundColor: COLORS.primary }}>
        <div>
          <h1 className="text-xl font-black text-white">Panel de Administración</h1>
          <p className="text-gray-300 text-sm">Grupo Bendito — Gestión de Proyectos</p>
        </div>
        <div className="flex items-center gap-3">
          {guardado && (
            <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <CheckCircle size={16} /> ¡Guardado!
            </div>
          )}
          <button
            onClick={handleGuardar}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            <Save size={18} /> Guardar Cambios
          </button>
          <button
            onClick={() => setAutenticado(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm"
          >
            <LogOut size={16} /> Salir
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm"
          >
            <X size={16} /> Cerrar
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Instrucciones */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Image size={18} /> Cómo añadir fotos a un proyecto:
          </h3>
          <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
            <li>Sube tus fotos a la carpeta <code className="bg-blue-100 px-1 rounded">httpdocs/proyectos/</code> en Plesk</li>
            <li>Escribe el nombre exacto del archivo (ej: <code className="bg-blue-100 px-1 rounded">salon-caravaca.jpg</code>) en el campo de fotos</li>
            <li>Pulsa <strong>"Añadir foto"</strong></li>
            <li>Pulsa <strong>"Guardar Cambios"</strong> cuando termines</li>
          </ol>
        </div>

        {/* Botón añadir proyecto */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black" style={{ color: COLORS.primary }}>
            Proyectos ({listaProyectos.length})
          </h2>
          <button
            onClick={handleAñadirProyecto}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Plus size={20} /> Añadir Nuevo Proyecto
          </button>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-6">
          {listaProyectos.map((proyecto) => (
            <ProyectoCard
              key={proyecto.id}
              proyecto={proyecto}
              onCambiarCampo={handleEditarCampo}
              onEliminar={handleEliminar}
              onAñadirFoto={handleAñadirFoto}
              onEliminarFoto={handleEliminarFoto}
              colors={COLORS}
            />
          ))}

          {listaProyectos.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-lg mb-4">No hay proyectos aún</p>
              <button
                onClick={handleAñadirProyecto}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold mx-auto"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Plus size={20} /> Añadir primer proyecto
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- TARJETA DE PROYECTO EDITABLE ---
type ProyectoCardProps = {
  proyecto: Proyecto;
  onCambiarCampo: (id: number, campo: keyof Proyecto, valor: any) => void;
  onEliminar: (id: number) => void;
  onAñadirFoto: (id: number, foto: string) => void;
  onEliminarFoto: (proyectoId: number, fotoIndex: number) => void;
  colors: { primary: string; accent: string };
};

function ProyectoCard({ proyecto, onCambiarCampo, onEliminar, onAñadirFoto, onEliminarFoto, colors }: ProyectoCardProps) {
  const [nuevaFoto, setNuevaFoto] = useState('');

  const handleAñadirFoto = () => {
    if (nuevaFoto.trim()) {
      onAñadirFoto(proyecto.id, nuevaFoto);
      setNuevaFoto('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header de la tarjeta */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100" style={{ backgroundColor: `${colors.primary}08` }}>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: colors.primary }}>
            ID #{proyecto.id}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {SERVICIOS_OPCIONES.find(s => s.id === proyecto.servicio)?.label || proyecto.servicio}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={proyecto.destacado}
              onChange={e => onCambiarCampo(proyecto.id, 'destacado', e.target.checked)}
              className="w-4 h-4 accent-yellow-500"
            />
            Destacado
          </label>
          <button
            onClick={() => onEliminar(proyecto.id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-colors"
          >
            <Trash2 size={14} /> Eliminar
          </button>
        </div>
      </div>

      {/* Cuerpo editable */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Título */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Título del Proyecto</label>
            <input
              type="text"
              value={proyecto.titulo}
              onChange={e => onCambiarCampo(proyecto.id, 'titulo', e.target.value)}
              placeholder="Ej: Reforma integral en Caravaca"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1c2a42] transition-colors text-sm"
            />
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Fecha</label>
            <input
              type="text"
              value={proyecto.fecha}
              onChange={e => onCambiarCampo(proyecto.id, 'fecha', e.target.value)}
              placeholder="Ej: Enero 2025"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1c2a42] transition-colors text-sm"
            />
          </div>
        </div>

        {/* Servicio */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Categoría / Servicio</label>
          <select
            value={proyecto.servicio}
            onChange={e => onCambiarCampo(proyecto.id, 'servicio', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1c2a42] transition-colors text-sm"
          >
            {SERVICIOS_OPCIONES.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Descripción / Comentario</label>
          <textarea
            value={proyecto.descripcion}
            onChange={e => onCambiarCampo(proyecto.id, 'descripcion', e.target.value)}
            placeholder="Describe el trabajo realizado, materiales usados, resultado..."
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1c2a42] transition-colors text-sm resize-none"
          />
        </div>

        {/* Fotos */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Fotos del Proyecto ({proyecto.fotos.length} añadidas)
          </label>

          {/* Lista de fotos actuales */}
          {proyecto.fotos.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {proyecto.fotos.map((foto, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-sm">
                  <Image size={14} className="text-gray-500" />
                  <span className="text-gray-700">{foto}</span>
                  <button
                    onClick={() => onEliminarFoto(proyecto.id, index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Añadir nueva foto */}
          <div className="flex gap-2">
            <input
              type="text"
              value={nuevaFoto}
              onChange={e => setNuevaFoto(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAñadirFoto()}
              placeholder="Nombre del archivo: salon.jpg, cocina-nueva.jpg..."
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1c2a42] transition-colors text-sm"
            />
            <button
              onClick={handleAñadirFoto}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              <Plus size={16} /> Añadir foto
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            📁 Sube las fotos a <code>httpdocs/proyectos/</code> en Plesk con el mismo nombre exacto
          </p>
        </div>
      </div>
    </div>
  );
}
