// translations
import { getTranslations } from "next-intl/server";

// data
import { gameServers, navSections } from "@/data/navigation";

// components
import { GameServersMenu } from "@/components/layout/GameServersMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";

// components ui
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/shadcn/navigation-menu";

interface NavbarProps {
  className?: string;
}

const linkClass = `hover:text-white hover:bg-transparent hover:text-accent text-xl ${navigationMenuTriggerStyle()}`;

export async function Navbar({ className }: NavbarProps) {
  const t = await getTranslations("Navbar");

  const links = navSections.map((section) => ({
    href: `#${section.id}`,
    label: t(`Link.${section.key}`),
  }));
  const servers = gameServers.map((server) => ({
    id: server.id,
    label: t(`Link.${server.key}`),
    address: server.address,
  }));

  return (
    <>
      <nav className={`${className} hidden md:block`}>
        <div className="flex justify-between">
          <NavigationMenu>
            <NavigationMenuList className="space-x-8">
              {links.map((link) => (
                <NavigationMenuItem className="cursor-pointer" key={link.href}>
                  <NavigationMenuLink href={link.href} className={linkClass}>
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuLink asChild className={linkClass}>
                  <div>
                    <GameServersMenu label={t("Link.gameServers")} servers={servers} />
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList className="cursor-pointer">
              <NavigationMenuItem>
                <LanguageSwitcher />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      <MobileNav
        className={className}
        links={links}
        serversLabel={t("Link.gameServers")}
        servers={servers}
        menuLabel={t("menu")}
      />
    </>
  );
}
