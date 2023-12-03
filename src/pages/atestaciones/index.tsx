import { usePrivy } from "@privy-io/react-auth";

import { api } from "~/utils/api";

import { Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";

import { PageWithAppBar } from "~/components/layout/AppBar";
import ProductCard from "~/components/cards/ProductCard";
import { Link } from "@chakra-ui/next-js";

const Attestations = () => {
  const { authenticated: isAuthenticated, ready, user: privyUser } = usePrivy();
  // const { data: products, status: fetchProductsStatus } =
  //   api.products.getUserProducts.useQuery(
  //     { ownerId: privyUser?.id ?? "" },
  //     {
  //       enabled: Boolean(ready && privyUser?.id && isAuthenticated),
  //     }
  //   );

  const { data: products, status: fetchProductsStatus } =
    api.products.getAllProducts.useQuery();

  return (
    <PageWithAppBar>
      <Flex
        pt={6}
        flexDirection={"column"}
        px={8}
        width={["100%", null, "80%"]}
      >
        <Heading mb={6}>Atestaciones</Heading>
        {isAuthenticated && (
          <Link href="/atestaciones/publicar">
            <Button variant="primary">Publicar</Button>
          </Link>
        )}
        <SimpleGrid columns={[1, null, 3, 4]} spacing={[4, null, 8]}>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCard
                productName={product.name}
                productPrice={product.price}
                productQuantity={product.quantity}
                previewImage={product.image_url}
              />
            ))}
        </SimpleGrid>
      </Flex>
    </PageWithAppBar>
  );
};

export default Attestations;
