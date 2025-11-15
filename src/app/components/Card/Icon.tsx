"use client"

import { useGeneratePDFStore } from "@app/context/generatePDF"
import React from "react"
import { Icon } from "../Icon"

export const ItemInListIcon = ({ pageId }: { pageId: string }) => {
  const itemsToGeneratePDF = useGeneratePDFStore((state) => state.itemsToGeneratePDF)

  if (!itemsToGeneratePDF[pageId]) return null

  return <Icon name="radix/check-circled" className="text-green-700 text-[0.5rem]" />
}
