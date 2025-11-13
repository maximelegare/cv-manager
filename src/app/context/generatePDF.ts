"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface GeneratePDFItems {
  [key: string]: string
}

interface GeneratePDFStore {
  itemsToGeneratePDF: GeneratePDFItems
  setItemsToGeneratePDF: (
    items: GeneratePDFItems | ((prev: GeneratePDFItems) => GeneratePDFItems),
  ) => void
}

export const useGeneratePDFStore = create<GeneratePDFStore>()(
  persist(
    (set) => ({
      itemsToGeneratePDF: {},
      setItemsToGeneratePDF: (items) =>
        set((state) => ({
          itemsToGeneratePDF: typeof items === "function" ? items(state.itemsToGeneratePDF) : items,
        })),
    }),
    {
      name: "generate-pdf-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
