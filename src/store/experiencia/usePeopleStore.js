import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { expPeople as seedPeople } from '../../data/experienciaSeed'

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

const ROLE_LABELS = {
  administrator: 'Administrador',
  editor: 'Editor',
  scheduled_viewer: 'Voluntario',
  viewer: 'Visitante',
}

const usePeopleStore = create(
  persist(
    (set, get) => ({
      people: seedPeople,
      ROLE_LABELS,

      addPerson: (person) => set((s) => ({
        people: [...s.people, {
          ...person,
          id: genId(),
          teamIds: [],
          role: 'scheduled_viewer',
          blockoutDates: [],
          createdAt: new Date().toISOString(),
        }],
      })),

      updatePerson: (id, updates) => set((s) => ({
        people: s.people.map((p) => p.id === id ? { ...p, ...updates } : p),
      })),

      deletePerson: (id) => set((s) => ({ people: s.people.filter((p) => p.id !== id) })),

      getPerson: (id) => get().people.find((p) => p.id === id),
    }),
    { name: 'exp-people' }
  )
)

export default usePeopleStore
