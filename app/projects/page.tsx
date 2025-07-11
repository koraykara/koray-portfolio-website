"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, Filter } from "lucide-react";
import Image from "next/image";

export default function ProjectsPage() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section") || "";
            setVisibleSections((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const projects = [
    {
      title: "Gym Management System",
      description:
        "A web-based platform for managing gym memberships, trainers, and lessons with secure login, filtering, and reporting features.",
      longDescription:
        "This system provides a comprehensive solution for gym operations, including member sign-up, trainer and customer login with role-based access, encrypted password storage, dynamic filtering of trainers and lessons, and PDF export capabilities. Both customers and trainers have personalized dashboards with profile management, workout requests, lesson tracking, and image upload support. Built for clarity and control in gym workflows.",
      tech: ["PHP", "JavaScript", "CSS", "MySQL"],
      categories: ["Full Stack"],
      image: "/gym.jpeg?height=300&width=500",
      github: "https://github.com/koraykara/Gym-Management-System",
      live: "",
      featured: true,
      stars: 0,
    },
    {
      title: "Zeybek Hukuk Danismanlik Website",
      description:
        "A modern and responsive website built for a legal consultancy firm using Spring Boot and React.",
      longDescription:
        "This project is a professional website developed for Zeybek Hukuk Danışmanlık, featuring a dynamic admin panel, service listings, contact forms, and a fully responsive design. The backend was built with Spring Boot and PostgreSQL, while the frontend uses React and Tailwind CSS to ensure performance and elegant UI.",
      tech: ["React", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
      categories: ["Full Stack", "Web Development"],
      image: "/zeybek.jpeg?height=300&width=500",
      github: "https://github.com/2PPDSA/ZEYBEK",
      live: "https://zeybekhukukdanismanlik.com/",
      featured: true,
      stars: 89,
    },
    {
      title: "Art Style Image Transformation",
      description:
        "Transform images into famous art styles using neural style transfer techniques.",
      longDescription:
        "This project implements neural style transfer using pre-trained convolutional neural networks to blend content images with the styles of famous artworks. It allows users to transform their own images into pieces resembling Van Gogh, Picasso, and others. The model uses VGG19 for feature extraction and loss calculation to optimize style-content fusion.",
      tech: [
        "Python",
        "PyTorch",
        "Neural Style Transfer",
        "VGG19",
        "Deep Learning",
      ],
      categories: ["Machine Learning"],
      image: "/art.png?height=300&width=500",
      github:
        "https://github.com/HUbbm409/bbm406-project-2021-artstyleimagetransformation",
      live: "",
      featured: true,
      stars: 156,
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website with dark mode, smooth animations, and optimized performance. Built with the latest web technologies.",
      longDescription:
        "Features include responsive design, dark/light mode toggle, smooth page transitions, SEO optimization, and performance optimization.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      categories: ["Web Development"],
      image: "/portfolio.jpeg?height=300&width=500",
      github: "https://github.com/koraykara/koray-portfolio-website",
      live: "https://koraykara.dev",
      featured: false,
      stars: 43,
    },
    {
      title: "Covid-19 Disease Detection",
      description:
        "Image-based classification of COVID-19, normal, and viral pneumonia cases using custom KNN and weighted KNN algorithms with handcrafted features.",
      longDescription:
        "This project applies KNN and weighted KNN classifiers to detect Covid-19, normal, and viral pneumonia cases from X-ray images. Feature extraction was performed using Gabor and Canny edge filters combined with original pixel values to maximize accuracy. The dataset was preprocessed, normalized, and split using both train/test and K-fold cross-validation strategies. The project also includes a detailed theoretical study of KNN and Linear Regression methods. The final implementation achieved a mean accuracy of 93.2% with 5-fold cross-validation.",
      tech: [
        "Python",
        "NumPy",
        "OpenCV",
        "Pandas",
        "Matplotlib",
        "Scikit-learn",
      ],
      categories: ["Machine Learning"],
      image: "/covid.jpg?height=300&width=500",
      github:
        "https://github.com/koraykara/Covid-19-Disease-Detection-from-images-using-KNN-algorithm",
      live: "",
      featured: true,
      stars: 78,
    },
    {
      title: "TARİF: Multi-Modal Approach for DIY Video Enhancement",
      description:
        "A research project focused on matching and enriching DIY (Do It Yourself) videos using multi-modal learning methods.",
      longDescription:
        "This project explores a novel multi-modal approach to improve the alignment and enrichment of 'Do It Yourself' (DIY) videos. Using visual and textual data jointly, the TARİF system aims to extract instructional content, segment videos into meaningful steps, and enhance user comprehension through image-text alignment. Conducted as part of a TÜBİTAK STAR-supported undergraduate research initiative under the supervision of Pınar Duygulu Şahin, the project tackles challenges in video understanding, cross-modal retrieval, and automatic annotation generation. The system combines natural language processing and computer vision to associate video segments with descriptive captions extracted from large-scale online sources such as YouTube.",
      tech: ["Python", "NLP", "Computer Vision", "PyTorch", "Transformers"],
      categories: ["Research", "Machine Learning"],
      image: "/recipe.jpeg?height=300&width=500",
      github: "",
      live: "https://search.trdizin.gov.tr/tr/yayin/detay/1222272/tarif-kendin-yap-videolarinin-eslestirilmesi-ve-zenginlestirilmesi-icin-cok-kipli-yaklasim",
      featured: false,
      stars: 92,
    },
    {
      title: "Online BookStore",
      description:
        "A full-featured online bookstore application with shopping cart, user authentication, and order management.",
      longDescription:
        "This project is a complete e-commerce platform designed for selling books online. It includes core functionalities such as user registration and login, book catalog browsing, search and filter, shopping cart, and order placement. Admin users can manage the inventory and view customer orders. The application is built with a layered architecture following software engineering best practices.",
      tech: [
        "Java",
        "Spring Boot",
        "Thymeleaf",
        "MySQL",
        "HTML",
        "CSS",
        "Bootstrap",
      ],
      categories: ["Web Development", "E-commerce", "Full Stack"],
      image: "/online-book-store.jpeg?height=300&width=500",
      github: "https://github.com/koraykara/Online-BookStore",
      live: "",
      featured: false,
      stars: 203,
    },
  ];

  // Get all unique categories
  const allCategories = [
    "All",
    ...Array.from(
      new Set(projects.flatMap((project) => project.categories))
    ).sort(),
  ];

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(selectedCategory)
        );

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen py-16 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          data-section="header"
          className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.includes("header")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl font-light mb-6 text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A collection of projects I've worked on, showcasing different
            technologies and problem-solving approaches.
          </p>
        </div>

        {/* Filter Section */}
        <div
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          data-section="filters"
          className={`mb-12 transition-all duration-700 ${
            visibleSections.includes("filters")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Filter by Category
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105"
                    : "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                {category}
                {category !== "All" && (
                  <Badge
                    variant="secondary"
                    className="ml-2 px-2 py-0 text-xs bg-white/20 text-current border-0"
                  >
                    {
                      projects.filter((p) => p.categories.includes(category))
                        .length
                    }
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div
            ref={(el) => {
              sectionRefs.current[2] = el;
            }}
            data-section="featured"
            className={`mb-16 transition-all duration-700 ${
              visibleSections.includes("featured")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Featured Projects
              <Badge variant="secondary" className="ml-3 px-3 py-1">
                {featuredProjects.length}
              </Badge>
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <Card
                  key={index}
                  className={`group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                    visibleSections.includes("featured")
                      ? "animate-fade-in-up"
                      : ""
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </div>
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                      {project.categories.slice(0, 2).map((cat) => (
                        <Badge
                          key={cat}
                          className="bg-black/50 text-white border-0 text-xs"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.longDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            <span>Code</span>
                          </a>
                        </Button>
                      )}
                      {project.live && (
                        <Button
                          size="sm"
                          className="flex items-center space-x-2"
                          asChild
                        >
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Live Demo</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div
            ref={(el) => {
              sectionRefs.current[3] = el;
            }}
            data-section="other"
            className={`transition-all duration-700 ${
              visibleSections.includes("other")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
              Other Projects
              <Badge variant="secondary" className="ml-3 px-3 py-1">
                {otherProjects.length}
              </Badge>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    visibleSections.includes("other")
                      ? "animate-fade-in-up"
                      : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {project.categories.slice(0, 2).map((cat) => (
                        <Badge
                          key={cat}
                          className="bg-black/50 text-white border-0 text-xs"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1 text-xs"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-3 w-3" />
                            <span>Code</span>
                          </a>
                        </Button>
                      )}
                      {project.live && (
                        <Button
                          size="sm"
                          className="flex items-center space-x-1 text-xs"
                          asChild
                        >
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Live Demo</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Filter className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              No projects match the selected category "{selectedCategory}". Try
              selecting a different filter.
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("All")}
              className="px-6"
            >
              Show All Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
