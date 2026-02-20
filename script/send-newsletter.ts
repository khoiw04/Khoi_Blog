import fs from "fs";
import path from "path";
import juice from "juice";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendNewsletter(slug: string) {
  try {
    const htmlPath = path.join(
      process.cwd(),
      `dist/email-preview/${slug}/index.html`,
    );
    const rawHtml = fs.readFileSync(htmlPath, "utf-8");

    const inlinedHtml = juice(rawHtml);

    console.log(`Đang gửi newsletter cho bài viết: ${slug}...`);

    const { data, error } = await resend.emails.send({
      from: "Khôi <newsletter@blog.khoiwn04.com>",
      to: [],
      subject: `[Bài viết mới] Hãy xem qua bài viết mới trên blog!`,
      html: inlinedHtml,
    });

    if (error) {
      console.error("Lỗi từ Resend:", error);
      return;
    }

    console.log("Gửi newsletter thành công! ID:", data.id);
  } catch (err) {
    console.error("Đã xảy ra lỗi trong quá trình xử lý:", err);
  }
}

const slugToArg = process.argv[2];
if (!slugToArg) {
  console.error(
    "Vui lòng cung cấp slug. VD: node scripts/send-newsletter.js slug-bai-viet",
  );
  process.exit(1);
}

sendNewsletter(slugToArg);
