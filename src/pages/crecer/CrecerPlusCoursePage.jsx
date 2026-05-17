import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, CheckCircle2, Circle, MessageCircle, ChevronDown, ChevronRight } from 'lucide-react'
import useUserStore from '../../store/useUserStore'

const COURSES = {
  'teologia-fundamental': {
    title: 'Teología Fundamental',
    emoji: '📜',
    description: 'Un recorrido por las doctrinas esenciales de la fe cristiana.',
    color: '#6366f1',
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
    color: '#f59e0b',
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
    <div className="p-4 text-slate-400 text-sm">
      Curso no encontrado.{' '}
      <button onClick={() => navigate('/discipulado')} className="text-indigo-400 underline">Volver</button>
    </div>
  )

  const progress = crecerPlusProgress[courseId] ?? 0
  const allLessons = course.modules.flatMap(m => m.lessons)
  const completedCount = Math.round((progress / 100) * allLessons.length)

  // Track which lesson is open
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
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/discipulado')} className="text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{course.title}</p>
          <p className="text-xs text-slate-400">{progress}% completado</p>
        </div>
        {/* Progress bar */}
        <div className="w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="h-1.5 rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: course.color }} />
        </div>
      </div>

      {/* Active lesson video */}
      <div className="bg-slate-800 border-b border-slate-700">
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
          <div className="aspect-video bg-slate-700 flex flex-col items-center justify-center gap-3">
            <span className="text-5xl">{TYPE_ICON[activeLesson.type]}</span>
            <p className="text-slate-300 text-sm font-medium">{activeLesson.title}</p>
            {activeLesson.type === 'file' && (
              <button className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium">
                Descargar archivo
              </button>
            )}
          </div>
        )}

        {/* Lesson title bar */}
        <div className="px-4 py-3">
          <p className="text-white font-semibold text-sm">{activeLesson.title}</p>
          {activeLesson.duration && (
            <p className="text-xs text-slate-400 mt-0.5">⏱ {activeLesson.duration}</p>
          )}
        </div>
      </div>

      {/* Module / lesson list */}
      <div className="border-b border-slate-700">
        <div className="px-4 py-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contenido del curso</p>
        </div>
        {course.modules.map((module) => (
          <div key={module.id}>
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800/50 border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors"
            >
              <span className="text-base">{module.emoji}</span>
              <span className="flex-1 text-left text-sm font-semibold text-slate-200">{module.title}</span>
              <span className="text-xs text-slate-500 mr-1">
                {module.lessons.filter(l => isCompleted(l.id)).length}/{module.lessons.length}
              </span>
              {expandedModules[module.id] ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
            </button>

            {expandedModules[module.id] && module.lessons.map((lesson) => {
              const done = isCompleted(lesson.id)
              const isActive = activeLesson.id === lesson.id
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full flex items-center gap-3 px-5 py-3 border-t border-slate-700/30 transition-colors ${
                    isActive ? 'bg-indigo-600/10 border-l-2 border-l-indigo-500' : 'hover:bg-slate-800/50'
                  }`}
                >
                  {done
                    ? <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    : isActive
                      ? <Play size={16} className="text-indigo-400 flex-shrink-0" />
                      : <Circle size={16} className="text-slate-600 flex-shrink-0" />
                  }
                  <span className={`flex-1 text-left text-sm ${isActive ? 'text-white font-medium' : done ? 'text-slate-400' : 'text-slate-300'}`}>
                    {lesson.title}
                  </span>
                  <span className="text-xs text-slate-600">{lesson.duration}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Comments */}
      <div className="px-4 py-4 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle size={15} className="text-slate-400" />
          <p className="text-sm font-bold text-white">Comentarios</p>
        </div>

        {/* Comment input */}
        <div className="mb-4">
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Escribe un comentario o pregunta..."
            rows={3}
            className="w-full bg-slate-800 text-white text-sm px-3 py-2.5 rounded-xl border border-slate-700 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
          />
          <button
            onClick={handleSubmitComment}
            disabled={!comment.trim()}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            Comentar
          </button>
        </div>

        {comments.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6 bg-slate-800 rounded-2xl">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.map(c => (
              <div key={c.id} className="bg-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-indigo-600/40 flex items-center justify-center text-xs font-bold text-indigo-300">
                    {c.author.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-300">{c.author}</span>
                  <span className="text-xs text-slate-600">{c.time}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
