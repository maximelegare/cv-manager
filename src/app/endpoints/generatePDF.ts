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
    <html>
      <head>
        <style>
        ${css}
         @page {
              size: A4;
              margin: 10mm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .pdf-page {
              page-break-after: always;
            }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `

    chromium.setGraphicsMode = false

    const viewport = {
      deviceScaleFactor: 1,
      hasTouch: false,
      height: 1080,
      isLandscape: true,
      isMobile: false,
      width: 1920,
    }

    const browser = await puppeteer.launch({
      args: puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
      defaultViewport: viewport,
      executablePath: await chromium.executablePath(),
      headless: "shell",
    })

    const page = await browser.newPage()
    await page.setContent(htmlWithStyles, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", bottom: "10mm" },
    })

    const content = await page.content()
    console.log("content", content.slice(0, 10000))

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
