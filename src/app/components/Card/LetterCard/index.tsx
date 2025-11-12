import React from "react"

import { LetterCardProps } from "../types"
import { Card } from "../Base"
import { DisplayDate } from "@app/components/Date"

export const LetterCard: React.FC<LetterCardProps> = ({ doc }) => {
  const { id, company, publishedOn } = doc

  const url = `/letters?id=${id}`

  return (
    <Card href={url} className="p-2 rounded-[8px] border border-gray-300">
      <h5 className="!mt-0">{company?.name}</h5>
      <DisplayDate date={publishedOn} className="opacity-80" />
    </Card>
  )
}
