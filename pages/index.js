import Head from 'next/head'
import BasicHero from '../components/hero/BasicHero'
import HeaderWithImage from '../components/hero/HeaderAndImage'

export default function Home() {
  return (
   <>
      <Head>
        <title>Cavstax Associates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicHero headline2="Be Advised" headline1="Competition is complex out there,"></BasicHero>
    </>
     
  )
}
