// next
import Image from "next/image";

// data
import type { TeamMember } from "@/data/team";

// components ui
import { ButtonCopy } from "@/components/ui/button/ButtonCopy";
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

interface TeamMemberCardProps {
  title: string;
  titleClass?: string;
  description?: string;
  contentImage: string;
  footerText?: React.ReactNode;
}

export function TeamMemberCard({
  title,
  titleClass,
  description,
  contentImage,
  footerText,
}: TeamMemberCardProps) {
  return (
    <Card className="bg-black text-white border border-slate-800 w-full 2xs:w-[300px] flex flex-col">
      <CardContent className="grow min-h-[300px]">
        <div className="relative w-full h-72">
          <Image
            src={contentImage}
            alt={title}
            fill
            sizes="300px"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </CardContent>
      <CardHeader className="text-center flex flex-col grow-0">
        <CardTitle className={titleClass}>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {footerText && (
        <CardFooter className="flex justify-center text-center">{footerText}</CardFooter>
      )}
    </Card>
  );
}

/** Social links plus a copy-email button for a team member card footer. */
export function TeamMemberLinks({ member }: { member: TeamMember }) {
  return (
    <div>
      {member.links.map((link) => (
        <ButtonSocials
          key={link.href}
          href={link.href}
          label={`${member.name} – ${link.icon.replace(/\d+$/, "")}`}
          icon={link.icon}
          iconClass="w-8"
          isActive={false}
        />
      ))}
      {member.email && (
        <ButtonCopy value={member.email} icon="mail2" iconClass="w-8" isActive={false} />
      )}
    </div>
  );
}
