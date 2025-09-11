import { LucideBlend, LucideBriefcaseBusiness, LucideMessageCircle,  } from "lucide-react"

export const typeMissionContactVi = ['Nhắn Tin', 'Phối Hợp', 'Việc Làm'] as const
export const checkBoxMissionContactVi = [
    {
        name: 'Nhắn Tin',
        icon: LucideMessageCircle
    },
    {
        name: 'Phối Hợp',
        icon: LucideBlend
    },
    {
        name: 'Việc Làm',
        icon: LucideBriefcaseBusiness
    }
] as const

export const typeMissionContactEn = ['Message', 'Cooperation', 'Occupation'] as const
export const checkBoxMissionContactEn = [
    {
        name: 'Message',
        icon: LucideMessageCircle
    },
    {
        name: 'Cooperation',
        icon: LucideBlend
    },
    {
        name: 'Occupation',
        icon: LucideBriefcaseBusiness
    }
] as const