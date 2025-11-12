import { ContentBlock } from "@app/blocks/layouts/Content"
import { ItemsListBlock } from "@app/blocks/layouts/ItemsListBlock"
import { DynamicContentBlock } from "@app/blocks/layouts/DynamicContent"
import { TitleSectionBlock } from "@app/blocks/layouts/TitleSectionBlock"
import { DocumentViewerBlock } from "@app/blocks/layouts/DocumentViewer"

export const blockComponentsMap = {
  content: ContentBlock,
  dynamicContent: DynamicContentBlock,
  itemsList: ItemsListBlock,
  titleSection: TitleSectionBlock,
  documentViewer: DocumentViewerBlock,
}
