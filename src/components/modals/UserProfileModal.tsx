import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

import { api } from "~/utils/api";

import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { uploadBytes, getDownloadURL, getStorage, ref } from "firebase/storage";
import { FileUploader } from "~/components/fileUploader";
import { EditUserAvatar } from "~/components/user/EditUserAvatar";

import { type UseQueryResult } from "@tanstack/react-query";
import { type User } from "~/types";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function UserSetup({
  currentUser,
  isUserEditing = false,
  notSignedUp = false,
  onClose,
  refetchUser,
}: {
  currentUser?: User;
  isUserEditing?: boolean;
  notSignedUp?: boolean;
  onClose?: () => void;
  refetchUser: (options?: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>;
}) {
  const [avatarImage, setAvatarImage] = useState<string>(
    currentUser?.avatar_url ?? ""
  );
  const [username, setUsername] = useState<string>(currentUser?.username ?? "");
  const [email, setEmail] = useState<string>(currentUser?.email ?? "");
  const [bio, setBio] = useState<string>(currentUser?.bio ?? "");
  const [profileImg, setProfileImg] = useState<{ preview: string }>();

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { authenticated: isAuthenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const isConnected = Boolean(address && isAuthenticated);

  const toast = useToast();

  const { mutate: createUser, status: createUserStatus } =
    api.users.createUser.useMutation({
      async onSuccess() {
        await refetchUser();
        toast({
          title: "Tu perfil fue creado exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError(err) {
        toast({
          status: "error",
          description: err.message,
        });
      },
    });

  const { mutate: updateUser, status: updateUserStatus } =
    api.users.updateUserById.useMutation({
      async onSuccess() {
        await refetchUser();
        isUserEditing &&
          toast({
            title: "Profile updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        onClose?.();
      },
      onError(err) {
        toast({
          status: "error",
          description: err.message,
        });
      },
    });

  const handleUpdateUser = () => {
    if (!user) {
      toast({
        title: "Debes iniciar sesión",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    return updateUser({
      id: user.id,
      data: {
        avatar_url: avatarImage ?? undefined,
        bio: bio.length > 0 ? bio : undefined,
        email: email.length > 0 ? email : undefined,
      },
    });
  };

  const handleCreateUser = () => {
    const [embeddedWallet] = wallets.filter(
      (wallet) =>
        wallet.connectorType === "embedded" &&
        wallet.walletClientType === "privy"
    );

    if (!user || !embeddedWallet) {
      toast({
        title: "Debes iniciar sesión",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    return createUser({
      id: user.id,
      wallet: embeddedWallet.address,
      username,
      email,
      bio,
      avatar_url: avatarImage,
    });
  };

  //   Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();
  //   Create a reference to 'username-avatar.jpg'
  const avatarRef = ref(storage, `users/${username}-avatar.jpg`);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isConnected && (notSignedUp || isUserEditing)}
      onClose={() => null}
      scrollBehavior="inside"
      size={["full", null, "lg", "lg"]}
    >
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent pt={8} pb={4}>
        {isUserEditing && <ModalCloseButton onClick={onClose} />}
        <ModalHeader px={[8, null, 12]} pb={0}>
          {isUserEditing ? (
            <Heading
              lineHeight={1.1}
              mb={[2, null, 4]}
              fontSize={[null, null, null, null, "3xl"]}
            >
              Edit your profile
            </Heading>
          ) : (
            <>
              <Heading
                lineHeight={1.1}
                mb={[2, null, 4]}
                fontSize={[null, null, null, null, "3xl"]}
              >
                ¡Bienvenido a Bazarefi!
              </Heading>
              <Text fontSize="md" fontWeight="normal">
                El primer bazar enfocado en proyectos ReFi. Comparte un poco más
                de ti con la comunidad Regen 🤓
              </Text>
            </>
          )}
        </ModalHeader>
        <ModalBody
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          px={[8, null, 16]}
          pt={[6, null, null, 4]}
          gap={[4, null, null, 3, 4]}
        >
          <Flex w="100%" flexDirection="column" alignItems="center">
            <Flex
              w={["60%", null, "40%", "32.5%", "40%"]}
              justifyContent="start"
            >
              <FileUploader
                accept={{ "image/*": [".png", ".jpeg"] }}
                multiple={false}
                maxSize={10000000}
                noDrag={true}
                InnerDropzone={
                  currentUser?.avatar_url ?? profileImg?.preview ? (
                    <Flex
                      w={["100%"]}
                      rounded="lg"
                      justifyContent="start"
                      alignItems="start"
                    >
                      {currentUser?.avatar_url ?? profileImg?.preview ? (
                        <Image
                          width="100%"
                          src={
                            profileImg?.preview ?? currentUser?.avatar_url ?? ""
                          }
                          alt={`${currentUser?.username} profile image`}
                          rounded="lg"
                          aspectRatio={1}
                          objectFit="contain"
                          _hover={{ cursor: "pointer" }}
                        />
                      ) : (
                        <Avatar w="100%" h="100%" />
                      )}
                    </Flex>
                  ) : (
                    <EditUserAvatar preview={profileImg?.preview} />
                  )
                }
                onDrop={(acceptedFiles, rejectedFiles) => {
                  if (rejectedFiles.length > 0) {
                    rejectedFiles.forEach(({ file, errors }) => {
                      console.error(file.name, file.size, errors);
                      errors.map((error) => {
                        if (error.code === "file-too-large") {
                          toast({
                            title: "File too large",
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                          });
                        }
                        if (error.code === "file-invalid-type") {
                          toast({
                            title: "Invalid file type",
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                          });
                        }
                      });
                    });
                  } else {
                    uploadBytes(avatarRef, acceptedFiles[0]!)
                      .then((snapshot) => {
                        return getDownloadURL(snapshot.ref);
                      })
                      .then((downloadURL) => {
                        setAvatarImage(downloadURL);
                        setProfileImg(() =>
                          Object.assign(acceptedFiles[0]!, {
                            preview: URL.createObjectURL(acceptedFiles[0]!),
                          })
                        );
                      })
                      .catch((error) => console.error(error));
                  }
                }}
              />
            </Flex>
            <Text fontSize="sm">Click para cambiar</Text>
          </Flex>
          {isUserEditing ? (
            <Heading>{currentUser?.username}</Heading>
          ) : (
            <FormControl>
              <FormLabel mb={1}>Escoge un nombre de usuario</FormLabel>
              <Input
                type="text"
                placeholder="CosmeFulanito"
                _placeholder={{ color: "#948299" }}
                isInvalid={!/^[A-Za-z0-9_]{5,256}$/.test(username)}
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel mb={1}>
              {isUserEditing
                ? "Correo electrónico registrado"
                : "Correo para recibir notificaciones"}
            </FormLabel>
            <Input
              type="email"
              placeholder={
                isUserEditing ? "Sin correo registrado" : "cosme@fulanito.com"
              }
              _placeholder={{ color: "#948299" }}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel mb={1}>
              {isUserEditing ? "Tu bio" : "Cuéntanos un poco sobre ti"}
            </FormLabel>
            <Textarea
              placeholder={
                isUserEditing
                  ? "¡Comparte algo con la comunidad!"
                  : "Me gustan los paseos en la playa bajo la luna..."
              }
              _placeholder={{ color: "#948299" }}
              value={bio}
              onChange={(event) => {
                setBio(event.target.value);
              }}
            />
          </FormControl>
          {isUserEditing ? (
            <Box pt={[6, null, null, 4]} display="flex" justifyContent="center">
              <Button
                variant="troop-gradient"
                onClick={() => handleUpdateUser()}
                isLoading={updateUserStatus === "loading"}
                loadingText="Saving"
                spinnerPlacement="end"
              >
                Save changes
              </Button>
            </Box>
          ) : (
            <>
              <Box
                pt={[6, null, null, 4]}
                display="flex"
                justifyContent="center"
              >
                <Button
                  isLoading={createUserStatus === "loading"}
                  borderRadius="full"
                  bgGradient="linear(to-tr, #0000FF, #FF00FF)"
                  color="white"
                  size="lg"
                  onClick={handleCreateUser}
                >
                  🚀 LFG! 🚀
                </Button>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="ghost"
                  color="brandWhite"
                  size="sm"
                  onClick={() => {
                    disconnect();
                  }}
                >
                  No gracias, cerrar sesión
                </Button>
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
