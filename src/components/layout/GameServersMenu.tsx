"use client";

// translations
import { useTranslations } from "next-intl";

// components ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";

// hooks & utils
import { copyToClipboard } from "@/lib/copy-to-clipboard";

export interface GameServerItem {
  id: string;
  label: string;
  address: string;
}

interface GameServersMenuProps {
  label: string;
  servers: GameServerItem[];
}

/** Desktop dropdown that copies a game server's connect command. */
export function GameServersMenu({ label, servers }: GameServersMenuProps) {
  const t = useTranslations("Toast.GameServers.ServerIp");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{label}</DropdownMenuTrigger>
      <DropdownMenuContent className="dark bg-black border-slate-800 text-white">
        {servers.map((server) => (
          <DropdownMenuItem
            key={server.id}
            onClick={() =>
              copyToClipboard(server.address, { success: t("success"), failed: t("failed") })
            }
          >
            {server.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
