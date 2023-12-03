import React, { useEffect, useRef, useState } from "react";
import { Link } from "@chakra-ui/next-js";
import {
  type ConnectedWallet,
  useWallets,
  usePrivy,
} from "@privy-io/react-auth";

import { BellIcon, HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export const APPBAR_HEIGHT_PX = 56;
export const NAVBAR_HEIGHT_PX = 0;

export interface AppBarProps {
  title?: string;
  navTitle?: string;
}

type MenuDrawerProps = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isReady: boolean;
  onSigninHandler: () => void;
  onSignoutHandler: () => void;
};

const MenuDrawer = ({
  isAuthenticated,
  isLoading,
  isReady,
  onSigninHandler,
  onSignoutHandler,
}: MenuDrawerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        onClick={onOpen}
        ref={btnRef}
        variant="unstyled"
        aria-label="Menús"
        icon={
          <HamburgerIcon
            color="brandWhite"
            h={[8, null, 7]}
            w={[8, null, 7]}
            _hover={{
              color: "primary",
            }}
          />
        }
        size="md"
      />
      <Drawer
        size={["full", null, "xs", null, "sm"]}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bgColor="brandDarkPurple"
          maxH="100svh"
          pt={[8, null, 6]}
          pb={16}
        >
          <DrawerCloseButton
            size="lg"
            color="brandWhite"
            _hover={{ background: "transparent", color: "primary" }}
          />
          <DrawerHeader color="primary" fontSize={["2xl"]}>
            Menu
          </DrawerHeader>
          <DrawerBody px={12}>
            <List spacing={4} fontSize={["xl"]}>
              {isAuthenticated ? (
                <>
                  <ListItem display="flex" alignItems="center">
                    <Link
                      href="/account"
                      display="flex"
                      w="full"
                      alignItems="center"
                      gap={4}
                      onClick={onClose}
                    >
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        h={5}
                        w={5}
                      >
                        <path d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-6 2.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM19 15H9v-.25C9 12.901 11.254 11 14 11s5 1.901 5 3.75V15z" />
                        <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z" />
                      </Icon>
                      Mi Cuenta
                    </Link>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Link
                      href="#"
                      display="flex"
                      w="full"
                      alignItems="center"
                      gap={4}
                      onClick={onClose}
                    >
                      <SettingsIcon boxSize={5} />
                      Configuración
                    </Link>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Link
                      href="#"
                      display="flex"
                      w="full"
                      alignItems="center"
                      gap={4}
                      onClick={onClose}
                    >
                      <BellIcon boxSize={5} />
                      Notificaciones
                    </Link>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem display="flex" alignItems="center">
                    <Link
                      href="/"
                      display="flex"
                      alignItems="center"
                      gap={4}
                      onClick={onClose}
                    >
                      Inicio
                    </Link>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Link
                      href="#"
                      display="flex"
                      alignItems="center"
                      gap={4}
                      onClick={onClose}
                    >
                      Docs
                    </Link>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Link
                      href="#"
                      display="flex"
                      alignItems="center"
                      gap={4}
                      onClick={onClose}
                    >
                      Comunidad
                    </Link>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Link
                      href="#"
                      display="flex"
                      alignItems="center"
                      gap={4}
                      onClick={onClose}
                    >
                      Nosotros
                    </Link>
                  </ListItem>
                </>
              )}
            </List>
            {isReady && !isAuthenticated && (
              <Flex px={12} mt={8}>
                <Button
                  variant="primary"
                  size={["lg", null, "md"]}
                  w="full"
                  onClick={() => onSigninHandler()}
                >
                  Ingresar
                </Button>
              </Flex>
            )}
          </DrawerBody>
          {isReady && isAuthenticated && (
            <DrawerFooter px={12}>
              <Button
                variant="secondary"
                size={["lg", null, "md"]}
                w="full"
                onClick={() => {
                  onSignoutHandler();
                  onClose();
                }}
                isLoading={isLoading}
                loadingText="Saliendo..."
                spinnerPlacement="end"
              >
                Logout
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const AppBar: React.FC<AppBarProps> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    authenticated: isAuthenticated,
    login,
    logout,
    ready: isReady,
    user,
  } = usePrivy();
  const { wallets } = useWallets();
  const currentWallet = useRef<ConnectedWallet | null>(wallets[0] ?? null);

  useEffect(() => {
    currentWallet.current = wallets[0] ?? null;
    console.log(currentWallet.current);
  }, [wallets]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      login();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      width="100vw"
      height={`${APPBAR_HEIGHT_PX}px`}
      p={[4, null, null, 8]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <Link as="div" display="flex" gap={2} alignItems="center" href="/">
          <Image src="/logos/fruta-logo.png" alt="Bazarefi logo" h={7} w={7} />
          <Text fontSize="2xl" fontWeight="bold">
            Bazarefi
          </Text>
        </Link>
        <Flex alignItems="center" gap={4}>
          <MenuDrawer
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            isReady={isReady}
            onSigninHandler={handleLogin}
            onSignoutHandler={handleLogout}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export const PageWithAppBar: React.FC<
  AppBarProps & { children: React.ReactNode }
> = (props) => {
  return (
    <>
      <AppBar {...props} />
      <Box
        as="main"
        position="absolute"
        top={`${APPBAR_HEIGHT_PX}px`}
        sx={{
          height: `calc(100svh - ${APPBAR_HEIGHT_PX}px - ${NAVBAR_HEIGHT_PX}px)`,
          width: "100vw",
          overflow: "scroll",
          overflowX: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {props.children}
      </Box>
    </>
  );
};
