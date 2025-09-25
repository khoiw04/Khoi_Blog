import type { TagItem } from "@/types"
import {
  LucideLayers3,
  LucidePyramid,
  LucideShrimp,
} from "lucide-react"

const devtagsObj = [
  {
    icon: LucideLayers3,
    nameVi: "Tanstack",
    nameEn: "Tanstack",
  },
  {
    icon: LucideShrimp,
    nameVi: "Rust",
    nameEn: "Rust",
  },
  {
    icon: LucidePyramid,
    nameVi: "Tauri",
    nameEn: "Tauri",
  },
] as const satisfies readonly TagItem[]

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
] as const satisfies readonly TagItem[]

const alltagsEnum = [
  ...devtagsObj.map(data => data.nameEn),
  ...devtagsObj.map(data => data.nameVi),
  ...sciencetagsObj.map(data => data.nameEn),
  ...sciencetagsObj.map(data => data.nameVi),
]

export { devtagsObj, sciencetagsObj, alltagsEnum }