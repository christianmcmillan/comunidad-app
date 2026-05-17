import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { expServiceTypes as seedServiceTypes } from '../../data/experienciaSeed'

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

const useServiceTypesStore = create(
  persist(
    (set, get) => ({
      serviceTypes: seedServiceTypes,

      addServiceType: (st) => set((s) => ({
        serviceTypes: [...s.serviceTypes, { ...st, id: genId() }],
      })),
      updateServiceType: (id, updates) => set((s) => ({
        serviceTypes: s.serviceTypes.map((st) => st.id === id ? { ...st, ...updates } : st),
      })),
      deleteServiceType: (id) => set((s) => ({ serviceTypes: s.serviceTypes.filter((st) => st.id !== id) })),
      getServiceType: (id) => get().serviceTypes.find((st) => st.id === id),
    }),
    { name: 'exp-service-types' }
  )
)

export default useServiceTypesStore
