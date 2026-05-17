import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedEvents } from '../data/seed'

const useEventsStore = create(
  persist(
    (set, get) => ({
      events: seedEvents,
      mySignups: [],

      signup: (eventId) =>
        set((state) => ({
          mySignups: state.mySignups.includes(eventId)
            ? state.mySignups
            : [...state.mySignups, eventId],
        })),

      cancelSignup: (eventId) =>
        set((state) => ({
          mySignups: state.mySignups.filter((id) => id !== eventId),
        })),

      isSignedUp: (eventId) => get().mySignups.includes(eventId),
    }),
    { name: 'comunidad-events' }
  )
)

export default useEventsStore
