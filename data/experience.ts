// Source: LinkedIn profile export. Dates are "YYYY-MM"; `end: null` means present.

export type Role = {
  id: string
  title: string
  company: string
  companyUrl?: string
  logo: string // square-friendly company emblem in /public/logos
  wideLogo?: boolean // wordmark logos get less padding so they stay readable
  type: "Full-time" | "Research" | "Internship"
  location: string
  start: string
  end: string | null
  summary?: string
  highlights: string[]
  skills: string[]
  link?: { label: string; href: string }
}

export type Degree = {
  id: string
  degree: string
  field: string
  school: string
  start: string
  end: string
  grade?: string
  details?: string[]
}

export const roles: Role[] = [
  {
    id: "turkish-aerospace",
    title: "Flight Control Software Engineer",
    company: "Turkish Aerospace",
    companyUrl: "https://www.tusas.com.tr/en",
    logo: "/logos/turkish-aerospace.svg",
    type: "Full-time",
    location: "Ankara, Türkiye",
    start: "2021-11",
    end: null,
    summary:
      "Building real-time, safety-critical flight control software in C++ for advanced aerospace platforms, combining model-based development with hand-written embedded code and working with multidisciplinary teams from design through testing.",
    highlights: [
      "Design and develop flight control software for real-time, safety-critical aerospace systems used in advanced training platforms.",
      "Improved automation and data acquisition workflows by implementing custom C++ libraries for embedded computing environments.",
      "Led the development of desktop applications using C++ and the Qt framework.",
      "Contribute to DO-178C compliance processes and use real-time operating systems such as Green Hills INTEGRITY for high-assurance software components.",
    ],
    skills: ["C++", "Qt", "Simulink", "Green Hills", "INTEGRITY RTOS", "DO-178C", "DOORS"],
  },
  {
    id: "tubitak-research",
    title: "Undergraduate Research Fellow",
    company: "TÜBİTAK",
    companyUrl: "https://www.tubitak.gov.tr/en",
    logo: "/logos/tubitak.svg",
    type: "Research",
    location: "Ankara, Türkiye",
    start: "2020-12",
    end: "2021-08",
    summary:
      "Research fellow on TARİF, a TÜBİTAK 1001 project (118E283) on matching and enriching do-it-yourself (DIY) videos with a multimodal approach.",
    highlights: [
      "Focused on recipe videos: aligning every step of a recipe with the part of the video where it happens.",
      "Worked on the sub-problems behind it, including content-based text analysis, matching visual and textual data, and learning visual concepts from video.",
      "Used Python and related tools to process and analyze multimedia data.",
    ],
    skills: ["Python", "Multimodal Learning", "Computer Vision", "NLP"],
    link: {
      label: "View publication",
      href: "https://search.trdizin.gov.tr/tr/yayin/detay/1222272/tarif-kendin-yap-videolarinin-eslestirilmesi-ve-zenginlestirilmesi-icin-cok-kipli-yaklasim",
    },
  },
  {
    id: "aselsan",
    title: "Software Engineering Intern",
    company: "ASELSAN",
    companyUrl: "https://www.aselsan.com/en",
    logo: "/logos/aselsan.svg",
    wideLogo: true,
    type: "Internship",
    location: "Ankara, Türkiye",
    start: "2020-06",
    end: "2020-08",
    highlights: [
      "Built a Qt/C++ desktop application for parsing and visualizing NMEA 0183 maritime messages.",
      "Improved data handling with a circular buffer, reducing lost messages by 80%.",
    ],
    skills: ["C++", "Qt", "NMEA 0183", "Circular Buffer"],
  },
  {
    id: "tubitak-bilgem-yte",
    title: "Software Engineering Intern",
    company: "TÜBİTAK BİLGEM YTE",
    companyUrl: "https://bilgem.tubitak.gov.tr/yte/",
    logo: "/logos/tubitak.svg",
    type: "Internship",
    location: "Ankara, Türkiye",
    start: "2019-07",
    end: "2019-09",
    highlights: [
      "Built a responsive web application using React.js and Spring Boot.",
      "Designed an asynchronous architecture to handle multiple HTTP requests efficiently.",
      "Used PostgreSQL for backend model storage and RESTful API integration.",
    ],
    skills: ["React.js", "Spring Boot", "PostgreSQL", "REST API", "HTML", "CSS"],
  },
]

export const education: Degree[] = [
  {
    id: "msc",
    degree: "M.Sc.",
    field: "Computer Science",
    school: "Hacettepe University",
    start: "2023",
    end: "2026",
    grade: "GPA 3.58 / 4.00",
    details: [
      "Thesis research on super-resolution for medical image segmentation (MR and CT): treating super-resolution not just as an image-quality step but as a component that shapes downstream segmentation performance.",
      "Proposed a region-aware super-resolution training approach that focuses on foreground and boundary-context regions, evaluated across multiple datasets, segmentation models and metrics.",
      "Advisor: Assoc. Prof. Aydın Kaya.",
    ],
  },
  {
    id: "bsc",
    degree: "B.Sc.",
    field: "Computer Science & Engineering",
    school: "Hacettepe University",
    start: "2016",
    end: "2021",
    grade: "CGPA 3.55 / 4.00",
    details: ["Strong foundation in algorithms, data structures and software engineering."],
  },
]

export const beyondWork: { title: string; text: string; href?: string; cta?: string }[] = [
  {
    title: "Competitive programming",
    text: "Solving algorithm problems on LeetCode since June 2020.",
  },
  {
    title: "YouTube",
    text: "Teaching algorithms and data structures with step-by-step video solutions.",
    href: "/videos",
    cta: "Watch videos",
  },
  {
    title: "Writing",
    text: "Breaking down classic problems and techniques on Medium.",
    href: "/blogs",
    cta: "Read the blog",
  },
]
