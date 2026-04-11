import type { TagItem } from "@/types";
import {
  LucideApple,
  LucideBone,
  LucideBrain,
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

const sciencetagsObj: TagItem[] = [
  {
    icon: LucideApple,
    nameVi: "Dinh Dưỡng",
    nameEn: "Nurtition",
  },
  {
    icon: LucideBrain,
    nameVi: "Tâm Thần",
    nameEn: "Mental Health",
  },
  {
    icon: LucideBone,
    nameVi: "Cơ Học",
    nameEn: "Physical Health",
  },
  {
    icon: LucideLayers3,
    nameVi: "Tại Sao",
    nameEn: "Why?",
    hide: true,
  },
  {
    icon: LucideShrimp,
    nameVi: "Tò Mò",
    nameEn: "Curious",
    hide: true,
  },
  {
    icon: LucidePyramid,
    nameVi: "Nguồn Gốc",
    nameEn: "Source",
    hide: true,
  },
];

const personalTagsObj: TagItem[] = [
  {
    icon: LucideHeart,
    nameVi: "Tâm Sự",
    nameEn: "Share",
  },
];

const alltagsEnum = [
  ...devtagsObj.map((data) => data.nameEn),
  ...devtagsObj.map((data) => data.nameVi),
  ...sciencetagsObj.map((data) => data.nameEn),
  ...sciencetagsObj.map((data) => data.nameVi),
  ...personalTagsObj.map((data) => data.nameEn),
  ...personalTagsObj.map((data) => data.nameVi),
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

export { devtagsObj, sciencetagsObj, personalTagsObj, alltagsEnum };
