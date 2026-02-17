import type { TagItem } from "@/types";
import {
  LucideCircleDotDashed,
  LucideHeart,
  LucideLayers3,
  LucidePyramid,
  LucideShrimp,
} from "lucide-react";

const devtagsObj = [
  {
    icon: LucideCircleDotDashed,
    nameVi: ".dotfiles",
    nameEn: ".dotfiles",
  },
] as const satisfies readonly TagItem[];

const sciencetagsObj = [
  {
    icon: LucideLayers3,
    nameVi: "Tại Sao",
    nameEn: "Why?",
  },
  {
    icon: LucideShrimp,
    nameVi: "Tò Mò",
    nameEn: "Curious",
  },
  {
    icon: LucidePyramid,
    nameVi: "Nguồn Gốc",
    nameEn: "Source",
  },
  {
    icon: LucideHeart,
    nameVi: "Tâm Sự",
    nameEn: "Share",
  },
] as const satisfies readonly TagItem[];

const alltagsEnum = [
  ...devtagsObj.map((data) => data.nameEn),
  ...devtagsObj.map((data) => data.nameVi),
  ...sciencetagsObj.map((data) => data.nameEn),
  ...sciencetagsObj.map((data) => data.nameVi),
  // "Tanstack",
  // "Tauri",
  // "Rust",
  // "Why?",
  // "Curious",
  // "Source",
  // "Nguồn Gốc",
  // "Tò Mò",
  // "Tại Sao"
] as const;

export { devtagsObj, sciencetagsObj, alltagsEnum };
