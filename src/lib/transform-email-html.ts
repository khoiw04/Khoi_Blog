export default function transformEmailHtml(html: string, site: string) {
  if (typeof html !== "string" || !site) return html;

  const base = site.replace(/\/$/, "");

  // -------------------------
  // helper clean vite path
  // -------------------------
  const normalize = (url: string) => {
    if (!url) return url;

    // remove query
    url = url.split("?")[0];

    // handle vite @fs path
    const fsMatch = url.match(/\/@fs\/.*\/assets\/(.+)/);
    if (fsMatch) {
      return `/assets/${fsMatch[1]}`;
    }

    return url;
  };

  // -------------------------
  // helper absolutify
  // -------------------------
  const absolutify = (url: string) => {
    if (!url) return url;

    url = normalize(url);

    // keep safe schemes
    if (/^(https?:\/\/|data:|cid:|mailto:)/i.test(url)) return url;

    return `${base}/${url.replace(/^\//, "")}`;
  };

  // -------------------------
  // 1️⃣ video -> thumbnail link
  // -------------------------
  html = html.replace(
    /<video[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<\/video>/gi,
    (_, src) => {
      const abs = absolutify(src);

      // guess thumb name
      const thumb = abs.replace(/\.\w+$/, "-thumb.jpg");

      return `<a href="${abs}" target="_blank">
        <img src="${thumb}"
             alt="Watch video"
             style="display:block;max-width:100%;height:auto;border:0;">
      </a>`;
    },
  );

  // -------------------------
  // 2️⃣ src
  // -------------------------
  html = html.replace(
    /src=(["'])([^"']+)\1/gi,
    (_, q, url) => `src="${absolutify(url)}"`,
  );

  // -------------------------
  // 3️⃣ href
  // -------------------------
  html = html.replace(
    /href=(["'])([^"']+)\1/gi,
    (_, q, url) => `href="${absolutify(url)}"`,
  );

  return html;
}
