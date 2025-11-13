"use client"

import { useGeneratePDFStore } from "@app/context/generatePDF"

export const usePDFGenerator = () => {
  const setItemsToGeneratePDF = useGeneratePDFStore((state) => state.setItemsToGeneratePDF)

  /**
   * Adds the HTML of the given element to the PDF generation list under a page ID.
   */
  const addItemToListToGeneratePDF = (currentPageId: string) => {
    const element = document.getElementById(`element-to-generate-pdf-${currentPageId}`)
    if (!element) return

    const html = element.outerHTML // use outerHTML so the container markup is preserved

    setItemsToGeneratePDF((prev) => ({
      ...prev,
      [currentPageId]: html,
    }))
  }

  /**
   * Removes the stored HTML for a given page ID.
   */
  const removeItemFromListToGeneratePDF = (currentPageId: string) => {
    setItemsToGeneratePDF((prev) => {
      if (!prev[currentPageId]) return prev

      // Remove the entry for this page
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [currentPageId]: _, ...rest } = prev
      return rest
    })
  }

  return {
    addItemToListToGeneratePDF,
    removeItemFromListToGeneratePDF,
  }
}
