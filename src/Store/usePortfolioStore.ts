import { create } from 'zustand';
import type { ProjectFilter } from '../data/projects';

type PortfolioState = {
  filter: ProjectFilter;
  setFilter: (filter: ProjectFilter) => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter })
}));
