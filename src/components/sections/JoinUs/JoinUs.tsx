// translations
import { getTranslations } from "next-intl/server";

// data
import { jobs } from "@/data/jobs";

// components
import { reveal } from "@/components/effects/reveal";
import { JoinUsCard, type Job } from "@/components/sections/JoinUs/JoinUsCard";
import { JoinUsCarousel } from "@/components/sections/JoinUs/JoinUsCarousel";

// components ui
import { ButtonSlideX } from "@/components/ui/button/ButtonSlideX";
import { Icon } from "@/components/ui/Icon";

export async function JoinUs() {
  const t = await getTranslations("JoinUs");

  const items: Job[] = jobs.map((job) => ({
    id: job.titleKey,
    title: t(job.titleKey),
    description: (
      <div className="flex items-center">
        <Icon name="clock" className="w-6 mr-1" />
        <span>{t(job.timeKey)}</span>
      </div>
    ),
    content: `${t("Job.content")}.`,
    footer: <ButtonSlideX href={job.applyUrl} text={t("Button.apply")} />,
  }));

  return (
    <div>
      <h2 {...reveal()} className="text-4xl font-bold text-center p-4 text-accent">
        {t("title")}
      </h2>

      <div className="block xl:hidden" {...reveal(150)}>
        <JoinUsCarousel jobs={items} />
      </div>

      <div className="hidden xl:block">
        <div className="flex gap-8" {...reveal(150)}>
          <JoinUsCard jobs={items} />
        </div>
      </div>
    </div>
  );
}
