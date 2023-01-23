import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col px-2 pt-8 md:px-4">
      <Head>
        <title>Tokenverse | Home</title>
        <meta name="description" content="Tokenverse dashboard home" />
      </Head>
      Hello Dashboard!!
    </div>
  )
}
