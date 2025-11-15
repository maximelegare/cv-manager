import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"
import { getCompiledCSS } from "@app/utilities/getCompiledCSS"

import { type PayloadHandler } from "payload"

export const generatePDFHandler: PayloadHandler = async (req): Promise<Response> => {
  try {
    const data = await req.json()

    const html = data.html

    // Get CSS server-side
    const css = await getCompiledCSS("en")

    const htmlWithStyles = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
        ${css}
         @page {
              size: letter;
              margin: 0;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              color: black !important;
              width: 100% !important;
              height: auto !important;
            }
            /* Force visibility of all elements */
            * {
              visibility: visible !important;
              opacity: 1 !important;
            }
            /* Ensure main element is visible */
            main {
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
              position: relative !important;
            }
            /* Ensure prose styles from compiled CSS are applied - no overrides, just ensure they work */
            /* The styles come from:
             * 1. Tailwind typography plugin (tailwind.config.mjs) - fontSize, fontWeight, opacity
             * 2. globals.css - margin-top, margin-bottom, line-height, margin-left
             */
            .pdf-page {
              page-break-after: always;
            }
        </style>
      </head>
      <body>${html || "<p>No content provided</p>"}</body>
    </html>
  `

    chromium.setGraphicsMode = false

    const browser = await puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await chromium.executablePath(),
      headless: true,
    })

    const page = await browser.newPage()

    // Set a viewport that matches the content size (850px width for A4-like content)
    // Use a smaller viewport to avoid md breakpoint styles (md is 768px in Tailwind)
    await page.setViewport({
      width: 767, // Just below md breakpoint
      height: 1600,
      deviceScaleFactor: 1,
    })

    // Set content and wait for it to fully render
    await page.setContent(htmlWithStyles, {
      waitUntil: "networkidle0",
      timeout: 30000,
    })

    // Wait for fonts and ensure all styles are applied
    await page.evaluateHandle(() => document.fonts.ready)
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "letter",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    })

    await browser.close()

    return new Response(pdfBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="document.pdf"',
      },
    })
  } catch (error) {
    console.error("Error generating PDF", error)
    return Response.json({ error: "Error generating PDF" }, { status: 500 })
  }
}
