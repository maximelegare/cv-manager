"use client"

import React from "react"
import { Icon } from "../Icon"
import {} from "next-i18n-router"
import { usePathname } from "next/navigation"
import { detectLocaleFromPathname } from "@app/utilities/detectLocale"
import { cn } from "@app/utilities/cn"

type DateProps = {
  date: string | Date
  lang?: "en" | "fr"
  showCalendarIcon?: boolean
  className?: string
  showDot?: boolean
  display?: {
    month?: boolean
    year?: boolean
    day?: boolean
  }
}

export const DisplayDate: React.FC<DateProps> = ({
  date,
  lang,
  showCalendarIcon = true,
  className,
  showDot = false,
  display = {
    month: true,
    year: true,
    day: true,
  },
}) => {
  const pathname = usePathname()
  const currLocale = detectLocaleFromPathname(pathname)

  const dateStr = new Date(date)

  let formatted: string

  if (typeof date === "string") {
    formatted = new Intl.DateTimeFormat(`${lang || currLocale}-CA`, {
      month: display?.month ? "short" : undefined,
      year: display?.year ? "numeric" : undefined,
      day: display?.day ? "2-digit" : undefined,
    }).format(dateStr)
  }

  return (
    <div className={cn("flex items-center gap-1 text-gray-500", className)}>
      {showCalendarIcon && date && <Icon name="radix/calendar" className="text-[0.4rem] mr-1" />}
      <p className="text-[0.6rem] !m-0">{formatted}</p>
      {showDot && date && <span className="text-gray-500">-</span>}
    </div>
  )
}
