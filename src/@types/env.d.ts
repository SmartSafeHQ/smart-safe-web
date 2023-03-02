declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_ALCHEMY_SOLANA: string
    NEXT_PUBLIC_ENV: 'production' | 'development'
    NEXT_PUBLIC_COGNITO_REGION: string
    NEXT_PUBLIC_COGNITO_USER_POOL_ID: string
    NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID: string
    NEXT_PUBLIC_TOKENVERSE_API_URL: string
    NEXT_PUBLIC_POLYGON_SCAN_API_KEY: string
    NEXT_PUBLIC_BNB_SCAN_API_KEY: string
    NEXT_PUBLIC_AVAX_SCAN_API_KEY: string
    NEXT_PUBLIC_ETH_SCAN_API_KEY: string
    NEXT_PUBLIC_ETH_RPC_API_KEY: string
    NEXT_PUBLIC_WC_PROJECT_ID: string
    NEXT_PUBLIC_WC_URL: string
  }
}
