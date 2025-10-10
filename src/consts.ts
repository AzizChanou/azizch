import { generateImageUrl } from "./utils";

export const TODAY = new Date();

export const siteConfig = {
  site: "https://kyogre.dev",
  title: "Kyogre",
  icon: generateImageUrl("/img/ky.png"),
  image: generateImageUrl("/img/me.jpg"),
  description:
    "Portfolio of Aziz Chanou, a full-stack developer specializing in JavaScript and PHP. Discover my projects, my skills, and my vision of modern software development.",
  author: "Aziz Chanou",
  tags: ["JavaScript", "PHP", "React", "Next.js", "Astro", "TailwindCSS"],
  socialCardAvatarImage: "./src/content/avatar.jpg",
  pageSize: 6,
  navLinks: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Stack",
      url: "/stack",
    },
    {
      name: "Projects",
      url: "/projects",
    },
    {
      name: "Blog",
      url: "/blog",
    },
    {
      name: "Contacts",
      url: "/contacts",
    },
  ],
  socialLinks: {
    github: "https://github.com/AzizChanou",
    linkedin: "https://www.linkedin.com/in/aziz-chanou/",
    twitter: "https://twitter.com/azizchanou",
    instagram: "https://instagram.com/azizchanoux",
    rss: true,
  },
  giscus: {
    repo: "AzizChanou/azizch",
    repoId: "R_kgDOLBQXqg=",
    category: "Giscus",
    categoryId: "DIC_kwDOLBQXqs4CwSny",
    reactionsEnabled: true,
  },
};
