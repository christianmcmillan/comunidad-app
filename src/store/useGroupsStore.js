import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedGroups } from '../data/seed'

const useGroupsStore = create(
  persist(
    (set, get) => ({
      groups: seedGroups,
      meetings: [],

      getGroup: (id) => get().groups.find((g) => g.id === id),

      getUserGroup: (groupId) => get().groups.find((g) => g.id === groupId),

      recordAttendance: (groupId, date, memberIds) =>
        set((state) => ({
          meetings: [
            ...state.meetings,
            { groupId, date, memberIds, recordedAt: new Date().toISOString() },
          ],
        })),
    }),
    { name: 'comunidad-groups' }
  )
)

export default useGroupsStore
