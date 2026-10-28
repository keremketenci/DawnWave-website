import type { IconName } from "@/components/ui/Icon";

/** CS2 roles: keys of the `Team.Roles` messages namespace. */
export type PlayerRoleKey =
  "igl" | "entry" | "awper" | "rifler" | "lurker" | "support" | "anchor" | "standin" | "coach";

/**
 * A team member card shows, top to bottom: photo, nick, name, role(s), social links.
 * `name` (real name) is shown under the nick; comment it out to hide it.
 * Several roles are joined with " / " (e.g. IGL / AWPer).
 */
export interface TeamMember {
  /** Stable key for React lists. */
  id: string;
  /** Real name, shown under the nick. Comment it out to hide it. */
  name?: string;
  /** In-game nickname. */
  nick: string;
  roles: PlayerRoleKey[];
  /** Profile photo. Falls back to `defaultAvatar` when missing. */
  image?: string;
  links: { icon: IconName; href: string }[];
}

/** Shown on every card that has no `image` of its own. */
export const defaultAvatar = "/images/team/default-avatar.jpg";

/** Players, left to right. Five per row on desktop. */
export const players: TeamMember[] = [
  {
    id: "emirhan",
    // name: "Emirhan YAMAN",
    nick: "nacho",
    roles: ["entry", "igl"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/en/players/nach0-" },
      { icon: "steam", href: "https://steamcommunity.com/id/inachokado" },
    ],
  },
  {
    id: "mertcan",
    // name: "Mert Can DOĞAN",
    nick: "eco",
    roles: ["entry"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/en/players/Eco_" },
      { icon: "steam", href: "https://steamcommunity.com/id/profvicblamer" },
    ],
  },
  {
    id: "kerimcan",
    // name: "Kerimcan KÖTAN",
    nick: "fallen",
    roles: ["rifler", "lurker"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/en/players/fallenreal" },
      { icon: "steam", href: "https://steamcommunity.com/id/fallennv2" },
    ],
  },
  {
    id: "sina",
    // name: "Sina Kop",
    nick: "nebuchOVL",
    roles: ["support"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/en/players/Ovl-DW" },
      { icon: "steam", href: "https://steamcommunity.com/id/NebuchOwl" },
    ],
  },
  {
    id: "kerem",
    // name: "Kerem KETENCİ",
    nick: "kerm3",
    roles: ["anchor"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/en/players/DW-Kerem" },
      { icon: "steam", href: "https://steamcommunity.com/id/keremketenci/" },
    ],
  },
];

/** Coach(es), shown in a separate row below the players. Hidden while empty. */
export const coaches: TeamMember[] = [
  // {
  //   id: "coach",
  //   // name: "",
  //   nick: "nick",
  //   roles: ["coach"],
  //   image: "/images/team/pp_coach.png",
  //   links: [
  //     { icon: "faceit", href: "https://www.faceit.com/" },
  //     { icon: "steam", href: "https://steamcommunity.com/" },
  //   ],
  // },
];
