import { create } from 'zustand'
import WaveSurfer from 'wavesurfer.js'

interface MoodPlayerProps {
  isVisible: boolean
  src: string | null
  artworkURL: string | null
  isMuted: boolean
  isPlaying: boolean
  isLoading: boolean
  setIsPlaying: (isPlaying: boolean) => void
  setVisibility: (isVisible: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setSrc: (src: string) => void
  setArtwork: (src: string) => void
  setIsMuted: (isMuted: boolean) => void
}

export const useMoodPlayerStore = create<MoodPlayerProps>((set) => ({
  isVisible: false,
  src: null,
  isPlaying: false,
  isLoading: false,
  isMuted: false,
  artworkURL: null,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setSrc: (src: string) => set({ src }),
  setArtwork: (artworkURL: string) => set({ artworkURL }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setVisibility: (isVisible: boolean) => set({ isVisible }),
  setIsMuted: (isMuted: boolean) => set({ isMuted }),
}))
