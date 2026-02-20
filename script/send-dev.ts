import juice from "juice";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendNewsletterBeforeBuild(lang: string, slug: string) {
  try {
    let segmentId;
    let subjectPrefix; // Dùng prefix thay vì tạo subject ngay lập tức
    let fetchUrl;

    if (lang === "vi") {
      segmentId = process.env.NEWSLETTER_KHOI_BLOG_VI;
      subjectPrefix = `[khoiw04's Blog] Bài viết mới:`;
      fetchUrl = `http://localhost:4321/vi/mail/${slug}`;
    } else if (lang === "en") {
      segmentId = process.env.NEWSLETTER_KHOI_BLOG_EN;
      subjectPrefix = `[khoiw04's Blog] New post:`;
      fetchUrl = `http://localhost:4321/en/mail/${slug}`;
    } else {
      throw new Error("Ngôn ngữ không hợp lệ! Vui lòng dùng 'vi' hoặc 'en'.");
    }

    if (!segmentId) {
      throw new Error(`Không tìm thấy Audience ID cho ${lang} trong file .env`);
    }

    console.log(
      `Đang lấy danh sách người nhận (${lang.toUpperCase()}) từ Resend...`,
    );

    const { data: contactsData, error: contactsError } =
      await resend.contacts.list({
        segmentId,
      });

    if (contactsError)
      throw new Error(`Lỗi lấy contacts: ${contactsError.message}`);

    const subscribers = contactsData?.data || [];

    if (subscribers.length === 0) {
      console.log(
        `Không có ai trong danh sách ${lang.toUpperCase()}. Dừng chạy.`,
      );
      return;
    }

    console.log(
      `Tìm thấy ${subscribers.length} email. Đang lấy giao diện từ: ${fetchUrl}...`,
    );

    // Fetch HTML từ dev server
    const response = await fetch(fetchUrl);
    if (!response.ok)
      throw new Error(
        `Không tìm thấy trang. Đảm bảo 'npm run dev' đang chạy và URL đúng.`,
      );

    // Đổi thành let để có thể chỉnh sửa và thay thế nội dung
    let rawHtml = await response.text();

    // ==========================================
    // BƯỚC MỚI 1: TỰ ĐỘNG LẤY CSS EXTERNAL VÀ NHÉT VÀO THẺ <STYLE>
    // ==========================================
    const cssLinks = [
      ...rawHtml.matchAll(
        /<link[^>]*rel=["']stylesheet["'][^>]*href=["'](\/[^"']+\.css)["'][^>]*>/gi,
      ),
    ];

    for (const match of cssLinks) {
      const fullTag = match[0];
      const cssRelativeUrl = match[1];

      try {
        const cssResponse = await fetch(
          `http://localhost:4321${cssRelativeUrl}`,
        );
        if (cssResponse.ok) {
          const cssText = await cssResponse.text();
          rawHtml = rawHtml.replace(fullTag, `<style>\n${cssText}\n</style>`);
        }
      } catch (err) {
        console.warn(`⚠️ Không thể tải CSS: ${cssRelativeUrl}`);
      }
    }
    // ==========================================

    // ==========================================
    // BƯỚC MỚI 2: TÌM VÀ TRÍCH XUẤT THẺ H1
    // ==========================================
    const h1Match = rawHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    let postTitle = slug; // Fallback: nếu không có h1 thì dùng slug

    if (h1Match) {
      // h1Match[1] chứa nội dung bên trong <h1>...</h1>
      postTitle = h1Match[1].replace(/<[^>]+>/g, "").trim();
    }

    // Ghép prefix và title thành subject hoàn chỉnh
    const subject = `${subjectPrefix} ${postTitle}`;
    console.log(`📌 Tiêu đề email sẽ là: "${subject}"`);
    // ==========================================

    // ==========================================
    // BƯỚC MỚI 3: BƠM CSS "EMAIL-SAFE" VÀ ÉP MÀU EXPRESSIVE CODE
    // ==========================================
    const safeCodeCss = `
        <style>
          .expressive-code { margin: 20px 0 !important; }
          .expressive-code .frame, .expressive-code pre {
            background-color: #1e1e1e !important;
            border-radius: 6px !important;
            border: none !important;
            padding: 8px 0 !important; /* Lùi lề trên dưới cho đẹp */
          }
          /* Cài đặt font chữ chung */
          .expressive-code code {
            font-family: Consolas, Monaco, "Courier New", monospace !important;
            font-size: 13px !important;
            color: #d4d4d4 !important;
          }
          /* Ẩn thanh tab và nút copy vì vỡ layout trên email */
          .expressive-code .header, .expressive-code .copy { display: none !important; }

          /* ================================================== */
          /* FIX LỖI 2 HÀNG: ÉP SỐ DÒNG VÀ CODE NẰM TRÊN 1 HÀNG */
          /* ================================================== */
          .expressive-code .ec-line {
            display: table !important; /* Dùng table để chống rớt dòng 100% trên mọi email client */
            width: 100% !important;
          }
          .expressive-code .gutter,
          .expressive-code .code {
            display: table-cell !important;
            vertical-align: top !important; /* Căn lên mép trên cùng */
          }
          /* Định dạng cột số dòng (Gutter) */
          .expressive-code .gutter {
            width: 40px !important;
            min-width: 40px !important;
            text-align: right !important;
            padding-right: 12px !important;
            color: #858585 !important; /* Màu xám cho số dòng */
            border-right: 1px solid #404040 !important; /* Thanh dọc ngăn cách */
          }
          /* Định dạng cột chữ (Code) */
          .expressive-code .code {
            padding-left: 12px !important;
            white-space: pre-wrap !important; /* Giữ nguyên khoảng trắng thụt lề */
            word-break: break-all !important; /* Tránh tràn ngang nếu dòng code quá dài */
          }
        </style>
        `;

    // Gắn thêm đoạn CSS cứng này vào cuối phần <head>
    rawHtml = rawHtml.replace("</head>", `${safeCodeCss}</head>`);

    // Xử lý Dark/Light theme token thành màu cứng cho chữ (Dùng màu của theme Dark)
    rawHtml = rawHtml.replace(
      /--(?:0|shiki-dark):\s*([^;]+);\s*--(?:1|shiki-light):\s*([^;"]+);?/gi,
      "color: $2;",
    );
    // ==========================================

    // ==========================================
    // CẤU HÌNH JUICE ĐỂ GIỮ LẠI EXPRESSIVE CODE
    // ==========================================
    const baseInlinedHtml = juice(rawHtml, {
      removeStyleTags: false, // Giữ lại thẻ <style> thay vì xóa nó đi
      preserveMediaQueries: true, // Giữ lại responsive
      preserveImportant: true, // Giữ lại các thuộc tính !important của code block
    });
    // ==========================================

    // ==========================================
    // TÍNH NĂNG: LỌC UNSUBSCRIBE, PROMISE.ALL & BATCHING
    // ==========================================

    // 1. Lọc bỏ những người đã unsubscribe
    const activeSubscribers = subscribers.filter(
      (sub: any) => !sub.unsubscribed,
    );

    if (activeSubscribers.length === 0) {
      console.log(
        `Không có người nhận hợp lệ (tất cả đã unsubscribe). Dừng chạy.`,
      );
      return;
    }

    console.log(
      `🚀 Bắt đầu gửi email đồng loạt cho ${activeSubscribers.length} người...`,
    );

    // 2. Chia cụm (batching) - Gửi mỗi cụm 50 email để tránh bị Resend block vì Rate Limit
    const BATCH_SIZE = 50;

    for (let i = 0; i < activeSubscribers.length; i += BATCH_SIZE) {
      const batch = activeSubscribers.slice(i, i + BATCH_SIZE);
      console.log(
        `⏳ Đang xử lý batch ${i / BATCH_SIZE + 1} (gồm ${batch.length} email)...`,
      );

      // 3. Tạo mảng Promise cho batch hiện tại
      const sendPromises = batch.map(async (sub: any) => {
        const userEmail = sub.email;

        const personalizedHtml = baseInlinedHtml.replace(
          /{{USER_EMAIL}}/g,
          encodeURIComponent(userEmail),
        );

        try {
          await resend.emails.send({
            from: "Khôi <newsletter@blog.khoiwn04.com>",
            to: userEmail,
            subject: subject,
            html: personalizedHtml,
          });

          console.log(`✅ Đã gửi cho: ${userEmail}`);
        } catch (err: any) {
          // Bắt lỗi riêng từng email để không chết cả dàn
          console.error(`❌ Lỗi khi gửi cho ${userEmail}:`, err.message);
        }
      });

      // 4. Thực thi gửi toàn bộ batch CÙNG LÚC
      await Promise.all(sendPromises);

      // Nếu vẫn còn batch phía sau, nghỉ 1 giây để Resend API "thở"
      if (i + BATCH_SIZE < activeSubscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`🎉 Hoàn tất gửi Newsletter bản ${lang.toUpperCase()}!`);
  } catch (err: any) {
    console.error("❌ Lỗi hệ thống:", err.message);
  }
}

// Lấy arguments từ dòng lệnh (tham số thứ 2 và 3)
const langArg = process.argv[2];
const slugArg = process.argv[3];

if (!langArg || !slugArg) {
  console.error(
    "⚠️ Thiếu tham số! Cú pháp đúng: node scripts/send-dev.js <vi|en> <slug>",
  );
  process.exit(1);
}

sendNewsletterBeforeBuild(langArg, slugArg);
