import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, CheckCircle2, Circle, MessageCircle, ChevronDown, ChevronRight } from 'lucide-react'
import useUserStore from '../../store/useUserStore'

const COURSES = {
  'teologia-fundamental': {
    title: 'Teología Fundamental',
    emoji: '📜',
    description: 'Un recorrido por las doctrinas esenciales de la fe cristiana.',
    color: '#FF6B2C',
    modules: [
      {
        id: 'm1', title: 'Bienvenido', emoji: '📚',
        lessons: [
          { id: 'l1-1', title: '¡Bienvenido/a a Teología Fundamental!', type: 'text',  duration: '2 min',  videoId: null },
          { id: 'l1-2', title: 'Introducción Teología Fundamental',      type: 'video', duration: '5:24', videoId: 'dQw4w9WgXcQ' },
          { id: 'l1-3', title: 'Descarga las notas del curso',           type: 'file',  duration: null,   videoId: null },
        ],
      },
      {
        id: 'm2', title: 'La Biblia', emoji: '📖',
        lessons: [
          { id: 'l2-1', title: '¿Qué es la Biblia?',                    type: 'video', duration: '8:12', videoId: 'dQw4w9WgXcQ' },
          { id: 'l2-2', title: 'Inspiración e inerrancia',              type: 'video', duration: '11:34', videoId: 'dQw4w9WgXcQ' },
          { id: 'l2-3', title: 'Cómo leer la Biblia',                   type: 'video', duration: '9:05', videoId: 'dQw4w9WgXcQ' },
        ],
      },
      {
        id: 'm3', title: 'Dios', emoji: '✨',
        lessons: [
          { id: 'l3-1', title: 'Los atributos de Dios',                 type: 'video', duration: '14:20', videoId: 'dQw4w9WgXcQ' },
          { id: 'l3-2', title: 'La Trinidad',                           type: 'video', duration: '12:48', videoId: 'dQw4w9WgXcQ' },
        ],
      },
      {
        id: 'm4', title: 'Jesucristo', emoji: '✝️',
        lessons: [
          { id: 'l4-1', title: 'La persona de Cristo',                  type: 'video', duration: '13:15', videoId: 'dQw4w9WgXcQ' },
          { id: 'l4-2', title: 'La obra de Cristo',                     type: 'video', duration: '10:40', videoId: 'dQw4w9WgXcQ' },
        ],
      },
      {
        id: 'm5', title: 'El Espíritu Santo', emoji: '🕊️',
        lessons: [
          { id: 'l5-1', title: '¿Quién es el Espíritu Santo?',          type: 'video', duration: '11:00', videoId: 'dQw4w9WgXcQ' },
          { id: 'l5-2', title: 'Los dones del Espíritu',                type: 'video', duration: '15:22', videoId: 'dQw4w9WgXcQ' },
        ],
      },
    ],
  },
  'hechos-29': {
    title: 'Hechos 29',
    emoji: '⚡',
    description: 'La historia de la iglesia continúa. Tu parte en la misión.',
    color: '#FF6B2C',
    modules: [
      {
        id: 'm1', title: 'La Iglesia Primitiva', emoji: '🏛️',
        lessons: [
          { id: 'l1-1', title: 'El libro de los Hechos',                type: 'video', duration: '7:30', videoId: 'dQw4w9WgXcQ' },
          { id: 'l1-2', title: 'Pentecostés: el nacimiento de la iglesia', type: 'video', duration: '9:15', videoId: 'dQw4w9WgXcQ' },
        ],
      },
      {
        id: 'm2', title: 'Misión y Expansión', emoji: '🌍',
        lessons: [
          { id: 'l2-1', title: 'El mandato misionero',                  type: 'video', duration: '11:00', videoId: 'dQw4w9WgXcQ' },
          { id: 'l2-2', title: 'Pablo y los viajes misioneros',         type: 'video', duration: '13:45', videoId: 'dQw4w9WgXcQ' },
          { id: 'l2-3', title: 'La iglesia en Colombia',                type: 'video', duration: '8:20', videoId: 'dQw4w9WgXcQ' },
        ],
      },
      {
        id: 'm3', title: 'Tu Historia', emoji: '✍️',
        lessons: [
          { id: 'l3-1', title: '¿Cuál es tu parte en la historia?',     type: 'video', duration: '10:00', videoId: 'dQw4w9WgXcQ' },
          { id: 'l3-2', title: 'Vivir en misión',                       type: 'video', duration: '12:30', videoId: 'dQw4w9WgXcQ' },
        ],
      },
    ],
  },
}

const TYPE_ICON = {
  video: '🎬',
  text:  '📄',
  file:  '📎',
}

