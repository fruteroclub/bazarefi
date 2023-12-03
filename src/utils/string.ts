export function shortenAddress(address?: string, start = 6, end = 4) {
  if (!address) return "0x0000...0000";
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}
