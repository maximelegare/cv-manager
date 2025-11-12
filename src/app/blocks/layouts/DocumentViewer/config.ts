import type { Block } from "payload"

export const DocumentViewerBlock: Block = {
  slug: "documentViewer",
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Cv",
          value: "cv",
        },
        {
          label: "Letter",
          value: "letter",
        },
      ],
    },
  ],
}
