export const seedUser = {
  id: 'u-christian',
  name: 'Christian McMillan',
  email: 'christian@comunidadmde.com',
  photo: null,
  xp: 320,
  streak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  badges: ['conectado', 'encontrado'],
  crecerSteps: {
    encuentro: 'completed',  // none | registered | completed
    vida: 'registered',
    influencia: 'none',
  },
  seminarsCompleted: ['escuela-heroes'],
  groupId: 'g-1',
  leaderId: 'p-carlos',
  volunteerApproved: false,
  crecerPlusProgress: { 'teologia-fundamental': 22, 'hechos-29': 0 },
}

export const seedGroups = [
  { id: 'g-1', name: 'Grupo El Poblado', leaderId: 'p-carlos', leaderName: 'Carlos Ruiz', day: 'Martes', time: '7:00pm', neighborhood: 'El Poblado', type: 'Familias', members: 12, maxSize: 16, description: 'Un grupo para familias jóvenes que buscan crecer juntos.' },
  { id: 'g-2', name: 'Grupo Laureles', leaderId: 'p-ana', leaderName: 'Ana Gómez', day: 'Miércoles', time: '6:30pm', neighborhood: 'Laureles', type: 'Mujeres', members: 8, maxSize: 12, description: 'Espacio seguro para mujeres en formación.' },
  { id: 'g-3', name: 'Grupo Envigado', leaderId: 'p-juan', leaderName: 'Juan Martínez', day: 'Jueves', time: '7:30pm', neighborhood: 'Envigado', type: 'Hombres', members: 10, maxSize: 14, description: 'Hombres construyendo legado juntos.' },
  { id: 'g-4', name: 'Grupo Online', leaderId: 'p-sara', leaderName: 'Sara López', day: 'Viernes', time: '8:00pm', neighborhood: 'Online', type: 'Jóvenes', members: 20, maxSize: 30, description: 'Grupo virtual para jóvenes de toda la ciudad.' },
  { id: 'g-5', name: 'Grupo Belén', leaderId: 'p-pedro', leaderName: 'Pedro Castro', day: 'Sábado', time: '4:00pm', neighborhood: 'Belén', type: 'Familias', members: 9, maxSize: 15, description: 'Familia y comunidad en el sector de Belén.' },
]

export const seedEvents = [
  { id: 'ev-1', title: 'Encuentro Mayo', description: 'Retiro de fin de semana en Casa Encuentro, San Antonio de Prado. Una experiencia transformadora de 2 días.', date: '2026-05-23', endDate: '2026-05-24', price: 250000, category: 'Crecer', image: null, capacity: 40, signups: 28, cta: 'Inscribirme' },
  { id: 'ev-2', title: 'Conferencia Comunidad 2026 LEGADO', description: 'Nuestra conferencia anual. 3 noches de encuentro con Dios, adoración y palabra.', date: '2026-06-12', endDate: '2026-06-14', price: 0, category: 'Conferencia', image: null, capacity: 500, signups: 312, cta: 'Registrarme' },
  { id: 'ev-3', title: 'Seminario Escuela de Héroes', description: 'Para padres que quieren pastorear el corazón de sus hijos.', date: '2026-08-09', endDate: '2026-08-10', price: 0, category: 'Seminario', image: null, capacity: 60, signups: 18, cta: 'Inscribirme' },
  { id: 'ev-4', title: 'Semana Santa Comunidad', description: 'Servicios especiales de Semana Santa con adoración en vivo.', date: '2026-04-05', endDate: '2026-04-06', price: 0, category: 'Especial', image: null, capacity: 1000, signups: 600, cta: 'Apartar lugar' },
]

