import type { LucideIcon } from "lucide-react";

export interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
}
