import { RelationTo } from "../../blocks/layouts/ItemsListBlock/ItemsList"
import { Cv, Letter } from "@payload-types"
import { CSSProperties } from "react"

export type BaseCard = {
  className?: string
  style?: CSSProperties
  relationTo: RelationTo
  title?: string

  // Used to have consistent width for cards in carousels
  // It uses the width of a card in a grid
}

export type CvCardProps = BaseCard & {
  doc?: Cv
}

export type LetterCardProps = BaseCard & {
  doc?: Letter
}
