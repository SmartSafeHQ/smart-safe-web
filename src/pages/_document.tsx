import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <body className="bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