export default function CrecerPlusCoursePage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { crecerPlusProgress, addXP } = useUserStore()

  const course = COURSES[courseId]
  if (!course) return (
    <div className="p-4 text-sm" style={{ color: '#888' }}>
      Curso no encontrado.{' '}
      <button onClick={() => navigate('/discipulado')} style={{ color: '#FF6B2C' }} className="underline">Volver</button>
    </div>
  )

  const progress = crecerPlusProgress[courseId] ?? 0
  const allLessons = course.modules.flatMap(m => m.lessons)
  const completedCount = Math.round((progress / 100) * allLessons.length)

  const [activeLesson, setActiveLesson] = useState(allLessons[Math.max(0, completedCount - 1)] || allLessons[0])
  const [expandedModules, setExpandedModules] = useState({ [course.modules[0].id]: true })
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const isCompleted = (lessonId) => {
    const idx = allLessons.findIndex(l => l.id === lessonId)
    return idx < completedCount
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }))
  }

  const handleSubmitComment = () => {
    if (!comment.trim()) return
    setComments(prev => [{ id: Date.now(), text: comment, author: 'Christian M.', time: 'Ahora' }, ...prev])
    setComment('')
    addXP(5)
  }

  return (
    <div className="min-h-screen" style={{ background: '#1a1a1a' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 backdrop-blur px-4 py-3 flex items-center gap-3"
        style={{ background: 'rgba(26,26,26,0.95)', borderBottom: '1px solid #2e2e2e' }}
      >
        <button onClick={() => navigate('/discipulado')} style={{ color: '#888' }} className="hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{course.title}</p>
          <p className="text-xs" style={{ color: '#888' }}>{progress}% completado</p>
        </div>
        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: '#333' }}>
          <div className="h-1.5 rounded-full transition-all" style={{ width: `${progress}%`, background: '#FF6B2C' }} />
        </div>
      </div>

      {/* Active lesson video */}
      <div style={{ borderBottom: '1px solid #2e2e2e' }}>
        {activeLesson.type === 'video' ? (
          <div className="aspect-video bg-black relative">
            <iframe
              src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0&modestbranding=1`}
              title={activeLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video flex flex-col items-center justify-center gap-3" style={{ background: '#242424' }}>
            <span className="text-5xl">{TYPE_ICON[activeLesson.type]}</span>
            <p className="text-sm font-medium" style={{ color: '#ccc' }}>{activeLesson.title}</p>
            {activeLesson.type === 'file' && (
              <button
                className="text-xs text-white px-4 py-2 rounded-xl font-medium"
                style={{ background: '#FF6B2C' }}
              >
                Descargar archivo
              </button>
            )}
          </div>
        )}

        <div className="px-4 py-3" style={{ background: '#1f1f1f' }}>
          <p className="text-white font-semibold text-sm">{activeLesson.title}</p>
          {activeLesson.duration && (
            <p className="text-xs mt-0.5" style={{ color: '#888' }}>⏱ {activeLesson.duration}</p>
          )}
        </div>
      </div>

      {/* Module / lesson list */}
      <div style={{ borderBottom: '1px solid #2e2e2e' }}>
        <div className="px-4 py-2">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#666' }}>Contenido del curso</p>
        </div>
        {course.modules.map((module) => (
          <div key={module.id}>
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:opacity-80"
              style={{ background: '#242424', borderTop: '1px solid #2a2a2a' }}
            >
              <span className="text-base">{module.emoji}</span>
              <span className="flex-1 text-left text-sm font-semibold text-white">{module.title}</span>
              <span className="text-xs mr-1" style={{ color: '#666' }}>
                {module.lessons.filter(l => isCompleted(l.id)).length}/{module.lessons.length}
              </span>
              {expandedModules[module.id]
                ? <ChevronDown size={14} style={{ color: '#666' }} />
                : <ChevronRight size={14} style={{ color: '#666' }} />
              }
            </button>

            {expandedModules[module.id] && module.lessons.map((lesson) => {
              const done = isCompleted(lesson.id)
              const isActive = activeLesson.id === lesson.id
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className="w-full flex items-center gap-3 px-5 py-3 transition-colors"
                  style={{
                    borderTop: '1px solid #272727',
                    background: isActive ? 'rgba(255,107,44,0.08)' : undefined,
                    borderLeft: isActive ? '2px solid #FF6B2C' : '2px solid transparent',
                  }}
                >
                  {done
                    ? <CheckCircle2 size={16} style={{ color: '#34d399', flexShrink: 0 }} />
                    : isActive
                      ? <Play size={16} style={{ color: '#FF6B2C', flexShrink: 0 }} />
                      : <Circle size={16} style={{ color: '#444', flexShrink: 0 }} />
                  }
                  <span
                    className="flex-1 text-left text-sm"
                    style={{
                      color: isActive ? '#fff' : done ? '#666' : '#ccc',
                      fontWeight: isActive ? '600' : undefined,
                    }}
                  >
                    {lesson.title}
                  </span>
                  <span className="text-xs" style={{ color: '#555' }}>{lesson.duration}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Comments */}
      <div className="px-4 py-4 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle size={15} style={{ color: '#888' }} />
          <p className="text-sm font-bold text-white">Comentarios</p>
        </div>

        <div className="mb-4">
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Escribe un comentario o pregunta..."
            rows={3}
            className="w-full text-white text-sm px-3 py-2.5 rounded-xl focus:outline-none resize-none"
            style={{
              background: '#242424',
              border: '1px solid #333',
              color: '#fff',
            }}
          />
          <button
            onClick={handleSubmitComment}
            disabled={!comment.trim()}
            className="mt-2 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
            style={
              comment.trim()
                ? { background: '#FF6B2C' }
                : { background: '#2e2e2e', color: '#555', cursor: 'not-allowed' }
            }
          >
            Comentar
          </button>
        </div>

        {comments.length === 0 ? (
          <p className="text-sm text-center py-6 rounded-2xl" style={{ color: '#666', background: '#242424' }}>
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.map(c => (
              <div key={c.id} className="rounded-2xl p-4" style={{ background: '#242424' }}>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(255,107,44,0.25)', color: '#FF6B2C' }}
                  >
                    {c.author.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: '#ccc' }}>{c.author}</span>
                  <span className="text-xs" style={{ color: '#555' }}>{c.time}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#ccc' }}>{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
