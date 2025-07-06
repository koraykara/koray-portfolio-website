"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  period: string;
  year: number;
  description: string[];
  technologies: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Flight Control Software Engineer",
    company: "Turkish Aerospace Industries",
    companyUrl: "https://www.tusas.com.tr/en",
    location: "Ankara, Turkey",
    period: "Nov 2021 - Present",
    year: 2021,
    description: [
      "Designed flight control software for HURJET, supporting 100+ combat training missions.",
      "Developed UEIPAC library to improve tasks like data acquisition and automation.",
      "Led GUI development using Qt/C++ for lab visualization, improving interaction time by 50%.",
      "Contributed to DO-178C compliance and used Green Hills INTEGRITY RTOS for critical tasks.",
      "Reduced software bugs by 30% via robust SCADE-based development and testing.",
    ],
    technologies: [
      "C++",
      "Qt",
      "SCADE",
      "Green Hills",
      "INTEGRITY RTOS",
      "DOORS",
    ],
    current: true,
  },
  {
    id: 2,
    title: "Software Engineer Intern",
    company: "ASELSAN",
    companyUrl: "https://www.aselsan.com.tr/en",
    location: "Ankara, Turkey",
    period: "Jun 2020 - Aug 2020",
    year: 2020,
    description: [
      "Built a Qt/C++ desktop app for parsing and visualizing NMEA 0183 maritime messages.",
      "Improved data handling with circular buffer, reducing lost messages by 80%.",
    ],
    technologies: ["C++", "Qt", "NMEA 0183", "Circular Buffer"],
  },
  {
    id: 3,
    title: "Software Engineer Intern",
    company: "TUBITAK",
    companyUrl: "https://www.tubitak.gov.tr/en",
    location: "Ankara, Turkey",
    period: "Jul 2019 - Sep 2019",
    year: 2019,
    description: [
      "Built a responsive web application using React.js and Spring Boot.",
      "Designed async architecture to handle multiple HTTP requests efficiently.",
      "Used PostgreSQL for backend model storage and RESTful API integration.",
    ],
    technologies: [
      "React.js",
      "Spring Boot",
      "PostgreSQL",
      "HTML",
      "CSS",
      "REST API",
    ],
  },
];

export default function ExperiencePage() {
  const [visibleExperiences, setVisibleExperiences] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number.parseInt(
              entry.target.getAttribute("data-id") || "0"
            );
            setVisibleExperiences((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    experienceRefs.current.forEach((ref) => {
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

  return (
    <div className="min-h-screen py-16 px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-light mb-6 text-gray-900 dark:text-white">
            Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I’m a Flight Control Software Engineer at Turkish Aerospace
            Industries with a strong background in embedded systems, control
            software, and full-stack development. My experience spans across
            mission-critical avionics software, web technologies like React and
            Spring Boot, and academic research in AI and computer vision. I
            continuously thrive on building robust systems, contributing to
            high-impact projects, and blending engineering precision with
            innovative software design.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Experience Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => { experienceRefs.current[index] = el; }}
                data-id={exp.id}
                className={`relative pl-20 transition-all duration-700 ${
                  visibleExperiences.includes(exp.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 shadow-lg transition-all duration-500 ${
                    exp.current
                      ? "bg-blue-500 animate-pulse scale-125"
                      : visibleExperiences.includes(exp.id)
                      ? "bg-purple-500"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                ></div>

                {/* Year Label */}
                <div className="absolute left-[-2rem] top-0 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 px-2 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  {exp.year}
                </div>

                {/* Experience Card */}
                <Card
                  className={`hover:shadow-2xl transition-all duration-500 transform ${
                    visibleExperiences.includes(exp.id)
                      ? "hover:scale-[1.02]"
                      : ""
                  } ${
                    exp.current
                      ? "ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10"
                      : ""
                  }`}
                >
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                          {exp.title}
                          {exp.current && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 animate-pulse">
                              Current
                            </Badge>
                          )}
                        </h3>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 flex items-center gap-2 mb-3"
                        >
                          {exp.company}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <ul className="space-y-3">
                        {exp.description.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-gray-600 dark:text-gray-300 leading-relaxed flex items-start"
                          >
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className={`px-3 py-1 text-xs transition-all duration-300 hover:scale-105 ${
                              visibleExperiences.includes(exp.id)
                                ? "animate-fade-in-up"
                                : ""
                            }`}
                            style={{
                              animationDelay: `${techIndex * 100}ms`,
                            }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                3+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Years of Experience
              </div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                3
              </div>
              <div className="text-gray-600 dark:text-gray-300">Companies</div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                15+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Technologies Mastered
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
