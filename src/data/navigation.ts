// Page sections reachable from the navbar and footer. `id` is the section's anchor.
export const navSections = [
  { id: "Home", key: "home" },
  { id: "Team", key: "team" },
  { id: "JoinUs", key: "joinUs" },
  { id: "Contact", key: "contact" },
] as const;

export const gameServers = [
  { id: "CS2Server", key: "cs2server", address: "connect 95.173.175.61" },
] as const;
