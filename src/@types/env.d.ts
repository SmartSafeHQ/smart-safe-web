declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_ENV: 'production' | 'development'
    NEXT_PUBLIC_SMART_SAFE_DISCORD_LINK: string
  }
}
