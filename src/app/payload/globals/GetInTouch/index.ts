import type { GlobalConfig } from "payload"

import { anyone } from "@app/access/anyone"
import switchField from "@app/payload/fields/switch/config"
import { link } from "@app/payload/fields/link"
import { superUser } from "@app/access/super"

export const GetInTouch: GlobalConfig = {
  slug: "getInTouch",
  access: {
    read: anyone,
    update: superUser,
  },
  fields: [
    {
      name: "candidateName",
      label: "Candidat Name",
      type: "text",
    },
    {
      name: "contactInfos",
      type: "array",
      fields: [
        switchField({
          name: "isLink",
          label: "Is Link",
        }),
        {
          name: "type",
          type: "select",
          options: [
            {
              label: "Email",
              value: "radix/envelope-closed",
            },
            {
              label: "Phone",
              value: "radix/phone",
            },
            {
              label: "Website",
              value: "radix/globe",
            },
            {
              label: "GitHub",
              value: "radix/github-logo",
            },
            {
              label: "LinkedIn",
              value: "radix/linkedin-logo",
            },
          ],
          localized: true,
        },
        {
          name: "value",
          type: "text",
          localized: true,
          admin: {
            condition: (_, { isLink }) => Boolean(!isLink),
          },
        },
        link({
          overrides: {
            admin: {
              condition: (_, { isLink }) => Boolean(isLink),
            },
          },
        }),
      ],
    },
  ],
}
