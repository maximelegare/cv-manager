import React from "react"

import { Logo } from "@app/components/Logo/Official"
import type { Header } from "@payload-types"
import { Locale } from "ROOT/locales/locales"
import Link from "next/link"
import { Separator } from "../ui/separator"

import { LocaleSelector } from "@app/providers/Locale/LocaleSelector"

type HeaderProps = {
  locale: Locale
  show: boolean
}

export async function Header({ show }: HeaderProps) {
  if (!show) return null

  return (
    <header id="header">
      <div className="fixed z-20 w-screen bg-background">
        <div className="relative h-16 items-center flex justify-between">
          <div className="flex px-4 sm:px-8 items-center gap-6 w-full justify-between">
            <div className="flex items-center">
              <Link href="/" className="z-50">
                <Logo />
              </Link>
            </div>
            {
              <div className="relative z-30 hidden md:block">
                <LocaleSelector triggerClassName="justify-center" />
              </div>
            }
          </div>
        </div>
        <Separator />
      </div>
      <div className="h-16"></div>
    </header>
  )
}
