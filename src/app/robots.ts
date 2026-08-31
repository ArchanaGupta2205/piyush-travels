import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.piyush-travels.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/vehicles", "/services", "/about", "/login", "/register", "/llms.txt", "/llms-full.txt"],
        disallow: ["/admin", "/admin/*", "/dashboard", "/dashboard/*", "/checkout", "/checkout/*", "/api/*"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "OAI-SearchBot",
          "cohere-ai",
          "anthropic-ai",
          "Bytespider",
        ],
        allow: ["/", "/vehicles", "/services", "/about", "/llms.txt", "/llms-full.txt"],
        disallow: ["/admin/*", "/dashboard/*", "/checkout/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
