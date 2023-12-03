import {
  extendTheme,
  type StyleFunctionProps,
  type ThemeConfig,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  breakpoints: {
    base: "0em", // 0px      (default)
    sm: "30em", // ~480px   (default)
    md: "48em", // ~768px   (default)
    lg: "62em", // ~992px   (default)
    xl: "75em", // ~1200px  (custom)
    "2xl": "96em", // ~1536px  (default)
  },
  colors: {
    canvas: "#F8F0FB",
    canvasDark: "#0A0317",
    primary: "#C4088F",
    secondary: "#19083C",
    tertiary: "#FF9900",
    brandBlack: "#07020F",
    brandWhite: "#F8F0FB",
    brandDarkPurple: "#0F0523",
    black: "#000",
    white: "#fff",
    transparent: "transparent",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "lg",
        fontWeight: "semibold",
      },
      variants: {
        primary: {
          bg: "primary",
          color: "brandWhite",
          _hover: {
            bg: "#D6099C",
            backgroundColor: "#D6099C",
          },
          _disabled: {
            bg: "primary",
            backgroundColor: "primary",
            boxShadow: "inset 0 0 0 2px #f25b3d",
          },
          _active: {
            backgroundColor: "primary",
          },
          _focus: {
            backgroundColor: "primary",
          },
        },
        secondary: {
          bg: "brandBlack",
          boxShadow: "inset 0 0 0 2px #f6f2e6",
          color: "brandWhite",
          _hover: {
            bg: "brandDarkPurple",
          },
        },
        outline: {
          bg: "brandBlack",
          boxShadow: "inset 0 0 0 2px #f25b3d",
          color: "primary",
          fontWeight: "semibold",
          _disabled: {
            bg: "brandBlack",
            boxShadow: "inset 0 0 0 2px #f25b3d",
            color: "primary",
          },
          _hover: {
            bg: "ldBlackJet.700",
          },
        },
        "black-outline": {
          bg: "whiteAlpha.900",
          boxShadow: "inset 0 0 0 2px #000",
          color: "black",
          fontWeight: "semibold",
          _hover: {
            bg: "brandWhite",
          },
        },
      },
    },
    Heading: { baseStyle: { fontWeight: "semibold" } },
    Link: {
      baseStyle: {
        _hover: { color: "primary", textDecoration: "none" },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          backgroundColor: "brandBlack",
          border: "2px",
        },
        item: {
          backgroundColor: "transparent",
          _hover: {
            backgroundColor: "primary",
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: { background: "secondary" },
      },
    },
    Spinner: {
      baseStyle: {},
      sizes: {
        "2xl": {
          height: 16,
          width: 16,
        },
      },
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
theme.styles.global = (
  props: Record<string, unknown> | StyleFunctionProps
) => ({
  "html, body": {
    backgroundColor: mode("brandDarkPurple", "brandDarkPurple")(props),
    color: mode("canvas", "canvas")(props),
  },
  a: {
    color: "primary",
    _hover: {
      textDecoration: "none",
    },
  },
  main: {
    textAlign: "center",
  },
  nav: {
    backgroundColor: mode("canvasDark", "canvasDark")(props),
  },
});

export default theme;
