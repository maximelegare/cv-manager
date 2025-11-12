import React from "react"
import { TitleSectionBlockProps } from "@app/blocks/layouts/TitleSectionBlock"
import { Separator } from "@app/components/ui/separator"

export const MediumImpactTitle: React.FC<
  TitleSectionBlockProps & { className?: string; linkClassName?: string; subtitle?: string }
> = async (props) => {
  const { title } = props

  return (
    <div>
      <h4 className="font-bold">{title}</h4>
      <Separator />
    </div>
  )
}
