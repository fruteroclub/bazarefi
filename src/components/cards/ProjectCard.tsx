"use client";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
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
  Avatar,
} from "@chakra-ui/react";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Tu artículo...",
  price: 0.0,
};

function ProjectCard({
  projectName,
  projectCategory,
  projectWebsite,
}: {
  projectName: string;
  projectCategory: string;
  projectWebsite: string;
}) {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        w="full"
        bg={"white"}
        borderWidth="2px"
        rounded="lg"
        borderColor="primary"
        pt={8}
        pb={2}
      >
        <Avatar size="xl" name={projectName} src={""} />

        <Box py="6" px={4}>
          <Box display="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                {projectCategory}
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              color="canvasDark"
              isTruncated
            >
              {projectName}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box color={"gray.600"}>{projectCategory}</Box>
            <Box fontSize="lg" color={"gray.800"}>
              <Link href={projectWebsite}>
                Sitio
                <ExternalLinkIcon />{" "}
              </Link>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProjectCard;
