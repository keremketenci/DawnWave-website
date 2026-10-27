// translations
import { getTranslations } from "next-intl/server";

// data
import { coFounders } from "@/data/team";

// components
import { reveal } from "@/components/effects/reveal";
import { formatRole } from "@/components/sections/Team/formatRole";
import { TeamMemberCard, TeamMemberLinks } from "@/components/sections/Team/TeamMemberCard";

export async function CoFounderCard() {
  const t = await getTranslations("Team");

  return (
    <>
      {coFounders.map((member, index) => (
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
