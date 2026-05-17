import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedUser } from '../data/seed'

export function getLevel(xp) {
  if (xp >= 2500) return 'servidor'
  if (xp >= 1200) return 'lider'
  if (xp >= 500) return 'discipulo'
  if (xp >= 100) return 'aprendiz'
  return 'visitante'
}

export function getNextThreshold(xp) {
  if (xp >= 2500) return null
  if (xp >= 1200) return 2500
  if (xp >= 500) return 1200
  if (xp >= 100) return 500
  return 100
}

const useUserStore = create(
  persist(
    (set, get) => ({
      ...seedUser,

      addXP: (amount) =>
        set((state) => ({ xp: state.xp + amount })),

      unlockBadge: (badgeId) =>
        set((state) => ({
          badges: state.badges.includes(badgeId)
            ? state.badges
            : [...state.badges, badgeId],
        })),

      updateCrecerStep: (step, status) =>
        set((state) => ({
          crecerSteps: { ...state.crecerSteps, [step]: status },
        })),

      markDevotionalRead: () =>
        set({ lastDevotionalRead: new Date().toISOString().split('T')[0] }),

      checkIn: () => {
        const state = get()
        set({ xp: state.xp + 10 })
      },

      attendGroup: () =>
        set((state) => ({ xp: state.xp + 20 })),

      completeSeminar: (seminarId) =>
        set((state) => ({
          seminarsCompleted: state.seminarsCompleted.includes(seminarId)
            ? state.seminarsCompleted
            : [...state.seminarsCompleted, seminarId],
        })),

      incrementStreak: () =>
        set((state) => ({
          streak: state.streak + 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
        })),

      setDemoMode: (mode) => {
        if (mode === 'leader') {
          set({
            xp: 3200,
            streak: 47,
            badges: ['conectado', 'encontrado', 'vivo', 'influyente', 'racha7', 'escuela-heroes', 'para-siempre'],
            crecerSteps: { encuentro: 'completed', vida: 'completed', influencia: 'completed' },
            seminarsCompleted: ['escuela-heroes', 'para-siempre', 'relaciones-sanas'],
            volunteerApproved: true,
            groupId: 'g-1',
            crecerPlusProgress: { 'teologia-fundamental': 85, 'hechos-29': 60 },
            nextAssignment: {
              planTitle: 'Reuniones Fines de Semana',
              dates: '16 & 17 de mayo 2026',
              times: ['Sáb 5pm', 'Dom 9am'],
              team: 'Producción',
              position: 'Cámara 1',
            },
          })
        } else {
          set({ ...seedUser })
        }
      },
    }),
    { name: 'comunidad-user' }
  )
)

export default useUserStore
