import React from "react"
import { TitleSectionBlockProps } from "@app/blocks/layouts/TitleSectionBlock"
import { Separator } from "@app/components/ui/separator"

export const LowImpactTitle: React.FC<
  TitleSectionBlockProps & { className?: string; linkClassName?: string; subtitle?: string }
> = async (props) => {
  const { title } = props

  return (
    <div className="pb-2">
      <h4 className="!m-0">{title}</h4>
      <Separator />
    </div>
  )
}
