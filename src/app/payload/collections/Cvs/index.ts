import type { CollectionConfig } from "payload"

import { Content } from "../../../blocks/layouts/Content/config"
import switchField from "@app/payload/fields/switch/config"
import { admins } from "@app/access/admins"
import { anyone } from "@app/access/anyone"
import { TitleSectionBlock } from "@app/blocks/layouts/TitleSectionBlock/config"
import { link } from "@app/payload/fields/link"
import { slugField } from "@app/payload/fields/slug"
// import { beforeChangeVariant } from './hooks/beforeChange'
// import { checkUserPurchases } from './access/checkUserPurchases'
// import { beforeProductChange } from './hooks/beforeChange'
// import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
// import { revalidateProduct } from './hooks/revalidateProduct'
// import { ProductSelect } from './ui/ProductSelect'

export const CVS: CollectionConfig = {
  slug: "cvs",
  // hooks: {
  //   beforeChange: [beforeChangeVariant]
  // },
  admin: {
    useAsTitle: "slug",
    // preview: (doc) => {
    //   return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
    //     `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
    //   )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    // },
  },
  // hooks: {
  //   beforeChange: [beforeProductChange],
  //   afterChange: [revalidateProduct],
  //   // afterDelete: [deleteProductFromCarts],
  // },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: "publishedOn",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField("slug", { admin: { position: "sidebar" } }),
    {
      type: "tabs",
      tabs: [
        {
          label: "Infos",
          name: "infos",
          fields: [
            {
              name: "jobTitle",
              label: "Job Title",
              type: "text",
              localized: true,
              admin: {
                description: "Fill in your contact infos in the global Get In Touch section.",
              },
            },
          ],
        },
        {
          name: "introduction",
          label: "Introduction",
          fields: [
            {
              name: "tabName",
              label: "Tab Name",
              type: "text",
              localized: true,
            },
            {
              name: "content",
              type: "blocks",
              localized: true,
              required: true,
              blocks: [Content, TitleSectionBlock],
            },
          ],
        },
        {
          name: "skills",
          fields: [
            {
              type: "array",
              name: "pages",
              fields: [
                {
                  type: "tabs",
                  tabs: [
                    {
                      name: "competences",
                      label: "Competences",
                      fields: [
                        {
                          name: "tabName",
                          label: "Tab Name",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "softSkills",
                          type: "array",
                          fields: [
                            {
                              name: "title",
                              label: "Title",
                              type: "text",
                              localized: true,
                            },
                          ],
                        },
                        {
                          name: "hardSkills",
                          type: "array",
                          fields: [
                            {
                              name: "title",
                              label: "Title",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "level",
                              label: "Level",
                              type: "select",
                              options: [
                                {
                                  label: "Beginner",
                                  value: "beginner",
                                },
                                {
                                  label: "Intermediate",
                                  value: "intermediate",
                                },
                                {
                                  label: "Advanced",
                                  value: "advanced",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: "education",
                      label: "Education",
                      fields: [
                        {
                          name: "tabName",
                          label: "Tab Name",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "education",
                          type: "array",
                          fields: [
                            {
                              name: "program",
                              label: "Program",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "school",
                              label: "School",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "startDate",
                              label: "Start Date",
                              type: "date",
                              localized: true,
                            },
                            {
                              name: "endDate",
                              label: "End Date",
                              type: "date",
                              localized: true,
                              admin: {
                                condition: (_, { toPresent }) => !toPresent,
                              },
                            },
                            {
                              name: "content",
                              type: "blocks",
                              localized: true,
                              blocks: [Content],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: "experiences",
                      label: "Experiences",
                      fields: [
                        {
                          name: "tabName",
                          label: "Tab Name",
                          type: "text",
                          localized: true,
                        },
                        {
                          name: "experience",
                          type: "array",
                          fields: [
                            {
                              name: "title",
                              label: "Title",
                              type: "text",
                              localized: true,
                            },
                            switchField({
                              name: "hasLink",
                              label: "Has Link",
                            }),
                            link({
                              overrides: {
                                admin: {
                                  condition: (_, { hasLink }) => Boolean(hasLink),
                                },
                              },
                            }),
                            {
                              name: "company",
                              label: "Company",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "description",
                              label: "Description",
                              type: "text",
                              localized: true,
                            },
                            {
                              name: "startDate",
                              label: "Start Date",
                              type: "date",
                              localized: true,
                            },
                            switchField({
                              name: "toPresent",
                              label: "To Present",
                              overrides: {
                                localized: true,
                              },
                            }),
                            {
                              name: "endDate",
                              label: "End Date",
                              type: "date",
                              localized: true,
                              admin: {
                                condition: (_, { toPresent }) => !toPresent,
                              },
                            },
                            {
                              name: "content",
                              type: "blocks",
                              localized: true,
                              blocks: [Content],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
