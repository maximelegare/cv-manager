import fs from "fs"
import path from "path"

export const getCompiledCSS = async (locale: string) => {
  if (!locale) {
    return ""
  }
  try {
    // Read CSS directly from filesystem (server-side)
    const cssPath = path.join(
      process.cwd(),
      ".next",
      "static",
      "css",
      "app",
      "(frontend)",
      "[locale]",
      "layout.css",
    )

    if (fs.existsSync(cssPath)) {
      return fs.readFileSync(cssPath, "utf8")
    }

    return ""
  } catch (error) {
    console.error("Error getting compiled CSS", error)
    return ""
  }
}
