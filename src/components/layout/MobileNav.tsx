"use client";

// translations
import { useTranslations } from "next-intl";

// react
import { useEffect, useRef, useState } from "react";

// components
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import type { GameServerItem } from "@/components/layout/GameServersMenu";

// components ui
import { ButtonNav } from "@/components/ui/button/ButtonNav";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { Separator } from "@/components/ui/shadcn/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

// hooks & utils
import { copyToClipboard } from "@/lib/copy-to-clipboard";

interface MobileNavProps {
  className?: string;
  links: { href: string; label: string }[];
  serversLabel: string;
  servers: GameServerItem[];
  menuLabel: string;
}

export function MobileNav({ className, links, serversLabel, servers, menuLabel }: MobileNavProps) {
  const t = useTranslations("Toast.GameServers.ServerIp");

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsOpen(false);
    setIsSubmenuOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsSubmenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className={`${className} flex flex-col md:hidden justify-between`} ref={navbarRef}>
      <div className="flex justify-between">
        <div className="p-1">
          <ButtonNav
            onClick={() => setIsOpen((prev) => !prev)}
            checked={isOpen}
            label={menuLabel}
          />
        </div>
        <LanguageSwitcher />
      </div>

      {isOpen && (
        <div>
          <Separator className="my-4" />
          <ScrollArea className="flex w-full h-[150px] rounded-md">
            <div className="px-1 text-start space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="block cursor-pointer text-xl hover:text-accent"
                >
                  {link.label}
                </a>
              ))}

              <div>
                <button
                  type="button"
                  aria-expanded={isSubmenuOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSubmenuOpen((prev) => !prev);
                  }}
                  className="flex w-full items-center justify-between cursor-pointer text-xl hover:text-accent"
                >
                  <span>{serversLabel}</span>
                  {isSubmenuOpen ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {isSubmenuOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {servers.map((server) => (
                      <button
                        type="button"
                        key={server.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(server.address, {
                            success: t("success"),
                            failed: t("failed"),
                          });
                        }}
                        className="block w-full text-left cursor-pointer text-lg hover:text-accent"
                      >
                        {server.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </nav>
  );
}
