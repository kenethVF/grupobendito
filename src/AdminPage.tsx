import { useState, useEffect } from 'react';
import { PROYECTOS as PROYECTOS_INICIALES, type Proyecto } from './proyectos';
import { Lock, Plus, Trash2, Save, LogOut, Eye, EyeOff, CheckCircle, X, Upload } from 'lucide-react';

const ADMIN_PASSWORD = 'grupobendito2025';

const SERVICIOS_OPTIONS = [
  { id: 'reformas-integrales', label: 'Reformas Integrales' },
  { id: 'cocinas-y-banos', label: 'Cocinas y Baños' },
  { id: 'reformas-comerciales', label: 'Reformas Comerciales' },
  { id: 'reformas-nueva-obra', label: 'Reformas de Nueva Obra' },
  { id: 'reparaciones-mantenimiento', label: 'Reparaciones y Mantenimientos' },
  { id: 'reformas-pladur', label: 'Especialistas en Pladur' },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newFoto, setNewFoto] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('gb_admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
    
    try {
      const saved = localStorage.getItem('grupobendito_proyectos');
      setProyectos(saved ? JSON.parse(saved) : PROYECTOS_INICIALES);
    } catch {
      setProyectos(PROYECTOS_INICIALES);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('gb_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('gb_admin_auth');
  };

  const handleSave = () => {
    localStorage.setItem('grupobendito_proyectos', JSON.stringify(proyectos));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddProyecto = () => {
    const newId = Math.max(0, ...proyectos.map(p => p.id)) + 1;
    const nuevo: Proyecto = {
      id: newId,
      titulo: 'Nuevo Proyecto',
      descripcion: '',
      servicio: 'reformas-integrales',
      fecha: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      fotos: [],
      destacado: false,
    };
    setProyectos([...proyectos, nuevo]);
    setEditingId(newId);
  };

  const handleDeleteProyecto = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      setProyectos(proyectos.filter(p => p.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const updateProyecto = (id: number, field: keyof Proyecto, value: unknown) => {
    setProyectos(proyectos.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddFoto = (id: number) => {
    if (!newFoto.trim()) return;
    const proyecto = proyectos.find(p => p.id === id);
    if (proyecto) {
      updateProyecto(id, 'fotos', [...proyecto.fotos, newFoto.trim()]);
      setNewFoto('');
    }
  };

  const handleRemoveFoto = (id: number, fotoIndex: number) => {
    const proyecto = proyectos.find(p => p.id === id);
    if (proyecto) {
      updateProyecto(id, 'fotos', proyecto.fotos.filter((_, i) => i !== fotoIndex));
    }
  };

  // --- PANTALLA DE LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1520] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-2xl bg-[#1c2a42] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Lock size={36} className="text-[#dcb871]" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Panel de Administración</h1>
            <p className="text-gray-400">Grupo Bendito — Acceso privado</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-300 mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-5 py-4 rounded-xl bg-white/10 border ${loginError ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dcb871] focus:border-transparent transition-all`}
                  placeholder="Introduce la contraseña..."
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {loginError && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <X size={14} /> Contraseña incorrecta. Inténtalo de nuevo.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#dcb871] hover:bg-[#e8c97d] text-[#1c2a42] font-black text-lg transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Entrar al Panel
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            <a href="/" className="hover:text-gray-400 transition-colors">← Volver a la web</a>
          </p>
        </div>
      </div>
    );
  }

  // --- PANEL PRINCIPAL ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <div className="bg-[#0d1520] text-white py-4 px-6 flex justify-between items-center shadow-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#dcb871] flex items-center justify-center">
            <Lock size={20} className="text-[#1c2a42]" />
          </div>
          <div>
            <h1 className="font-black text-lg">Panel Admin</h1>
            <p className="text-gray-400 text-xs">Grupo Bendito — Gestión de Proyectos</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {saved && (
            <div className="flex items-center gap-2 text-green-400 font-semibold text-sm bg-green-400/10 px-4 py-2 rounded-full">
              <CheckCircle size={16} /> Guardado correctamente
            </div>
          )}
          <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Ver web →
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Instrucciones */}
        <div className="bg-[#1c2a42] text-white rounded-2xl p-6 mb-8 border border-[#dcb871]/20">
          <h2 className="font-black text-xl mb-3 text-[#dcb871]">📸 Cómo añadir fotos a los proyectos</h2>
          <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside">
            <li>Sube tu foto a la carpeta <code className="bg-white/10 px-2 py-0.5 rounded text-[#dcb871]">httpdocs/proyectos/</code> en Plesk (Administrador de Archivos)</li>
            <li>Aquí abajo, en el proyecto que quieras, escribe el nombre exacto del archivo (ej: <code className="bg-white/10 px-2 py-0.5 rounded text-[#dcb871]">salon-caravaca.jpg</code>)</li>
            <li>Haz clic en "Añadir foto"</li>
            <li>Pulsa el botón <strong className="text-[#dcb871]">"Guardar todos los cambios"</strong></li>
          </ol>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-[#1c2a42]">
            Proyectos realizados <span className="text-gray-400 font-normal text-lg">({proyectos.length})</span>
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleAddProyecto}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1c2a42] text-white font-bold hover:bg-[#142033] transition-all shadow-md hover:-translate-y-0.5"
            >
              <Plus size={18} /> Añadir proyecto
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#dcb871] text-[#1c2a42] font-black hover:bg-[#e8c97d] transition-all shadow-md hover:-translate-y-0.5"
            >
              <Save size={18} /> Guardar todos los cambios
            </button>
          </div>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-4">
          {proyectos.length === 0 && (
            <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
              <Upload size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No hay proyectos todavía</p>
              <p className="text-sm">Haz clic en "Añadir proyecto" para empezar</p>
            </div>
          )}

          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Cabecera del proyecto */}
              <div
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setEditingId(editingId === proyecto.id ? null : proyecto.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${proyecto.destacado ? 'bg-[#dcb871]' : 'bg-gray-200'}`}>
                    {proyecto.destacado ? '⭐' : proyecto.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{proyecto.titulo}</h3>
                    <p className="text-gray-400 text-sm">
                      {SERVICIOS_OPTIONS.find(s => s.id === proyecto.servicio)?.label} · {proyecto.fecha} · {proyecto.fotos.length} foto{proyecto.fotos.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteProyecto(proyecto.id); }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${editingId === proyecto.id ? 'bg-[#1c2a42] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <span className="text-xs font-bold">{editingId === proyecto.id ? '▲' : '▼'}</span>
                  </div>
                </div>
              </div>

              {/* Formulario de edición */}
              {editingId === proyecto.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-5 space-y-5 bg-gray-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Título del proyecto</label>
                      <input
                        type="text"
                        value={proyecto.titulo}
                        onChange={(e) => updateProyecto(proyecto.id, 'titulo', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all bg-white"
                        placeholder="Ej: Reforma salón en Caravaca"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Fecha</label>
                      <input
                        type="text"
                        value={proyecto.fecha}
                        onChange={(e) => updateProyecto(proyecto.id, 'fecha', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all bg-white"
                        placeholder="Ej: Enero 2026"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Descripción / Comentario</label>
                    <textarea
                      rows={3}
                      value={proyecto.descripcion}
                      onChange={(e) => updateProyecto(proyecto.id, 'descripcion', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all bg-white resize-none"
                      placeholder="Describe el trabajo realizado, los materiales usados, el resultado final..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Categoría / Servicio</label>
                    <select
                      value={proyecto.servicio}
                      onChange={(e) => updateProyecto(proyecto.id, 'servicio', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all bg-white"
                    >
                      {SERVICIOS_OPTIONS.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fotos */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Fotos ({proyecto.fotos.length})
                    </label>
                    <div className="space-y-2 mb-3">
                      {proyecto.fotos.map((foto, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                            <img
                              src={`/proyectos/${foto}`}
                              alt={foto}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).src = ''; }}
                            />
                          </div>
                          <span className="flex-grow text-sm text-gray-600 font-mono">{foto}</span>
                          <button
                            onClick={() => handleRemoveFoto(proyecto.id, idx)}
                            className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFoto}
                        onChange={(e) => setNewFoto(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddFoto(proyecto.id)}
                        className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1c2a42] focus:border-transparent outline-none transition-all bg-white text-sm font-mono"
                        placeholder="nombre-foto.jpg"
                      />
                      <button
                        onClick={() => handleAddFoto(proyecto.id)}
                        className="px-5 py-3 rounded-xl bg-[#1c2a42] text-white font-bold hover:bg-[#142033] transition-all flex items-center gap-2"
                      >
                        <Plus size={16} /> Añadir foto
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      ⚠️ Primero sube la foto a <code className="bg-gray-100 px-1 rounded">httpdocs/proyectos/</code> en Plesk, luego escribe aquí el nombre exacto del archivo.
                    </p>
                  </div>

                  {/* Destacado */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => updateProyecto(proyecto.id, 'destacado', !proyecto.destacado)}
                      className={`w-12 h-6 rounded-full transition-all ${proyecto.destacado ? 'bg-[#dcb871]' : 'bg-gray-300'} relative`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${proyecto.destacado ? 'left-6' : 'left-0.5'}`} />
                    </button>
                    <span className="text-sm font-semibold text-gray-700">
                      Proyecto destacado {proyecto.destacado ? '⭐ (aparece primero)' : '(sin destacar)'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Guardar al final también */}
        {proyectos.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#dcb871] text-[#1c2a42] font-black text-lg hover:bg-[#e8c97d] transition-all shadow-lg hover:-translate-y-0.5"
            >
              <Save size={22} /> Guardar todos los cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
