# RULES.md

> Bộ rules ngắn, rõ ràng cho AI khi làm việc với **Astro**, **React**, **TailwindCSS**, **shadcn/ui** và **blog**.

---

## Mục đích

* Giúp AI trả lời nhanh, đúng, và dễ làm theo.
* Luôn kèm ví dụ chạy được và bước tiếp theo rõ ràng.

## Yêu cầu thông tin (luôn hỏi trước)

1. Phiên bản (Astro, React, Tailwind, shadcn/ui).
2. Mục tiêu: static site / SSR / hybrid.
3. Môi trường: dev hay prod.
4. Repo hoặc code mẫu (nếu có).

## Phong cách trả lời

* Ngắn, rõ, dùng từ dễ hiểu.
* Luôn kèm **ví dụ code** nhỏ, copy-paste được.
* Nêu trade-offs (performance vs dev speed vs accessibility).
* Nếu cần thay đổi lớn, cho **migration steps**.

## Quy tắc chung

* Không chèn secrets vào code. Dùng env vars.
* Tránh `dangerous` patterns (eval, innerHTML không kiểm soát).
* Luôn kiểm tra accessibility (a11y) cho component UI.
* Nói rõ lệnh dev/build/test cần chạy.

## Astro

* Dùng structure rõ ràng: `src/pages`, `src/layouts`, `src/components`.
* Nếu site tĩnh thì dùng `export const prerender = true` nơi cần.
* Nêu cách build & deploy (Netlify, Vercel, GitHub Pages).
* Khi thay đổi route hoặc slug, kèm **migration steps**.

## React

* Dùng Function Components và Hooks.
* Prefer: `useEffect`, `useState`, `useMemo` khi cần.
* Tránh class components trừ khi legacy.

## TailwindCSS

* Dùng utility classes; nếu lặp, dùng `@apply` trong CSS/Tailwind.
* Thêm class vào `tailwind.config.js` nếu cần theme riêng.
* Không override nhiều bằng CSS thuần nếu Tailwind có thể giải quyết.

## shadcn/ui

* Dùng component sẵn; override bằng `className` + Tailwind.
* Giữ focus states và aria attrs để đảm bảo a11y.

## Blog rules

* Mỗi bài bắt buộc frontmatter:

  ```md
  ---
  title: "Tiêu đề"
  date: "2026-02-19"
  tags: ["tag1", "tag2"]
  description: "Mô tả ngắn"
  ---
  ```
* Luồng file: `content/posts/{slug}/index.md` hoặc `content/posts/{slug}.md`.
* Bắt buộc: OG meta, canonical, RSS feed, sitemap.

## Hình ảnh & media

* Ưu webp hoặc AVIF, có fallback jpg/png.
* Resize trước khi up (<= 1600px cho hero).
* Lazy load ảnh không cần hiển thị đầu.

## SEO cơ bản

* meta title & description, og:title, og:description, og:image.
* structured data (JSON-LD) cho bài blog.

## Bảo mật

* Không commit `.env` hoặc keys.
* Dùng secret manager (Vercel/Netlify/GitHub Actions secrets).

## Scripts (ví dụ)

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "format": "prettier --write ."
}
```

## Lint & test

* ESLint + Prettier config sẵn.
* Thêm unit test (Vitest / Jest) cho logic quan trọng.

## Migration steps (mẫu)

1. Tạo branch mới `feature/migration-x`.
2. Cập nhật config (ghi rõ file và dòng cần đổi).
3. Chạy `npm run build` và `npm run lint`.
4. Chạy test, deploy staging, kiểm tra a11y + SEO.
5. Merge khi pass tất cả.

## PR checklist (bắt buộc)

* [ ] Có description ngắn.
* [ ] Có steps để chạy locally.
* [ ] Có unit test hoặc manual test steps.
* [ ] Không có secrets.
* [ ] Đã chạy `build` và `lint`.

## Minimal reproducible example

* Khi issue lớn: trả ví dụ nhỏ nhất có thể để dev test nhanh.

## Khi cần thay đổi lớn

* Ghi rõ: lý do, files affected, steps để rollback.

---

Kết: Luôn đưa hành động tiếp theo rõ ràng (1–2 bước). Nếu cần, mình tạo `RULES.md` trong repo và thêm CI check list.
