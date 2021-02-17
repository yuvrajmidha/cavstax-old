import { Box, Container, Heading, SimpleGrid, Text, FormControl, FormErrorMessage, Button, FormLabel, Input, HStack } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import Head from 'next/head'

import React, { useEffect } from 'react'

function Service() {

    const [service, setSerive] = React.useState()

    useEffect(() => {
        
    }, [])

    return (
        <Box as="section" py={32}>
            <Container maxW="7xl">
                <HStack alignItems="start" columns={2} spacing={2}>
                    <Box width="50%" px={4}>
                        <Heading color="gray.700" size="3xl" fontWeight="800" lineHeight="130%">Company Online Registeration</Heading>
                        <Text mt={8}>
                        YOU CAN NOW REGISTER A COMPANY IN INDIA AT VERY COMPELLING PRICES!
                        <br/><br/>
                        Setting a Private Limited Company is one of the highly recommended ways to start a business in India. This type of company offers limited liability for its shareholders with certain restrictions placed on the ownership. An LLP has partners, who own and manage the business. Whereas in private limited company registration, directors may be different from shareholders.
                        <br/><br/>
                        Vakilsearch, your leading legal consultant, offers quick Company Registration service in India at nominal pricing. Here you will find how you can register your company.
                        <br/><br/>
                        We take care of all legal formalities and fulfill the compliances, as defined by the Ministry of Corporate Affairs. Post-approval of the company registration process, you receive a Certificate of Incorporation (CoI), along with PAN and TAN. Now, you can open a current bank account and begin your business operations.
                        </Text>
                        <Text mt={4}>
                        <b>Checklist for Registering a Company in India</b>
                        <br/><br/>
                        As defined under the Companies Act 2013, we have to ensure the requirements of checklist
                        <br/><br/>
                        Two Directors:
                        <br/><br/>
                        A private limited company must have at least two directors and at most, there can be 15 directors. Among all the directors in the business, at least one must be a resident of India.
                        <br/><br/>
                        Unique Name
                        <br/><br/>
                        The name of your business must be unique. The suggested name should not match with any existing companies or trademarks in India.
                        <br/><br/>
                        Minimum Capital Contribution:
                        <br/><br/>
                        There is no minimum capital amount for a company. A company should have an authorized capital of at least Rs. 1 lakh.
                        <br/><br/>
                        Registered Office:
                        <br/><br/>
                        The registered office of a company does not have to be a commercial space. Even a rented home can be the registered office, so long as an NOC is obtained from the landlord.
                        </Text>
                    </Box>
                    <Box width="50%" px={4} pos="sticky" top={24}>
                        <Box bg="white" color="gray.700" py={12} px={8} shadow="xl" rounded={8}>
                            <Heading size="lg" mb={8}>Register your company now!</Heading>
                            <Formik
                                onSubmit={(values, actions) => {
                                    setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2))
                                    actions.setSubmitting(false)
                                    }, 1000)
                                }}
                                >
                                {(props) => (
                                    <Form>
                                    <Field name="name">
                                        {({ field, form }) => (
                                        <FormControl my={6} isInvalid={form.errors.name && form.touched.name}>
                                            <Input py={6} {...field} id="name" placeholder="Name" />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                        )}
                                    </Field>
                                    <Field name="email">
                                        {({ field, form }) => (
                                        <FormControl my={6} isInvalid={form.errors.email && form.touched.email}>
                                            <Input py={6} {...field} id="email" placeholder="Email Address" />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                        )}
                                    </Field>
                                    <Field name="mobile">
                                        {({ field, form }) => (
                                        <FormControl my={6} isInvalid={form.errors.mpbile && form.touched.mobile}>
                                            <Input py={6} {...field} id="mobile" placeholder="Mobile Number" />
                                            <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
                                        </FormControl>
                                        )}
                                    </Field>
                                    <Field name="city">
                                        {({ field, form }) => (
                                        <FormControl my={6} isInvalid={form.errors.city && form.touched.city}>
                                            <Input py={6} {...field} id="city" placeholder="City" />
                                            <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                                        </FormControl>
                                        )}
                                    </Field>
                                    <Button
                                        mt={4}
                                        colorScheme="teal"
                                        isLoading={props.isSubmitting}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Box>
                </HStack>
            </Container>
        </Box>
    )
}

export default Service
