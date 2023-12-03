import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { chainsConfig } from "~/lib/wagmiPrivyClient";

import { initializeFirebase } from "~/lib/firebase";

import { api } from "~/utils/api";

import theme from "~/theme";
import { NoSSR } from "~/components/NoSSR";

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "";

initializeFirebase();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["wallet", "google", "github", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#C4088F",
          logo: "https://1drv.ms/i/s!AvNhxv8YI_Ipgcl2FgNp7Bo6XqoBtA?e=Yymxw9",
        },
        embeddedWallets: {
          createOnLogin: "all-users",
          noPromptOnSignature: true,
        },
      }}
    >
      <PrivyWagmiConnector wagmiChainsConfig={chainsConfig}>
        <ChakraProvider theme={theme}>
          <NoSSR>
            <Component {...pageProps} />
          </NoSSR>
        </ChakraProvider>
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
};

export default api.withTRPC(MyApp);
