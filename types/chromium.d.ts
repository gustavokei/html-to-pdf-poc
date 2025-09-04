declare module '@sparticuz/chromium' {
  export const args: string[]
  export function executablePath(): Promise<string>
}
