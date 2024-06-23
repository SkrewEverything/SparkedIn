import { create } from 'zustand'

export const useJobStore = create((set) => ({
  jobs: [],
  updateJobs: (newJobs) => set(() => ({ jobs: newJobs })),
}));