import { Box, Flex, Image } from "@chakra-ui/react";

export function EditUserAvatar({ preview }: { preview?: string }) {
  return (
    <Flex
      w={["100%"]}
      rounded="lg"
      // pl={[8, null, 16, 20, 24]}
      justifyContent="start"
      alignItems="start"
    >
      {preview ? (
        <Box
          position="relative"
          h="100%"
          w={["100%"]}
          overflow="hidden"
          rounded="lg"
        >
          <Image
            src={preview}
            _hover={{ cursor: "pointer" }}
            alt="profile-img"
            aspectRatio={1}
            objectFit="cover"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(preview);
            }}
          />
        </Box>
      ) : (
        <Flex
          w={["100%"]}
          _hover={{ cursor: "pointer" }}
          aspectRatio={1}
          bgGradient={"linear(to-br, #FF00FF, #0000FF)"}
          rounded="lg"
          pl={12}
          pr={4}
          pb={4}
          justifyContent="end"
          alignItems="end"
        >
          <Image
            width="65%"
            src="/assets/troopie-eyes-black.svg"
            alt="Placeholder image"
            objectFit="contain"
          />
        </Flex>
      )}
    </Flex>
  );
}
