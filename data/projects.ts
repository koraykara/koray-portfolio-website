// Projects, ordered by technical depth and how much of the work is my own.
// Only verified links are listed; a missing `github` / `live` / `paper` hides that button.

export type ProjectKind = "Research" | "Client project" | "Personal project" | "Course project" | "Team project"

export type Project = {
  id: string
  title: string
  kind: ProjectKind
  year?: string
  summary: string // one or two sentences for cards
  description: string // longer text for featured cards
  contribution?: string // what I did, when it was a team effort
  tech: string[]
  categories: string[]
  image?: string
  github?: string
  live?: string
  paper?: { label: string; href: string }
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "ra-sosr",
    title: "Region-Aware Segmentation-Oriented Super-Resolution (RA-SOSR)",
    kind: "Research",
    year: "2023 – 2026",
    summary:
      "M.Sc. thesis research on super-resolution-assisted segmentation for medical MRI and CT images.",
    description:
      "Investigates super-resolution-assisted segmentation methods for medical MRI and CT images. Rather than treating super-resolution as a pure image-quality step, the work studies how region-aware super-resolution, which focuses on foreground and boundary regions, relates to downstream segmentation accuracy.",
    contribution: "M.Sc. thesis at Hacettepe University, advised by Assoc. Prof. Aydın Kaya.",
    tech: ["Python", "PyTorch", "Deep Learning", "Medical Image Segmentation", "Computer Vision"],
    categories: ["Research", "Machine Learning"],
    featured: true,
  },
  {
    id: "tarif",
    title: "TARİF: Multimodal Matching and Enrichment of DIY Videos",
    kind: "Research",
    year: "2020 – 2021",
    summary:
      "TÜBİTAK 1001 research project (118E283) on aligning recipe steps with the video segments where they happen.",
    description:
      "Undergraduate research fellow on a TÜBİTAK 1001 project that matches and enriches do-it-yourself videos with a multimodal approach. Focused on recipe videos: aligning each instruction with the part of the video where it happens, using content-based text analysis, visual–textual matching and visual concept learning.",
    tech: ["Python", "Multimodal Learning", "Computer Vision", "NLP"],
    categories: ["Research", "Machine Learning"],
    image: "/recipe.jpeg",
    paper: {
      label: "Publication",
      href: "https://search.trdizin.gov.tr/tr/yayin/detay/1222272/tarif-kendin-yap-videolarinin-eslestirilmesi-ve-zenginlestirilmesi-icin-cok-kipli-yaklasim",
    },
    featured: true,
  },
  {
    id: "zeybek",
    title: "Zeybek Hukuk Danışmanlık Website",
    kind: "Client project",
    summary: "Production website for a legal consultancy, with an admin panel, service pages and contact forms.",
    description:
      "A professional, fully responsive website for a legal consultancy firm, featuring a dynamic admin panel, service listings and contact forms. The backend is built with Spring Boot and PostgreSQL; the frontend uses React and Tailwind CSS.",
    tech: ["React", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
    categories: ["Full Stack", "Web Development"],
    image: "/zeybek.jpeg",
    live: "https://zeybekhukukdanismanlik.com/",
    featured: true,
  },
  {
    id: "art-style",
    title: "Art Style Image Transformation",
    kind: "Team project",
    year: "2021",
    summary: "Neural style transfer that renders photos in the style of famous paintings.",
    description:
      "Implements neural style transfer with a pre-trained VGG19 network for feature extraction and loss computation, blending a content image with the style of artworks such as Van Gogh's and Picasso's.",
    contribution: "Hacettepe BBM406 (Machine Learning) team project.",
    tech: ["Python", "PyTorch", "VGG19", "Neural Style Transfer"],
    categories: ["Machine Learning"],
    image: "/art.jpg",
    github: "https://github.com/HUbbm409/bbm406-project-2021-artstyleimagetransformation",
  },
  {
    id: "covid-knn",
    title: "COVID-19 Detection from Chest X-Rays",
    kind: "Course project",
    year: "2021",
    summary:
      "Classifies COVID-19, normal and viral pneumonia X-rays with from-scratch KNN and weighted KNN on handcrafted features.",
    description:
      "Implements KNN and weighted KNN classifiers from scratch. Features combine raw pixels with Gabor and Canny edge filters; models are evaluated with train/test splits and 5-fold cross-validation.",
    tech: ["Python", "NumPy", "OpenCV", "scikit-learn"],
    categories: ["Machine Learning"],
    image: "/covid.jpg",
    github: "https://github.com/koraykara/Covid-19-Disease-Detection-from-images-using-KNN-algorithm",
  },
  {
    id: "portfolio",
    title: "koraykara.dev",
    kind: "Personal project",
    summary:
      "This site: a statically exported Next.js portfolio with dark mode, a daily-synced YouTube library and a photo gallery.",
    description:
      "Statically exported Next.js App Router site deployed on Netlify. A scheduled GitHub Action refreshes the YouTube catalogue every day; pages are server-rendered for SEO with structured data.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Actions"],
    categories: ["Web Development"],
    image: "/portfolio.jpeg",
    github: "https://github.com/koraykara/koray-portfolio-website",
    live: "https://koraykara.dev",
  },
  {
    id: "bookstore",
    title: "Online Bookstore",
    kind: "Course project",
    summary: "E-commerce app with a book catalogue, search, shopping cart, orders and an admin inventory view.",
    description:
      "Covers user registration and login, catalogue browsing with search and filters, a shopping cart and order placement, plus admin pages for inventory and orders.",
    tech: ["Java", "Spring Boot", "JavaScript", "HTML", "CSS"],
    categories: ["Full Stack", "Web Development"],
    image: "/online-book-store.jpeg",
    github: "https://github.com/koraykara/Online-BookStore",
  },
  {
    id: "gym",
    title: "Gym Management System",
    kind: "Team project",
    summary: "Database-driven web app for gym memberships, trainers and lessons, built for a DBMS course.",
    description:
      "Role-based dashboards for members and trainers, lesson and trainer filtering, and PDF export, on top of a relational schema with views and seed data.",
    contribution: "Hacettepe database systems course team project. My repository holds the schema, SQL scripts, reports and phase deliverables.",
    tech: ["PHP", "SQL", "JavaScript", "CSS"],
    categories: ["Full Stack"],
    image: "/gym.jpeg",
    github: "https://github.com/koraykara/GymManagementSystem",
  },
]
