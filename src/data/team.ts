import type { IconName } from "@/components/ui/Icon";
import { linkedInCompanyUrl } from "@/data/socials";

/** Keys of the `Team` messages namespace used to build role descriptions. */
export type TeamRoleKey =
  | "Roles.co-founder"
  | "Job.Title.3d artist"
  | "Job.Title.2d artist"
  | "Job.Title.developer"
  | "Job.Title.game developer"
  | "Job.Title.game designer"
  | "Job.software"
  | "Job.web";

export interface TeamMember {
  name: string;
  image: string;
  /** Segments are joined with " & ", keys inside a segment with a space. */
  role: TeamRoleKey[][];
  links: { icon: IconName; href: string }[];
  email?: string;
}

export const coFounders: TeamMember[] = [
  {
    name: "Emirhan YAMAN",
    image: "/images/team/pp_emirhan.png",
    role: [["Roles.co-founder"], ["Job.Title.game developer"]],
    links: [
      { icon: "instagram2", href: "https://www.instagram.com/emir.yaman57/" },
      { icon: "linkedin2", href: "https://www.linkedin.com/in/emirymn/" },
      { icon: "github2", href: "https://github.com/emirymn" },
    ],
    email: "emirhanyaman@dawnwave.com.tr",
  },
  {
    name: "Mert Can DOĞAN",
    image: "/images/team/pp_mert.png",
    role: [["Roles.co-founder"], ["Job.Title.game developer"]],
    links: [
      { icon: "instagram2", href: "https://www.instagram.com/ecostavakya/" },
      { icon: "linkedin2", href: "https://www.linkedin.com/in/ecostavakya/" },
      { icon: "github2", href: "https://github.com/Ecostavakya" },
    ],
    email: "mertcandogan@dawnwave.com.tr",
  },
  {
    name: "Mustafa Yusuf AKSU",
    image: "/images/team/pp_mustafa.png",
    role: [["Roles.co-founder"], ["Job.Title.game developer"]],
    links: [
      { icon: "instagram2", href: "https://www.instagram.com/mustafayusufaksu/" },
      { icon: "linkedin2", href: "https://www.linkedin.com/in/mustafa-yusuf-aksu/" },
      { icon: "github2", href: "https://github.com/ALTENALT" },
    ],
    email: "myusufaksu@dawnwave.com.tr",
  },
];

// Currently not shown on the site (see the commented-out block in Team.tsx).
export const employees: TeamMember[] = [
  {
    name: "Enes ÇAĞATAY",
    image: "/images/team/pp_enes.png",
    role: [["Job.Title.3d artist"]],
    links: [
      { icon: "instagram2", href: "https://www.instagram.com/nott.ns/" },
      { icon: "linkedin2", href: "https://www.linkedin.com/in/enes-%C3%A7a%C4%9Fatay/" },
      { icon: "artstation", href: "https://www.artstation.com/enescagatay" },
    ],
    email: "enescagatay2@gmail.com",
  },
  {
    name: "Fatma Nur ŞEN",
    image: "/images/team/pp_nur.png",
    role: [["Job.Title.2d artist"]],
    links: [
      { icon: "instagram2", href: "https://www.instagram.com/4iko.miru/" },
      { icon: "linkedin2", href: "https://www.linkedin.com/in/fatma-nur-%C5%9Fen-22729a224/" },
      { icon: "artstation", href: "https://www.artstation.com/reicchi" },
    ],
    email: "fatma.nursenn@outlook.com",
  },
  {
    name: "Kerem KETENCİ",
    image: "/images/team/pp_kerem.jpg",
    role: [["Job.software"], ["Job.web", "Job.Title.developer"]],
    links: [
      { icon: "instagram2", href: "https://www.instagram.com/realkeremketenci/" },
      { icon: "linkedin2", href: "https://www.linkedin.com/in/kerem-ketenci/" },
      { icon: "github2", href: "https://github.com/keremketenci" },
    ],
    email: "keremketenci.dev@protonmail.com",
  },
];

export const wantedRoles: { role: TeamRoleKey; href: string }[] = [
  { role: "Job.Title.game designer", href: linkedInCompanyUrl },
  { role: "Job.Title.3d artist", href: linkedInCompanyUrl },
];

export const wantedImage = "/images/dawnwave/logo.png";
