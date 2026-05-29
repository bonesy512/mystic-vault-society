import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://mysticvaultsociety.com";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/shop/success"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
