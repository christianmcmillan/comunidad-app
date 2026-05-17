export const expServiceTypes = [
  { id: 'st-1', name: 'Reuniones Fines de Semana', shortName: 'Fines de Semana', color: '#6366f1', description: 'Servicios del sábado y domingo' },
  { id: 'st-2', name: 'Eventos', shortName: 'Eventos', color: '#f59e0b', description: 'Eventos especiales' },
  { id: 'st-3', name: 'Crecer', shortName: 'Crecer', color: '#10b981', description: 'Discipulado' },
]

export const expPeople = [
  { id: 'p-christian', firstName: 'Christian', lastName: 'McMillan', email: 'cris@fepaisa.com', role: 'administrator', teamIds: ['team-prod', 'team-music'] },
  { id: 'p-andres', firstName: 'Andrés', lastName: 'Pérez', email: 'andres@gmail.com', role: 'editor', teamIds: ['team-av'] },
  { id: 'p-camila-r', firstName: 'Camila', lastName: 'Rovira', email: 'camila@gmail.com', role: 'editor', teamIds: ['team-music'] },
  { id: 'p-alejandro', firstName: 'Alejandro', lastName: 'Ruiz', email: 'alejandro@gmail.com', role: 'scheduled_viewer', teamIds: ['team-presidir'] },
  { id: 'p-sara-p', firstName: 'Sara', lastName: 'Pino', email: 'sara@gmail.com', role: 'scheduled_viewer', teamIds: ['team-foto'] },
  { id: 'p-jassir', firstName: 'Jassir', lastName: 'Anaya', email: 'jassir@gmail.com', role: 'editor', teamIds: ['team-edicion'] },
]

export const expTeams = [
  { id: 'team-prod', name: 'Producción', category: 'Técnico', color: '#6366f1', leaders: ['p-christian'], positions: [
    { id: 'pos-cam1', name: 'Cámara 1' }, { id: 'pos-cam2', name: 'Cámara 2 - Dolly' },
    { id: 'pos-luces', name: 'Luces' }, { id: 'pos-producer', name: 'Productor' },
    { id: 'pos-propres', name: 'ProPresenter' }, { id: 'pos-videomaster', name: 'Video Master' },
  ]},
  { id: 'team-av', name: 'Audio / Visual', category: 'Técnico', color: '#8b5cf6', leaders: ['p-andres'], positions: [
    { id: 'pos-av-foh', name: 'Sonido (FOH)' }, { id: 'pos-av-iem', name: 'Monitores (IEM)' },
    { id: 'pos-av-stream', name: 'Transmisión' },
  ]},
  { id: 'team-music', name: 'Música', category: 'Música', color: '#ec4899', leaders: ['p-camila-r'], positions: [
    { id: 'pos-dir-mus', name: 'Director Musical' }, { id: 'pos-vocal', name: 'Vocalista' },
    { id: 'pos-guitar', name: 'Guitarra' }, { id: 'pos-bass', name: 'Bajo' },
    { id: 'pos-keys', name: 'Teclados' }, { id: 'pos-drums', name: 'Batería' },
  ]},
  { id: 'team-presidir', name: 'Presidir', category: 'Servicio', color: '#10b981', leaders: ['p-alejandro'], positions: [
    { id: 'pos-pres', name: 'Presentador' }, { id: 'pos-orador', name: 'Orador' },
  ]},
  { id: 'team-foto', name: 'Fotografía', category: 'Técnico', color: '#14b8a6', leaders: ['p-sara-p'], positions: [
    { id: 'pos-foto-1', name: 'Fotógrafo Principal' }, { id: 'pos-foto-2', name: 'Fotógrafo Secundario' },
  ]},
  { id: 'team-edicion', name: 'Edición', category: 'Técnico', color: '#f97316', leaders: ['p-jassir'], positions: [
    { id: 'pos-ed-video', name: 'Editor de Video' }, { id: 'pos-ed-audio', name: 'Editor de Audio' },
  ]},
]

export const expSongs = [
  { id: 'song-1', title: 'Así Peleo Mis Batallas', artist: 'Generación 12', bpm: 69, keys: ['A', 'B'] },
  { id: 'song-2', title: 'Agradarte', artist: 'Comunidad Music', bpm: 130, keys: ['G'] },
  { id: 'song-7', title: 'Alegras mis días', artist: 'Comunidad Music', bpm: 128, keys: ['Abm'] },
  { id: 'song-14', title: 'Tu Fidelidad', artist: 'Comunidad Music', bpm: 72, keys: ['C', 'D'] },
]

