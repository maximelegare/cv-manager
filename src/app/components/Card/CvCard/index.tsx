import React from "react"

import { CvCardProps } from "../types"
import { Card } from "../Base"
import { DisplayDate } from "@app/components/Date"
import { getServerSideURL } from "@app/utilities/getServerSideURL"
import { ItemInListIcon } from "../Icon"
import { getUrlData } from "@app/utilities/searchParams"

export const CvCard: React.FC<CvCardProps> = async ({ doc }) => {
  const currentUrl = await getServerSideURL("fullpath")
  const { fullpathWithoutLocale } = getUrlData(currentUrl)

  const {
    id,
    publishedOn,

    infos: { jobTitle },
  } = doc

  const url = `/cvs?id=${id}`

  return (
    <Card
      href={url}
      className={`p-2 rounded-[8px] border  ${fullpathWithoutLocale === url ? "border-secondary" : "border-gray-300"}`}
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1 h-fit">
          <ItemInListIcon pageId={id} />
        </div>
        <div className="col-span-11">
          <h5 className="!mt-0">{jobTitle}</h5>
          <DisplayDate date={publishedOn} className="opacity-60" />
        </div>
      </div>
    </Card>
  )
}
