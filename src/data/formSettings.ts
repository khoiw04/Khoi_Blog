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

export const ContactScriptForm = 'https://script.google.com/macros/s/AKfycbxkIuVNfcXYIhLEWT2CJ2LLviZNnwaHSw50RKtYlkS055I_Zj6NB18Xn8Svt4xGV3a5IA/exec'
export const googleFormID = '1iyJaydW-2fKknab89oMDIylP6h1wepA3eQhGCpd21O0'
export const ContactGoogleForm = `https://docs.google.com/forms/u/0/d/e/${googleFormID}/formResponse`