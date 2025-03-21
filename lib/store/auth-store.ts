import { create } from 'zustand'

type AuthStore = {
  isAuthDialogOpen: boolean
  openAuthDialog: () => void
  closeAuthDialog: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthDialogOpen: false,
  openAuthDialog: () => set({ isAuthDialogOpen: true }),
  closeAuthDialog: () => set({ isAuthDialogOpen: false }),
}))