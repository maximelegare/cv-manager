import type { CollectionConfig } from "payload"
import { Content } from "../../../blocks/layouts/Content/config"
import { admins } from "@app/access/admins"
import { anyone } from "@app/access/anyone"
import { slugField } from "@app/payload/fields/slug"

export const Letters: CollectionConfig = {
  slug: "letters",
  admin: {
    useAsTitle: "slug",
  },
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
          label: "Company",
          name: "company",
          fields: [
            {
              name: "name",
              type: "text",
            },
            {
              name: "address",
              type: "text",
              label: "Address",
            },
            {
              name: "city",
              type: "text",
              label: "City",
            },
            {
              name: "country",
              type: "text",
              label: "Country",
            },
            {
              name: "zip",
              type: "text",
              label: "Zip",
            },
            {
              name: "phone",
              type: "text",
              label: "Phone",
            },
          ],
        },
        {
          label: "Letter",
          name: "letter",
          fields: [
            {
              name: "subject",
              type: "text",
              label: "Subject",
              localized: true,
              required: true,
            },
            {
              name: "content",
              type: "blocks",
              blocks: [Content],
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
