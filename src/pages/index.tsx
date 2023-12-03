import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { PageWithAppBar } from "~/components/layout/AppBar";

function Home() {
  return (
    <>
      <PageWithAppBar>
        <Flex
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          h="100%"
          w="100%"
          pt={[32]}
          pb={8}
          px={2}
          gap={8}
        >
          <VStack gap={[4, null, 12, 4]}>
            <Heading as="h1" size={["2xl"]} color="primary" fontWeight="bold">
              Explora colecciones
              <br /> apoya proyectos locales
            </Heading>
            <Box px={[0]}>
              <Heading
                as="h3"
                size={["xl", null, "2xl"]}
                textAlign="center"
                fontWeight="medium"
              >
                Marketplace para Degens
                <br />
                creado por Regens
              </Heading>
            </Box>
          </VStack>
          <Flex justifyContent="center">
            <Button
              px={8}
              py={4}
              variant="secondary"
              fontSize="xl"
              style={{ height: "unset", whiteSpace: "initial" }}
            >
              <Text noOfLines={2}>🚧 En construcción 🏗️</Text>
            </Button>
          </Flex>
        </Flex>
      </PageWithAppBar>
    </>
  );
}

export default Home;
