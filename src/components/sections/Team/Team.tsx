// translations
import { getTranslations } from "next-intl/server";

// data
import { coaches, players, type TeamMember } from "@/data/team";

// components
import { reveal } from "@/components/effects/reveal";
import { TeamMemberCard } from "@/components/sections/Team/TeamMemberCard";

// One card per row on phones, then 2 / 3 / 5 per row. Width = (100% - gaps) / columns,
// so an incomplete last row stays centred.
const cardWidth =
  "w-full max-w-[320px] xs:max-w-none xs:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-4rem)/5)]";

async function TeamRow({ members }: { members: TeamMember[] }) {
  const t = await getTranslations("Team.Roles");

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {members.map((member, index) => (
        <div key={member.id} className={cardWidth} {...reveal((index % 5) * 100)}>
          <TeamMemberCard member={member} role={member.roles.map((role) => t(role)).join(" / ")} />
        </div>
      ))}
    </div>
  );
}

export async function Team() {
  const t = await getTranslations("Team");

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <h2 {...reveal()} className="text-4xl font-bold text-center p-4 text-accent">
        {t("title")}
      </h2>

      <TeamRow members={players} />

      {/* Coach row, shown once a coach is added in src/data/team.ts */}
      {coaches.length > 0 && (
        <div className="mt-8">
          <TeamRow members={coaches} />
        </div>
      )}
    </div>
  );
}
