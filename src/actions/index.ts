import { typeMissionContactVi, typeMissionContactEn } from "@/data";
import {
  RESEND_API_KEY,
  NEWSLETTER_KHOI_BLOG_VI,
  NEWSLETTER_KHOI_BLOG_EN,
} from "astro:env/server";
import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeLxkB8RlhS5BqOOk3xWNoSlQrOBzH1i2Sb53SWtAcjEjwZ3A/formResponse";

const fieldMap = {
  country: "entry.1824417384",
  firstName: "entry.2092238618",
  lastName: "entry.479301265",
  email: "entry.1556369182",
  type: "entry.1753222212",
  message: "entry.588393791",
};

export const server = {
  subNewsletterVi: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string({ message: "Email không được để trống" })
        .email("Email không hợp lệ"),
    }),
    handler: async ({ email }) => {
      const { error } = await resend.contacts.create({
        email,
        segments: [
          { id: NEWSLETTER_KHOI_BLOG_EN },
          { id: NEWSLETTER_KHOI_BLOG_VI },
        ],
        unsubscribed: false,
      });

      return error?.message;
    },
  }),

  subNewsletterEn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string({ message: "Email is not empty" }).email("Email invaild"),
    }),
    handler: async ({ email }) => {
      const { error } = await resend.contacts.create({
        email,
        segments: [{ id: NEWSLETTER_KHOI_BLOG_EN }],
        unsubscribed: false,
      });

      return error?.message;
    },
  }),

  unsubNewsletter: defineAction({
    accept: "form",
    input: z.object({
      email: z.string({ message: "Email is not empty" }).email("Email invaild"),
    }),
    handler: async ({ email }) => {
      const { error } = await resend.contacts.update({
        email,
        unsubscribed: true,
      });

      return error?.message;
    },
  }),

  contactVi: defineAction({
    accept: "form",
    input: z.object({
      email: z
        .string({ message: "Email không được để trống" })
        .email("Email không hợp lệ"),
      lastName: z.string().optional(),
      firstName: z.string({ message: "Tên không được để trống" }),
      type: z.enum(typeMissionContactVi, {
        message: "Checkbox phải khớp với Giá Trị",
      }),
      message: z
        .string({ message: "Tin nhắn không được để trống" })
        .min(10, "Tin nhắn trên 10 từ"),
    }),
    handler: async ({ email, firstName, lastName, type, message }) => {
      try {
        const formData = new URLSearchParams({
          [fieldMap.country]: "Việt Nam",
          [fieldMap.firstName]: firstName,
          [fieldMap.lastName]: lastName ?? "",
          [fieldMap.email]: email,
          [fieldMap.type]: type,
          [fieldMap.message]: message,
        });

        const response = await fetch(GOOGLE_FORM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Google Form response:", text);
          throw new Error("Gửi không thành công: " + response.status);
        }

        return { message: "Đã gửi hoàn tất" };
      } catch (error) {
        console.error("Lỗi gửi form:", error);
        throw new Error("Không thể gửi dữ liệu, vui lòng thử lại sau.");
      }
    },
  }),

  contactEn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string({ message: "Email not empty" }).email("Email not valid"),
      lastName: z.string().optional(),
      firstName: z.string({ message: "First Name not empty" }),
      type: z.enum(typeMissionContactEn, {
        message: "Checkbox must be correct value",
      }),
      message: z
        .string({ message: "Message not empty" })
        .min(10, "Message must have more than 10 characters"),
    }),
    handler: async ({ email, firstName, lastName, type, message }) => {
      try {
        const formData = new URLSearchParams({
          [fieldMap.country]: "English",
          [fieldMap.firstName]: firstName,
          [fieldMap.lastName]: lastName ?? "",
          [fieldMap.email]: email,
          [fieldMap.type]: type,
          [fieldMap.message]: message,
        });

        const response = await fetch(GOOGLE_FORM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Google Form response:", text);
          throw new Error("Send not successfully: " + response.status);
        }

        return { message: "Send successfully" };
      } catch (error) {
        console.error("Form submission error:", error);
        throw new Error("Unable to submit the form. Please try again later.");
      }
    },
  }),
};
