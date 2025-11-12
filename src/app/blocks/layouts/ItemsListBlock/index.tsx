import configPromise from "@payload-config"
import { getPayload } from "payload"
import React from "react"

import { ItemsList } from "@app/blocks/layouts/ItemsListBlock/ItemsList"
import { Pagination } from "@app/components/Pagination"

import type { Page } from "@payload-types"
import { Locale } from "ROOT/locales/locales"

import { PageRange } from "@app/components/PageRange"

export type ItemsListBlockProps = Extract<Page["layout"][0], { blockType: "itemsList" }>

export const ItemsListBlock: React.FC<
  ItemsListBlockProps & {
    id?: string
    urlSearchParams?: Record<string, string>
    params?: {
      locale?: Locale
    }
  }
> = async (props) => {
  const { relationTo, cardVariant, limit, layout, hasPagination, urlSearchParams, imageSelector } =
    props

  const pageNumber = urlSearchParams?.page ? parseInt(urlSearchParams?.page) : 1

  const filterUrlParam = urlSearchParams?.filter
  const filterValues = filterUrlParam?.includes(":") ? filterUrlParam?.split(":") : filterUrlParam

  const payload = await getPayload({ config: configPromise })

  const fetchedItems = await payload.find({
    locale: props.params?.locale,
    collection: relationTo,
    limit: limit ?? undefined,
    page: pageNumber,
  })

  return (
    <div className="mb-12">
      <div className="">
        {hasPagination && (
          <div className="my-2">
            <PageRange
              category={
                filterValues && typeof filterValues[1] === "string" ? filterValues[1] : "All"
              }
              collection={relationTo}
              currentPage={fetchedItems.page}
              limit={limit}
              totalDocs={fetchedItems.totalDocs}
            />
          </div>
        )}
        <ItemsList
          relationTo={relationTo}
          items={fetchedItems.docs as any}
          layout={layout}
          imageSelector={imageSelector}
          cardVariant={cardVariant}
        />
      </div>
      {hasPagination && fetchedItems.totalPages > 1 && fetchedItems.page && (
        <div className="">
          <Pagination page={fetchedItems.page} totalPages={fetchedItems.totalPages} />
        </div>
      )}
    </div>
  )
}
