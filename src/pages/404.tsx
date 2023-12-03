import { Link } from "@chakra-ui/next-js";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { PageWithAppBar } from "~/components/layout/AppBar";

export default function NotFound() {
  return (
    <PageWithAppBar>
      <Box textAlign="center" py={[32, null, 16, 24, 32]} px={16}>
        <Heading display="inline-block" as="h2" size="3xl" color="primary">
          404
        </Heading>
        <Text fontSize="2xl" mt={3} mb={2} fontWeight="medium">
          Página No Encontrada
        </Text>
        <Text fontSize="lg" mb={6}>
          Parece que no hay nada por aquí...
        </Text>

        <Link href="/">
          <Button variant="primary" size="lg">
            Ir a Inicio
          </Button>
        </Link>
      </Box>
    </PageWithAppBar>
  );
}
