import { Button, type ButtonProps } from "@app/components/ui/button"
import { cn } from "@app/utilities/cn"
import Link from "next/link"
import React from "react"

import type { Page } from "@payload-types"

export type Appearance = "inline" | ButtonProps["variant"]

import { Icon, type IconName } from "../Icon"

import { Link as LinkType } from "@payload-types"
import { getUrlData } from "@app/utilities/searchParams"
import { buttonsComponentsMap } from "@app/_Map/buttons.map"
import { SheetClose } from "../ui/sheet"

export type CMSLinkType = {
  icon?: {
    type?: IconName
    className?: string
    position?: "right" | "left"
  }
  appearance?: Appearance
  children?: React.ReactNode
  className?: string
  label?: string
  newTab?: boolean | null
  reference?: {
    relationTo: "pages" | "posts"
    value: Page | string
  } | null
  size?: ButtonProps["size"] | null
  type?: LinkType["link"]["type"] | null
  url?: string | null
  isActive?: LinkType["link"]["isActive"]
  isCurrentlySelected?: boolean
  currentUrl: string
  justifyContent?: ButtonProps["justifyContent"] | null
  isSheet?: boolean
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = "inline",
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    isActive,
    currentUrl,
    isCurrentlySelected,
    justifyContent,
    isSheet,
  } = props

  const href =
    type === "reference" && typeof reference?.value === "object" && reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
          reference.value.slug
        }`
      : url

  const urlWithParams = type === "current" ? currentUrl : url || href

  if (!urlWithParams) return null

  const size = appearance === "link" ? "clear" : sizeFromProps
  const newTabProps = newTab ? { rel: "noopener noreferrer", target: "_blank" } : {}

  const getIsActive = (currentUrl: string): boolean => {
    if (!currentUrl) return false
    else if (isActive === "never") return false
    else if (isActive === "default") {
      const currUrlPathname = getUrlData(currentUrl).url.pathname
      if (href === currUrlPathname || url === currUrlPathname) return true
      return false
    } else if (isActive === "exact" && currentUrl === urlWithParams) {
      return true
    } else return false
  }

  if (appearance === "inline") {
    return (
      <Link
        className={cn("relative group no-underline prose", className)}
        href={urlWithParams}
        {...newTabProps}
      >
        <span className={cn("font-normal w-full inline-flex items-center tracking-[0.1em]")}>
          {label && label}
          {children && children}
          <Icon name="radix/arrow-right" className="text-xs" />
        </span>
        <LineUnderButton baseWidth={"w-0"} className="mt-4" />
      </Link>
    )
  }

  const ButtonComponents: React.FC<CMSLinkType> =
    buttonsComponentsMap[appearance] ?? buttonsComponentsMap["base"]

  const getJustifyContent = () => {
    switch (justifyContent) {
      case "center":
        return "justify-center"
      case "right":
        return "justify-right"
      case "left":
        return "justify-left"
      default:
        return undefined
    }
  }

  return (
    <>
      {isSheet ? (
        <Button
          asChild
          className={cn(className, "group")}
          size={size}
          variant={appearance}
          isActive={getIsActive(currentUrl) || isCurrentlySelected}
        >
          <Link
            className={cn("relative no-underline prose", className)}
            href={urlWithParams}
            {...newTabProps}
          >
            <SheetClose className={cn("w-full flex", getJustifyContent())}>
              <ButtonComponents {...props} />
            </SheetClose>
          </Link>
        </Button>
      ) : (
        <Button
          asChild
          className={cn(className, "group")}
          size={size}
          variant={appearance}
          justifyContent={justifyContent}
          isActive={getIsActive(currentUrl) || isCurrentlySelected}
        >
          <Link
            className={cn("relative no-underline prose", className)}
            href={urlWithParams}
            {...newTabProps}
          >
            <ButtonComponents {...props} />
          </Link>
        </Button>
      )}
    </>
  )
}

const LineUnderButton = ({
  baseWidth,
  isActive,
  className,
}: {
  baseWidth: string
  isActive?: boolean
  className?: string
}) => (
  <span
    className={cn(
      `absolute bottom-[-3px] left-0 h-[1px] bg-accent transition-all duration-300 ${baseWidth}`,
      isActive ? "w-full" : "group-hover:w-full",
      className,
    )}
  ></span>
)
