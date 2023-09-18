
import {create} from 'zustand'
import WaveSurfer from "wavesurfer.js";

interface MoodPlayerProps {
  isVisible: boolean,
  src: string | null,
  isPlaying: boolean,
  isLoading: boolean,
  setIsPlaying: (isPlaying: boolean) => void
  setVisibility: (isVisible: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setSrc: (src: string) => void
}

export const useMoodPlayerStore = create<MoodPlayerProps>( (set) => ({
  isVisible: false,
  src: null,
  isPlaying: false,
  isLoading: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setSrc: (src: string) => set({ src }),
  setIsLoading: (isLoading: boolean) => set({ isLoading}),
  setVisibility: (isVisible:  boolean) => set({ isVisible }),
}))