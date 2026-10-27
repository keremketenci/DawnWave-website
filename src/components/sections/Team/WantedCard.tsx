// translations
import { getTranslations } from "next-intl/server";

// data
import { wantedImage, wantedRoles } from "@/data/team";

// components
import { reveal } from "@/components/effects/reveal";
import { TeamMemberCard } from "@/components/sections/Team/TeamMemberCard";

// components ui
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";

export async function WantedCard() {
  const t = await getTranslations("Team");

  return (
    <>
      {wantedRoles.map((wanted, index) => (
        <div key={wanted.role} {...reveal(index * 120)}>
          <TeamMemberCard
            title={t("wanted")}
            description={t(wanted.role)}
            contentImage={wantedImage}
            footerText={
              <div>
                <ButtonSocials
                  href={wanted.href}
                  label="LinkedIn"
                  icon="linkedin2"
                  iconClass="w-8"
                  isActive={false}
                />
              </div>
            }
          />
        </div>
      ))}
    </>
  );
}
