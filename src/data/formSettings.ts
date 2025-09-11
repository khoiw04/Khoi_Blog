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