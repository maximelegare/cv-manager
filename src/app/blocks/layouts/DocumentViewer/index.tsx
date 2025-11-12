import { CuriculumVitae } from "@app/components/CuriculumVitae"
import { GetInTouch, Page } from "@payload-types"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { Locale } from "ROOT/locales/locales"
import { getUrlData } from "@app/utilities/searchParams"
import { Letter } from "@app/components/Letter"
import { getGlobal } from "@app/utilities/getGlobals"

export type DocumentViewerBlockProps = Extract<Page["layout"][0], { blockType: "documentViewer" }>

export const DocumentViewerBlock: React.FC<
  {
    id?: string
    urlSearchParams?: Record<string, string>
    params?: {
      locale?: Locale
      url?: string
      slugs?: string[]
    }
  } & DocumentViewerBlockProps
> = async ({ urlSearchParams, params: { locale, url } }) => {
  const payload = await getPayload({ config: configPromise })

  const { pathnameWithoutLocale } = getUrlData(url)

  const pathnameWithoutSlashes = pathnameWithoutLocale.replace(/\//g, "")

  const collection =
    Object.keys(payload.collections).find(
      (key) => key.toLowerCase() === pathnameWithoutSlashes.toLowerCase(),
    ) || "cvs"

  const getInTouch: GetInTouch = await getGlobal("getInTouch", 0, locale)

  const fetchedItems = await payload.find({
    collection: collection as any,
    locale,
    where: {
      _id: {
        equals: urlSearchParams?.id,
      },
    },
  })

  if (!fetchedItems.docs[0]) return null

  switch (collection) {
    case "cvs":
      return <CuriculumVitae getInTouch={getInTouch} data={fetchedItems.docs[0]} />
    case "letters":
      return <Letter getInTouch={getInTouch} data={fetchedItems.docs[0]} />
    default:
      return null
  }
}
