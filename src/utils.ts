import { getCollection } from "astro:content";
import { siteConfig } from "./consts";

export async function getSortedContents(content: "blog" | "projects" = "blog") {
  const allContents = await getCollection(content, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  const sortedContents = allContents.sort((a, b) => {
    return a.data.pubDate < b.data.pubDate ? -1 : 1;
  });
  return sortedContents;
}

export function generateImageUrl(path: string) {
  const url = new URL(
    path,
    typeof window !== "undefined"
      ? window.location.origin
      : import.meta.env.DEV
      ? "http://localhost:4321"
      : "https://kyogre.dev"
  );
  return url.href;
}
