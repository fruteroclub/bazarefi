"use client";

import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  chakra,
  Tooltip,
  Button,
} from "@chakra-ui/react";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Tu artículo...",
  price: 0.0,
};

function ProductCard({
  productName,
  productPrice,
  productQuantity,
  previewImage,
}: {
  productName?: string;
  productPrice?: string;
  productQuantity?: string;
  previewImage?: string;
}) {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={"white"}
        maxW="md"
        borderWidth="2px"
        rounded="lg"
        borderColor="primary"
      >
        <Image
          src={previewImage ?? data.imageURL}
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
        />

        <Box py="6" px={4}>
          <Box display="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                New
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              color="canvasDark"
              isTruncated
            >
              {productName && productName.length > 0 ? productName : data.name}
            </Box>
            <Button variant="primary" size="sm">
              Comprar
            </Button>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box color={"gray.600"}>
              {parseInt(productQuantity ?? "0") ? productQuantity : "1"}{" "}
              {parseInt(productQuantity ?? "0") > 1 ? "piezas" : "pieza"}
            </Box>
            <Box fontSize="2xl" color={"gray.800"}>
              {productPrice
                ? parseFloat(productPrice).toFixed(4)
                : data.price.toFixed(4)}
              <Box as="span" color={"gray.600"} fontSize="lg" ml={1.5}>
                ETH
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCard;
