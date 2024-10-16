import AppLayout from "@/components/Layouts/AppLayout"; 
import "@/styles/globals.css";
import "animate.css";

import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app"; 
import Head from "next/head";
import ClientOnly from "@/components/Layouts/ClientOnly";

export default function App({ Component, pageProps }: AppProps) {
  

  return (
    <ClientOnly>
      <ChakraProvider> 
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            {/* <ErrorBoundary> */}
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout> 
      </ChakraProvider>
    </ClientOnly>
  );
}
