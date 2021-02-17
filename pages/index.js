import Head from 'next/head'
import BasicHero from '../components/hero/BasicHero'
import { FcDoughnutChart, FcMultipleDevices, FcPrivacy, FcTimeline } from 'react-icons/fc'
import {Feature} from '../components/ui/Feature'
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'

export default function Home() {
  return (
   <>
      <Head>
        <title>Cavstax Associates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicHero headline2="Be Advised" headline1="Competition is complex out there,"></BasicHero>
      <Box as="section" py="16">
        <Container maxW="7xl">
          <Heading fontWeight="700" mb={4} textAlign="center" color="red.500" size="sm" letterSpacing={2} textTransform="uppercase">Our Features</Heading>
          <Heading size="2xl" fontWeight="800" textAlign="center">4 Reasons why customer loves us.</Heading>
        
          <Box maxW={{ base: 'xl', md: '5xl' }} al mt={24} mx="auto" px={{ base: '6', md: '8' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10" spacingY="14">
              <Feature title="Secure by default" icon={<FcPrivacy />}>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.
              </Feature>
              <Feature title="Always up to date" icon={<FcTimeline />}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
              </Feature>
              <Feature title="Incredible statistics" icon={<FcDoughnutChart />}>
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.
              </Feature>
              <Feature title="Support for multiple devices" icon={<FcMultipleDevices />}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
              </Feature>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </>
     
  )
}
