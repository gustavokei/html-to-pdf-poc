import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

/*
  POST /api/convert-pdf
  Body: { html: string, filename?: string, pdfOptions?: puppeteer.PDFOptions }
  Response: { ok: true, filename: string, pdfBase64: string } | { ok: false, error: string }
*/
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { html, filename = 'file', pdfOptions } = req.body || {}
  if (!html || typeof html !== 'string') {
    return res.status(400).json({ ok: false, error: 'Missing html' })
  }

  let browser
  try {
    const executablePath = await chromium.executablePath()
    browser = await puppeteer.launch({
      args: chromium.args,
      headless: true,
      executablePath,
      defaultViewport: { width: 1280, height: 800 }
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: ['networkidle0', 'domcontentloaded'] })
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '8mm', bottom: '10mm', left: '8mm' },
      ...(pdfOptions || {})
    })

    return res.status(200).json({
      ok: true,
      filename: `${filename}.pdf`,
      pdfBase64: buffer.toString('base64')
    })
  } catch (error: any) {
    return res.status(500).json({ ok: false, error: error?.message || 'Failed to generate PDF' })
  } finally {
    if (browser) await browser.close().catch(() => null)
  }
}