export const seedAnnouncements = [
  { id: 'ann-1', title: '¡Álbum Comunidad Music ya disponible!', body: 'Nuestro nuevo álbum está en todas las plataformas. Escúchalo y compártelo.', publishedAt: '2026-05-14', cta: 'Escuchar', ctaUrl: 'https://open.spotify.com', emoji: '🎵' },
  { id: 'ann-2', title: 'Conferencia 2026 LEGADO', body: 'Inscripciones abiertas para la Conferencia Anual. ¡No te la pierdas!', publishedAt: '2026-05-10', cta: 'Inscribirme', ctaUrl: '#', emoji: '🌟' },
]

export const seedWeekendMessage = {
  title: 'Legado',
  pastor: 'Pastor Alejandro Restrepo',
  verse: 'Salmos 78:4',
  verseText: 'Lo contaremos a la generación venidera las alabanzas de Jehová, y su potencia, y las maravillas que hizo.',
  reuniones: [
    { id: 'sab-5', label: 'Sáb 5pm' },
    { id: 'sab-7', label: 'Sáb 7pm' },
    { id: 'dom-9', label: 'Dom 9am' },
    { id: 'dom-11', label: 'Dom 11am' },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Cuál fue el versículo central del mensaje de este fin de semana?',
      options: ['Juan 3:16', 'Salmos 78:4', 'Romanos 8:28', 'Filipenses 4:13'],
      correct: 1,
    },
    {
      id: 'q2',
      question: '¿A qué nos llama Dios según el mensaje "Legado"?',
      options: [
        'Acumular riquezas para nuestra familia',
        'Contar las obras de Dios a la siguiente generación',
        'Construir una iglesia más grande',
        'Memorizar más versículos bíblicos',
      ],
      correct: 1,
    },
    {
      id: 'q3',
      question: '¿Qué acción concreta mencionó el pastor para comenzar a dejar legado hoy?',
      options: [
        'Aumentar el diezmo este mes',
        'Leer la Biblia una hora cada día',
        'Compartir intencionalmente tu fe con alguien cercano esta semana',
        'Asistir a todas las reuniones del mes',
      ],
      correct: 2,
    },
  ],
}

export const seedDevotional = {
  id: 'dev-today',
  date: new Date().toISOString().split('T')[0],
  title: 'Arraigados en Amor',
  verse: 'Para que habite Cristo por la fe en vuestros corazones, a fin de que, arraigados y cimentados en amor...',
  verseRef: 'Efesios 3:17',
  body: 'Dios no nos llama a conocerlo solo intelectualmente, sino a que Él viva en nosotros. El amor de Cristo no es un concepto — es una presencia que nos transforma desde adentro. Hoy, invita a Jesús a cada espacio de tu corazón.',
  prayer: 'Señor, que mi vida sea un lugar donde tú habites. Que tu amor sea la raíz de todo lo que hago y digo. Amén.',
}

export const seedSeminars = [
  { id: 'sem-1', title: 'Para Siempre', description: 'Para parejas que quieren fortalecer su matrimonio en paz, intimidad y propósito.', emoji: '💍', nextDate: 'Agosto 2026', available: true },
  { id: 'sem-2', title: 'Relaciones Sanas', description: 'Sanidad emocional, relacional y sexual. Relaciones saludables con Dios y otros.', emoji: '🌿', nextDate: 'Agosto 2026', available: true },
  { id: 'sem-3', title: 'Transformación Empresarial', description: 'Convierte tu trabajo en ministerio. Liderazgo de servicio y valores bíblicos.', emoji: '🏢', nextDate: 'Agosto 2026', available: true },
  { id: 'sem-4', title: 'Proyecto Matrimonio', description: 'Para parejas en noviazgo que avanzan hacia un compromiso consciente.', emoji: '💑', nextDate: 'Agosto 2026', available: true },
  { id: 'sem-5', title: 'Escuela de Héroes', description: 'Para papás y mamás aprendiendo a pastorear el corazón de sus hijos.', emoji: '🦸', nextDate: 'Agosto 2026', available: true },
  { id: 'sem-6', title: 'Ruta 128', description: 'Para hombres descubriendo el diseño de Dios para su masculinidad y legado.', emoji: '⚡', nextDate: 'Agosto 2026', available: true },
]
