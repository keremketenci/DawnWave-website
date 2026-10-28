// next
import Image from "next/image";

// data
import type { TeamMember } from "@/data/team";

// components ui
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { UserRound } from "lucide-react";

const platformNames: Partial<Record<string, string>> = {
  faceit: "FACEIT",
  steam: "Steam",
};

interface TeamMemberCardProps {
  member: TeamMember;
  /** Translated role(s), e.g. "IGL / AWPer". */
  role: string;
}

/** Photo, then nick / name / role (empty lines are skipped), then social links. */
export function TeamMemberCard({ member, role }: TeamMemberCardProps) {
  return (
    <Card className="bg-black text-white border border-slate-800 w-full h-full flex flex-col">
      <CardContent className="grow">
        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-slate-900">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.nick}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <UserRound
              aria-hidden="true"
              className="absolute inset-0 m-auto h-1/2 w-1/2 text-slate-700"
            />
          )}
        </div>
      </CardContent>
      <CardHeader className="text-center flex flex-col grow-0 px-2">
        {member.nick && (
          <CardTitle className="text-xl 2xl:text-2xl break-words">{member.nick}</CardTitle>
        )}
        {member.name && <CardDescription className="text-slate-300">{member.name}</CardDescription>}
        {role && <CardDescription className="text-accent font-medium">{role}</CardDescription>}
      </CardHeader>
      <CardFooter className="flex justify-center text-center pb-3">
        <div>
          {member.links.map((link) => (
            <ButtonSocials
              key={link.icon}
              href={link.href}
              label={`${member.nick} – ${platformNames[link.icon] ?? link.icon}`}
              icon={link.icon}
              iconClass="w-8"
              isActive={false}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
