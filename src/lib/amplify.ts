import awsconfig from '../aws-exports'

export const amplifyConfig = {
  ...awsconfig,
  ssr: true
}
