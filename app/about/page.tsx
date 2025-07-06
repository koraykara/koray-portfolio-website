"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, GraduationCap, Building, Filter } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section") || ""
            setVisibleSections((prev) => [...new Set([...prev, id])])
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const techStack = [
    // Languages
    {
      name: "Java",
      category: "Languages",
      level: "Expert",
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
    },
    {
      name: "C/C++",
      category: "Languages",
      level: "Advanced",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    },
    {
      name: "Python",
      category: "Languages",
      level: "Advanced",
      color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    },
    {
      name: "JavaScript",
      category: "Languages",
      level: "Advanced",
      color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    },
    // {
    //   name: "TypeScript",
    //   category: "Languages",
    //   level: "Advanced",
    //   color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    // },
    {
      name: "MATLAB",
      category: "Languages",
      level: "Advanced",
      color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
    },
    {
      name: "SQL",
      category: "Languages",
      level: "Advanced",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    },

    // Frameworks & Libraries
    {
      name: "Spring Boot",
      category: "Frameworks",
      level: "Expert",
      color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    },
    {
      name: "React",
      category: "Frameworks",
      level: "Advanced",
      color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",
    },
    // {
    //   name: "Next.js",
    //   category: "Frameworks",
    //   level: "Advanced",
    //   color: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300",
    // },
    // {
    //   name: "Node.js",
    //   category: "Frameworks",
    //   level: "Advanced",
    //   color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    // },
    // {
    //   name: "Express.js",
    //   category: "Frameworks",
    //   level: "Advanced",
    //   color: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300",
    // },
    {
      name: "Simulink",
      category: "Frameworks",
      level: "Expert",
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
    },
    {
      name: "Qt",
      category: "Frameworks",
      level: "Advanced",
      color: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300",
    },

    // DevOps & Tools
    // {
    //   name: "Docker",
    //   category: "DevOps",
    //   level: "Advanced",
    //   color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    // },
    // {
    //   name: "Kubernetes",
    //   category: "DevOps",
    //   level: "Intermediate",
    //   color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    // },
    {
      name: "Jenkins",
      category: "DevOps",
      level: "Advanced",
      color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
    },
    {
      name: "Git",
      category: "DevOps",
      level: "Expert",
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
    },
    {
      name: "VectorCast",
      category: "DevOps",
      level: "Advanced",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    },
    {
      name: "AWS",
      category: "DevOps",
      level: "Advanced",
      color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    },
    // {
    //   name: "Linux",
    //   category: "DevOps",
    //   level: "Advanced",
    //   color: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300",
    // },

    // Databases
    {
      name: "PostgreSQL",
      category: "Databases",
      level: "Advanced",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    },
    {
      name: "MongoDB",
      category: "Databases",
      level: "Advanced",
      color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    },
    {
      name: "MySQL",
      category: "Databases",
      level: "Advanced",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    },

    // Specialized
    {
      name: "DO-178C",
      category: "Standards",
      level: "Advanced",
      color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
    },
    {
      name: "Real-time Systems",
      category: "Specialized",
      level: "Expert",
      color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
    },
    {
      name: "Embedded Systems",
      category: "Specialized",
      level: "Expert",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    },
    {
      name: "Control Systems",
      category: "Specialized",
      level: "Expert",
      color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    },
  ]

  // Get all unique categories
  const allCategories = ["All", ...Array.from(new Set(techStack.map((tech) => tech.category))).sort()]

  // Filter tech stack based on selected category
  const filteredTechStack =
    selectedCategory === "All" ? techStack : techStack.filter((tech) => tech.category === selectedCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
      case "Advanced":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
      case "Intermediate":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen py-16 px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div
          ref={(el) => { sectionRefs.current[0] = el; }}
          data-section="hero"
          className={`mb-20 transition-all duration-700 ${
            visibleSections.includes("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-80 h-80 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                    <Image
                      src="/koray.jpeg?height=288&width=288"
                      alt="Koray Kara"
                      width={288}
                      height={288}
                      className="w-72 h-72 rounded-full object-cover border-4 border-white dark:border-gray-900"
                    />
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
                  Software Engineer
                </div>
                <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                  Hacettepe University Graduate
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-6">
              <div>
                <h1 className="text-5xl sm:text-6xl font-light mb-4 text-gray-900 dark:text-white">
                  <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Koray Kara
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Flight Control Software Engineer
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                  Developing real-time, safety-critical software for supersonic aircraft at Turkish Aerospace
                </p>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0 flex items-center space-x-3">
                    <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">TUSAŞ</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Turkish Aerospace</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0 flex items-center space-x-3">
                    <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">Hacettepe Uni.</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Computer Engineering</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0 flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">Ankara, Turkey</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Based in</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0 flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">CGPA 3.55/4.00</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Academic Excellence</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div
          ref={(el) => { sectionRefs.current[1] = el; }}
          data-section="biography"
          className={`mb-20 transition-all duration-700 ${
            visibleSections.includes("biography") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="p-8 lg:p-12 bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 border-0 shadow-xl">
            <CardContent className="p-0">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">About Me</h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="text-xl leading-relaxed">
                  Koray Kara is a Flight Control Software Engineer at Turkish Aerospace (TUSAŞ), where he develops
                  real-time, safety-critical software for the HÜRJET supersonic jet. He graduated from Hacettepe
                  University with a B.Sc. in Computer Engineering (CGPA: 3.55/4.00), ranked in the top 1% nationally,
                  and has interned at ASELSAN and TÜBİTAK BİLGEM. His work spans embedded systems, control algorithms,
                  and software verification under DO-178C standards. He is also actively engaged in academic research,
                  content creation on YouTube, and experiments with AI-assisted code generation tools to bridge
                  engineering and education.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Toolkit Section */}
        <div
          ref={(el) => { sectionRefs.current[2] = el; }}
          data-section="toolkit"
          className={`transition-all duration-700 ${
            visibleSections.includes("toolkit") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Technical Toolkit</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Technologies and tools I use to build robust, scalable, and safety-critical software systems.
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter by Category</h3>
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
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg scale-105"
                      : "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
                >
                  {category}
                  {category !== "All" && (
                    <Badge variant="secondary" className="ml-2 px-2 py-0 text-xs bg-white/20 text-current border-0">
                      {techStack.filter((tech) => tech.category === category).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredTechStack.length} of {techStack.length} technologies
              </p>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredTechStack.map((tech, index) => (
              <Card
                key={tech.name}
                className={`group hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 hover:border-blue-300 dark:hover:border-blue-600 ${
                  visibleSections.includes("toolkit") ? "animate-fade-in-up" : ""
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl ${tech.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                  >
                    <span className="text-xl font-bold">{tech.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {tech.name}
                  </h3>
                  <Badge className={`text-xs px-2 py-1 ${getLevelColor(tech.level)} border-0`}>{tech.level}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredTechStack.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Filter className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No technologies found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                No technologies match the selected category "{selectedCategory}". Try selecting a different filter.
              </p>
              <Button variant="outline" onClick={() => setSelectedCategory("All")} className="px-6">
                Show All Technologies
              </Button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div
          ref={(el) => { sectionRefs.current[3] = el; }}
          data-section="stats"
          className={`mt-20 transition-all duration-700 ${
            visibleSections.includes("stats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3+</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Years Experience</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{techStack.length}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Technologies</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">3</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Major Projects</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">1%</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Top Graduate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
