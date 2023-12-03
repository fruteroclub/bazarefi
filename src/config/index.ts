const availableNetworks = [
  "celo",
  "celoAlfajores",
  "polygon",
  "scroll",
] as const;
type AvailableNetworks = (typeof availableNetworks)[number];

// RPC
type RPCs = Record<
  AvailableNetworks,
  {
    url: string;
  }
>;
const rpcs: RPCs = {
  celo: {
    url: process.env.NEXT_PUBLIC_POLYGON_URL!,
  },
  celoAlfajores: {
    url: process.env.NEXT_PUBLIC_POLYGON_URL!,
  },
  polygon: {
    url: process.env.NEXT_PUBLIC_POLYGON_URL!,
  },
  scroll: {
    url: process.env.NEXT_PUBLIC_SCROLL_URL!,
  },
};

// Addresses
type Addresses = Record<
  AvailableNetworks,
  {
    placeholderContract: `0x${string}`;
  }
>;
const addresses: Addresses = {
  celo: {
    placeholderContract: "0x0000000000000000000000000000000000000000",
  },
  celoAlfajores: {
    placeholderContract: "0x0000000000000000000000000000000000000000",
  },
  polygon: {
    placeholderContract: "0x0000000000000000000000000000000000000000",
  },
  scroll: {
    placeholderContract: "0x0000000000000000000000000000000000000000",
  },
};

// Block explorers
type BlockExplorers = Record<
  AvailableNetworks,
  {
    explorer: string;
  }
>;
const blockExplorers: BlockExplorers = {
  celo: {
    explorer: "https://polygonscan.com",
  },
  celoAlfajores: {
    explorer: "https://polygonscan.com",
  },
  polygon: { explorer: "https://polygonscan.com" },
  scroll: { explorer: "https://scrollscan.com" },
};

const config = {
  rpcs,
  addresses,
  blockExplorers,
} as const;

export default config;
