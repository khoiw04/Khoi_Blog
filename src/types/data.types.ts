import type { LucideIcon } from "lucide-react";

export interface TagItem {
  icon: LucideIcon;
  nameVi: string;
  nameEn: string;
  hide?: boolean;
}

export type TOCHeading = {
  slug: string;
  text: string;
  depth: number;
  isSubpostTitle?: boolean;
};

export type TOCSection = {
  type: "parent" | "subpost";
  title: string;
  headings: TOCHeading[];
  subpostId?: string;
};
