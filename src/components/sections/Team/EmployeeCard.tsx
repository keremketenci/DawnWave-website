// translations
import { getTranslations } from "next-intl/server";

// data
import { employees } from "@/data/team";

// components
import { reveal } from "@/components/effects/reveal";
import { formatRole } from "@/components/sections/Team/formatRole";
import { TeamMemberCard, TeamMemberLinks } from "@/components/sections/Team/TeamMemberCard";

// Currently not rendered: see the commented-out block in Team.tsx.
export async function EmployeeCard() {
  const t = await getTranslations("Team");

  return (
    <>
      {employees.map((member, index) => (
        <div key={member.name} {...reveal(index * 120)}>
          <TeamMemberCard
            title={member.name}
            description={formatRole(t, member.role)}
            contentImage={member.image}
            footerText={<TeamMemberLinks member={member} />}
          />
        </div>
      ))}
    </>
  );
}
