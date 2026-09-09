import { MetadataRoute } from "next";
import { connectDB } from "@/lib/server/db";
import { Vehicle } from "@/lib/server/models/Vehicle";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.piyush-travels.com";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vehicles`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    await connectDB();
    const vehicles = await Vehicle.find({}, "_id updatedAt").lean();
    const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((v: any) => ({
      url: `${baseUrl}/vehicles/${v._id}`,
      lastModified: v.updatedAt || lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...staticRoutes, ...vehicleRoutes];
  } catch {
    return staticRoutes;
  }
}
