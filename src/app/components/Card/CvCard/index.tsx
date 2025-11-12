import React from "react"

import { CvCardProps } from "../types"
import { Card } from "../Base"
import { DisplayDate } from "@app/components/Date"

export const CvCard: React.FC<CvCardProps> = ({ doc }) => {
  const {
    id,
    publishedOn,

    infos: { jobTitle },
  } = doc

  const url = `/cvs?id=${id}`

  return (
    <Card href={url} className="p-2 rounded-[8px] border border-gray-300">
      <h5 className="!mt-0">{jobTitle}</h5>
      <DisplayDate date={publishedOn} className="opacity-60" />
    </Card>
  )
}
