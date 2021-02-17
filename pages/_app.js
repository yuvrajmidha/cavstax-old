import '../styles/globals.css'
import Header from '../components/header'
import { ChakraProvider } from "@chakra-ui/react"
import '../styles/fonts.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
  
    </Head>
    <ChakraProvider>
      <Header></Header>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
}

export default MyApp
