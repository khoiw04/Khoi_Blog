import { LucideLayers3, LucidePyramid, LucideShrimp } from "lucide-react"

export const tagsEnum = ["Tanstack", "Rust", "Tauri"] as const
export const tagsObj = [
    {
        icon: LucideLayers3,
        name: "Tanstack"
    },
    {
        icon: LucideShrimp,
        name: "Rust"
    },
    {
        icon: LucidePyramid,
        name: "Tauri"
    },
]