import type { TeamRoleKey } from "@/data/team";

/** Builds a role description such as "Co-Founder & Game Developer". */
export function formatRole(t: (key: TeamRoleKey) => string, role: TeamRoleKey[][]) {
  return role.map((segment) => segment.map((key) => t(key)).join(" ")).join(" & ");
}