export const expPlans = [
  {
    id: 'plan-1',
    serviceTypeId: 'st-1',
    title: 'Reuniones Fines de Semana',
    dates: ['2026-05-16', '2026-05-17'],
    status: 'published',
    times: [
      { id: 't-sab5', name: 'Sáb 5pm', datetime: '2026-05-17T17:00:00', isRehearsal: false },
      { id: 't-sab7', name: 'Sáb 7pm', datetime: '2026-05-17T19:00:00', isRehearsal: false },
      { id: 't-dom9', name: 'Dom 9am', datetime: '2026-05-18T09:00:00', isRehearsal: false },
      { id: 't-dom11', name: 'Dom 11am', datetime: '2026-05-18T11:00:00', isRehearsal: false },
    ],
    order: [
      { id: 'oi-1', type: 'section', title: 'ANTES DEL SERVICIO', position: 0, duration: 0, beforeService: true },
      { id: 'oi-2', type: 'song', title: 'Alegras mis días', position: 1, duration: 240, songId: 'song-7', key: 'Abm' },
      { id: 'oi-3', type: 'song', title: 'Agradarte', position: 2, duration: 300, songId: 'song-2', key: 'G' },
      { id: 'oi-4', type: 'section', title: 'SERVICIO', position: 3, duration: 0 },
      { id: 'oi-5', type: 'spoken', title: 'Bienvenida', position: 4, duration: 180 },
      { id: 'oi-6', type: 'song', title: 'Así Peleo Mis Batallas', position: 5, duration: 360, songId: 'song-1', key: 'A' },
      { id: 'oi-7', type: 'song', title: 'Tu Fidelidad', position: 6, duration: 300, songId: 'song-14', key: 'C' },
      { id: 'oi-8', type: 'spoken', title: 'Anuncios', position: 7, duration: 300 },
      { id: 'oi-9', type: 'media', title: 'Video Ofrendas', position: 8, duration: 120 },
      { id: 'oi-10', type: 'spoken', title: 'Mensaje — "Legado"', position: 9, duration: 2700, notes: 'Pastor Alejandro Ruiz' },
      { id: 'oi-11', type: 'spoken', title: 'Oración de Cierre', position: 10, duration: 300 },
    ],
    assignments: [
      { id: 'a-1', timeId: 't-sab5', teamId: 'team-music', positionId: 'pos-dir-mus', personId: 'p-camila-r', status: 'confirmed' },
      { id: 'a-2', timeId: 't-sab5', teamId: 'team-av', positionId: 'pos-av-foh', personId: 'p-andres', status: 'confirmed' },
      { id: 'a-3', timeId: 't-sab5', teamId: 'team-presidir', positionId: 'pos-pres', personId: 'p-alejandro', status: 'invited' },
      { id: 'a-4', timeId: 't-sab5', teamId: 'team-prod', positionId: 'pos-producer', personId: 'p-christian', status: 'confirmed' },
      { id: 'a-5', timeId: 't-dom9', teamId: 'team-music', positionId: 'pos-dir-mus', personId: 'p-camila-r', status: 'confirmed' },
      { id: 'a-6', timeId: 't-dom9', teamId: 'team-prod', positionId: 'pos-producer', personId: 'p-christian', status: 'invited' },
    ],
    notes: [
      { id: 'n-1', title: 'Temas del mensaje', body: 'Serie: LEGADO. Semana 3 de 4. Texto base: Proverbios 13:22', createdAt: '2026-05-10T10:00:00' },
    ],
  },
  {
    id: 'plan-2',
    serviceTypeId: 'st-2',
    title: 'Conferencia 2026 LEGADO',
    dates: ['2026-06-12', '2026-06-13', '2026-06-14'],
    status: 'draft',
    times: [
      { id: 't-jue', name: 'Jue 7pm', datetime: '2026-06-12T19:00:00', isRehearsal: false },
      { id: 't-vie', name: 'Vie 7pm', datetime: '2026-06-13T19:00:00', isRehearsal: false },
      { id: 't-sab-conf', name: 'Sáb 5pm', datetime: '2026-06-14T17:00:00', isRehearsal: false },
    ],
    order: [
      { id: 'oi-c1', type: 'section', title: 'APERTURA', position: 0, duration: 0 },
      { id: 'oi-c2', type: 'spoken', title: 'Bienvenida Conferencia', position: 1, duration: 300 },
      { id: 'oi-c3', type: 'song', title: 'Bloque de Alabanza', position: 2, duration: 1800 },
      { id: 'oi-c4', type: 'spoken', title: 'Palabra — Noche 1', position: 3, duration: 3600 },
    ],
    assignments: [],
    notes: [],
  },
]
