import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { expSongs as seedSongs } from '../../data/experienciaSeed'

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

const useSongsStore = create(
  persist(
    (set, get) => ({
      songs: seedSongs,

      addSong: (song) => set((s) => ({
        songs: [...s.songs, { ...song, id: genId(), keys: [], createdAt: new Date().toISOString() }],
      })),
      updateSong: (id, updates) => set((s) => ({
        songs: s.songs.map((s2) => s2.id === id ? { ...s2, ...updates } : s2),
      })),
      deleteSong: (id) => set((s) => ({ songs: s.songs.filter((s2) => s2.id !== id) })),
      getSong: (id) => get().songs.find((s) => s.id === id),
    }),
    { name: 'exp-songs' }
  )
)

export default useSongsStore
