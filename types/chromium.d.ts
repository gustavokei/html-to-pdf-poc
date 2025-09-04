declare module '@sparticuz/chromium' {
  // Launch arguments passed to Chromium
  export const args: string[]

  // Default viewport Sparticuz exposes (can be null letting Puppeteer decide)
  export const defaultViewport: { width: number; height: number } | null

  // Headless setting exposed by the library (matches puppeteer-core 22.x expected union)
  export const headless: boolean | 'shell'

  // Resolves to an executable path for the bundled Chromium in the serverless environment
  export function executablePath(): Promise<string>

  // Default export aggregating the above (matches runtime shape)
  const _default: {
    args: typeof args
    defaultViewport: typeof defaultViewport
    headless: typeof headless
    executablePath: typeof executablePath
  }
  export default _default
}
