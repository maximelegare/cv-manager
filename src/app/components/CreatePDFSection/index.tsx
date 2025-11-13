"use client"
import React, { useEffect } from "react"
import { Button } from "../ui/button"
import { usePDFGenerator } from "@app/hooks/usePDFGenerator"
import { useGeneratePDFStore } from "@app/context/generatePDF"
import { generatePDF } from "@app/utilities/generatePDF"
import { useClientSideUrl } from "@app/utilities/useClientSideUrl"
import { getSearchParamsFromURL } from "@app/utilities/searchParams"

export const CreatePDFSection: React.FC = () => {
  const itemsToGeneratePDF = useGeneratePDFStore((state) => state.itemsToGeneratePDF)

  const url = useClientSideUrl()
  const params = getSearchParamsFromURL(url)
  const pageId = params?.get("id")

  const { addItemToListToGeneratePDF, removeItemFromListToGeneratePDF } = usePDFGenerator()

  const handleGeneratePDF = async () => {
    await generatePDF(itemsToGeneratePDF)
  }

  useEffect(() => {
    console.log("itemsToGeneratePDF", itemsToGeneratePDF)
  }, [itemsToGeneratePDF])

  return (
    <div className="flex w-full">
      <Button
        variant="default"
        size="sm"
        onClick={() => pageId && addItemToListToGeneratePDF(pageId)}
      >
        Add To List
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={() => pageId && removeItemFromListToGeneratePDF(pageId)}
      >
        Remove From List
      </Button>
      <Button variant="default" size="sm" onClick={handleGeneratePDF}>
        Generate PDF
      </Button>
    </div>
  )
}
