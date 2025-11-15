"use client"
import { Button } from "../ui/button"
import { usePDFGenerator } from "@app/hooks/usePDFGenerator"
import { useGeneratePDFStore } from "@app/context/generatePDF"
import { generatePDF } from "@app/utilities/generatePDF"
import { useClientSideUrl } from "@app/utilities/useClientSideUrl"
import { getSearchParamsFromURL } from "@app/utilities/searchParams"
import { Icon } from "../Icon"

export const CreatePDFSection: React.FC = () => {
  const itemsToGeneratePDF = useGeneratePDFStore((state) => state.itemsToGeneratePDF)

  const url = useClientSideUrl()
  const params = getSearchParamsFromURL(url)
  const pageId = params?.get("id")

  const { addItemToListToGeneratePDF, removeItemFromListToGeneratePDF } = usePDFGenerator()

  const handleGeneratePDF = async () => {
    await generatePDF(itemsToGeneratePDF)
  }

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-2 h-fit">
        {itemsToGeneratePDF[pageId] && (
          <Icon name="radix/check-circled" className="text-green-700" />
        )}
      </div>
      <div className="col-span-10">
        <div className="flex w-full justify-between mb-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => pageId && addItemToListToGeneratePDF(pageId)}
          >
            <Icon name="radix/plus" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="bg-destructive text-white"
            onClick={() => pageId && removeItemFromListToGeneratePDF(pageId)}
          >
            <Icon name="radix/trash" />
          </Button>
          <Button
            variant="secondary"
            size="w-full"
            className="bg-success text-white"
            onClick={handleGeneratePDF}
          >
            Generate PDF
          </Button>
        </div>
        <div className="flex justify-end">
          <div className="bg-gray-100 p-2 rounded-[8px] text-xs w-fit opacity-60">
            Document Count: {Object.keys(itemsToGeneratePDF).length}
          </div>
        </div>
      </div>
    </div>
  )
}
