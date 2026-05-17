import { create } from 'zustand'

const useToastStore = create((set, get) => ({
  toasts: [],

  showToast: ({ message, type = 'success', xp = null, duration = 3000 }) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2)
    set((state) => ({ toasts: [...state.toasts, { id, message, type, xp }] }))
    setTimeout(() => get().removeToast(id), duration)
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

export default useToastStore
