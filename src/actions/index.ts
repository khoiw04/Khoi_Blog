import { typeMissionContactVi } from "@/data/formSettings";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  contactVi: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string({ message: 'Email không được để trống' })
        .email('Email không hợp lệ'),
      lastName: z
        .string()
        .optional(),
      firstName: z
        .string({ message: 'Tên không được để trống' }),
      type: z
        .enum(typeMissionContactVi, { message: 'Checkbox phải khớp với Giá Trị' }),
      message: z
        .string({ message: 'Tin nhắn không được để trống' })
        .min(10, 'Tin nhắn trên 10 từ')
    }),
    handler: async () => {
      return { message: 'Hoàn tất' };
    },
  }),
  contactEn: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string({ message: 'Email not empty' })
        .email('Email not vaild'),
      lastName: z
        .string()
        .optional(),
      firstName: z
        .string({ message: 'First Name not empty' }),
      type: z
        .enum(typeMissionContactVi, { message: 'Checkbox must be correct value' }),
      message: z
        .string({ message: 'Message not empty' })
        .min(10, 'Message must have more 10 length')
    }),
    handler: async () => {
      return { message: 'Hoàn tất' };
    },
  }),
};