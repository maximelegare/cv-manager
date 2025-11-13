export const generatePDF = async (itemsToGeneratePDF: Record<string, string>) => {
  // Get all HTML fragments across pages
  const allSections = Object.values(itemsToGeneratePDF)

  // Add CSS page breaks between each section
  const htmlWithBreaks = allSections
    .map(
      (section, index) =>
        `${section}${
          index < allSections.length - 1 ? '<div style="page-break-after: always;"></div>' : ""
        }`,
    )
    .join("")

  // Send to your Puppeteer endpoint (CSS will be fetched server-side)
  const res = await fetch("/api/generate-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html: htmlWithBreaks }),
  })

  // Download file
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "document.pdf"
  a.click()
  URL.revokeObjectURL(url)
}
