import { usePrivy } from "@privy-io/react-auth";

import { api } from "~/utils/api";

import { Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";

import { PageWithAppBar } from "~/components/layout/AppBar";
import { Link } from "@chakra-ui/next-js";

import { PROJECTS } from "~/constants/projects";
import ProjectCard from "~/components/cards/ProjectCard";

const Marketplace = () => {
  const { authenticated: isAuthenticated, ready, user: privyUser } = usePrivy();

  return (
    <PageWithAppBar>
      <Flex
        pt={6}
        flexDirection={"column"}
        px={8}
        width={["100%", null, "80%"]}
      >
        <Heading mb={6}>Proyectos ReFi</Heading>
        <Link href="/marketplace/publicar"></Link>
        <SimpleGrid columns={[1, null, 3, 4]} spacing={[4, null, 8]}>
          {PROJECTS.map((project) => (
            <ProjectCard
              projectCategory={project.category}
              projectName={project.name}
              projectWebsite={project.website}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </PageWithAppBar>
  );
};

export default Marketplace;
