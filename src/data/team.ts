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
  /** Profile photo. A placeholder silhouette is shown when it is missing. */
  image?: string;
  links: { icon: IconName; href: string }[];
}

// TODO: replace the placeholder nicks, roles and the FACEIT / Steam profile links.

/** Players, left to right. Five per row on desktop. */
export const players: TeamMember[] = [
  {
    id: "emirhan",
    name: "Emirhan YAMAN",
    nick: "nacho",
    roles: ["entry", "igl"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/" },
      { icon: "steam", href: "https://steamcommunity.com/" },
    ],
  },
  {
    id: "mertcan",
    name: "Mert Can DOĞAN",
    nick: "eco",
    roles: ["entry"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/" },
      { icon: "steam", href: "https://steamcommunity.com/" },
    ],
  },
  {
    id: "kerimcan",
    name: "Kerimcan KÖTAN",
    nick: "fallen",
    roles: ["rifler", "lurker"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/" },
      { icon: "steam", href: "https://steamcommunity.com/" },
    ],
  },
  {
    id: "sina",
    name: "Sina Kop",
    nick: "nebuchOVL",
    roles: ["support"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/" },
      { icon: "steam", href: "https://steamcommunity.com/" },
    ],
  },
  {
    id: "kerem",
    name: "Kerem KETENCİ",
    nick: "kerm3",
    roles: ["anchor"],
    links: [
      { icon: "faceit", href: "https://www.faceit.com/" },
      { icon: "steam", href: "https://steamcommunity.com/" },
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
