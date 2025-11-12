import { Locale, locales } from "ROOT/locales/locales"

export type SearchParams = any

export const getSearchParamsFromURL = (fullPath: string): URLSearchParams | null => {
  if (!fullPath) return null

  const url = new URL(fullPath, process.env.PAYLOAD_PUBLIC_SERVER_URL)
  const params = new URLSearchParams(url.search)
  return params
}

type GetUrlData = {
  url: URL
  locale: Locale
  pathnameWithoutLocale: string
}

export const getUrlData = (fullPath: string): GetUrlData => {
  try {
    const urlData = new URL(fullPath, process.env.PAYLOAD_PUBLIC_SERVER_URL)

    const filterLocales = () => {
      const splitUrl = urlData.pathname.split("/")

      const url = splitUrl.reduce<string[]>((acc, value) => {
        if (value === "") return acc

        const isLocale = locales.some((locale) => locale.locale === value)
        if (isLocale) return acc

        acc.push(value)
        return acc
      }, [])

      return url.join("/")
    }

    return {
      url: urlData,
      locale: urlData.pathname.split("/")[1] as Locale,
      pathnameWithoutLocale: `/${filterLocales()}`,
    }
  } catch (err) {
    console.log(err, "wrong url format")
  }
}
