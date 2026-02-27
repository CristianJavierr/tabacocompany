import React, { createContext, useContext } from 'react';

export type Page = 'home' | 'contacto';

interface PageContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  isTransitioning: boolean;
}

export const PageContext = createContext<PageContextType>({
  currentPage: 'home',
  navigateTo: () => {},
  isTransitioning: false,
});

export function usePage() {
  return useContext(PageContext);
}
