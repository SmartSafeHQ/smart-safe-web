import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <body className="bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
