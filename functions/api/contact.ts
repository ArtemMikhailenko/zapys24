// Cloudflare Pages Function — проксі для форми зворотного зв'язку.
// Маршрут: /api/contact  (форма napysaty.astro постить сюди).
// Пересилає тіло запиту на бекенд, додаючи CORS-заголовки.
const TARGET_URL = "https://api.zapys24.com/api/v1/landing/contact";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const body = await request.text();

    const upstream = await fetch(TARGET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await upstream.text();

    return new Response(data, {
      status: upstream.status,
      headers: {
        ...CORS_HEADERS,
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Помилка сервера. Спробуйте пізніше.",
      }),
      {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  }
};
