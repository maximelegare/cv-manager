import { CvCard } from "@app/components/Card/CvCard"
import { CvCardProps, LetterCardProps } from "@app/components/Card/types"

import { CMSLink, CMSLinkType } from "@app/components/Link"
import { LetterCard } from "@app/components/Card/LetterCard"

export const cardComponentsMap: CardComponentsMap = {
  link: CMSLink,
  cv: CvCard,
  letter: LetterCard,
}

export type CardPropsMap = {
  cv: CvCardProps
  link: CMSLinkType
  letter: LetterCardProps
}

export type CardComponentsMap = {
  [K in keyof CardPropsMap]: React.FC<CardPropsMap[K]>
}
