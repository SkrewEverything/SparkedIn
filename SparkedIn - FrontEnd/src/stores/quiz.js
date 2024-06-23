import { create } from 'zustand'

export const useQuizStore = create((set) => ({
  locations: [],
  updateLocations: (newLocations) => set(() => ({locations: [...newLocations]})),
  skills: [],
  updateSkills: (newSkills) => set(() => ({skills: [...newSkills]})),
  education: '',
  updateEducation: (newEducation) => set(() => ({education: newEducation})),
  employmentType: {
    "fullTime": false,
    "contract": false,
    "temporary": false
},
  updateEmploymentType: (newType) => set(() => ({employmentType: newType})),
  experience: '',
  updateExperience: (newExperience) => set(() => ({experience: newExperience})),
  jobFamily: [],
  updateJobFamily: (newJobFamily) => set(() => ({jobFamily: newJobFamily}))

}));