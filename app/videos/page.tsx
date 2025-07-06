"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, List, Filter, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function VideosPage() {
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

  const videoPlaylists = [
    {
      id: 1,
      title: "Stack & Queue",
      description:
        "Learn stack and queue with real-world examples and clean code. Perfect for CS students and interview prep.",
      category: "Data Structures And Algorithms",
      thumbnail: "/Stack_Queue.png?height=200&width=350",
      videoCount: 10,
      duration: "2h 30m",
      playlistUrl:
        "https://youtube.com/playlist?list=PLYz3B3MBs9EnmmWqu7Q0xJkNZP1BMnkAI&si=PeJxZQkGlHYGfX6a",
      featured: true,
      views: "1K",
    },
    {
      id: 2,
      title: "Dynamic Programming",
      description:
        "Master dynamic programming with step-by-step problems and patterns used in top coding interviews.",
      category: "Data Structures And Algorithms",
      thumbnail: "/dynamic.jpg?height=200&width=350",
      videoCount: 18,
      duration: "6h 30m",
      playlistUrl:
        "https://youtube.com/playlist?list=PLYz3B3MBs9Emy7PbU195IoM0nSLstjvTh&si=bUbqNy9aCDWGqEQ8",
      featured: true,
      views: "5K",
    },
    {
      id: 3,
      title: "Graphs",
      description:
        "Learn core graph algorithms like BFS, DFS, Dijkstra, and more — explained clearly with code.",
      category: "Data Structures And Algorithms",
      thumbnail: "/graph.jpeg?height=200&width=350",
      videoCount: 14,
      duration: "3h 40m",
      playlistUrl:
        "https://youtube.com/playlist?list=PLYz3B3MBs9EmEtbovIpZHZ2dyQF5AGJIX&si=rju7FqWDVIKKajOP",
      featured: true,
      views: "3K",
    },
    {
      id: 4,
      title:
        "From Canada to Microsoft: A Software Engineer’s Journey | Software Talks Ep. 1",
      description:
        "From studying in Canada to working at Microsoft — Hüseyin shares his software career journey and key lessons.",
      category: "Talks",
      thumbnail: "/talks.jpg?height=200&width=350",
      videoCount: 1,
      duration: "1h 1m",
      playlistUrl:
        "https://youtube.com/playlist?list=PLYz3B3MBs9Ekp3zlDQ7POJ2h8f2VNamPx&si=2YIDoP6zqJ8awCQ-",
      featured: true,
      views: "525",
    },
    {
      id: 5,
      title: "Backtracking",
      description:
        "Explore backtracking algorithms through classic problems like N-Queens, Sudoku Solver, and Subsets. Learn pruning strategies and recursion patterns.",
      category: "Data Structures And Algorithms",
      thumbnail: "/backtrack.jpg?height=200&width=350",
      videoCount: 6,
      duration: "2h 20m",
      playlistUrl:
        "https://www.youtube.com/playlist?list=PLYz3B3MBs9En1ER9rSSg6lP9jLm6f_OXt",
      featured: false,
      views: "600",
    },
    {
      id: 6,
      title: "Recursion",
      description:
        "Understand the fundamentals of recursion with clear explanations and practical problem-solving examples including base cases, stack behavior, and backtracking.",
      category: "Data Structures And Algorithms",
      thumbnail: "/waterjug.jpeg?height=200&width=350",
      videoCount: 2,
      duration: "46m",
      playlistUrl:
        "https://www.youtube.com/playlist?list=PLYz3B3MBs9Ek36cr6aRmND5SDTtuBjsFd",
      featured: false,
      views: "338",
    },
    {
      id: 7,
      title: "Tries",
      description:
        "Master Trie data structure from basics to advanced applications like autocomplete, prefix matching, and word dictionaries.",
      category: "Data Structures And Algorithms",
      thumbnail: "/tries.jpeg?height=200&width=350",
      videoCount: 1,
      duration: "0h 37m",
      playlistUrl:
        "https://youtube.com/playlist?list=PLYz3B3MBs9El9l9DHCTEfBKyj8phEgTti&si=CvX4NSuQjz3yMRQz",
      featured: false,
      views: "145",
    },
    {
      id: 8,
      title: "Blind75",
      description:
        "Solve the most essential coding interview problems with in-depth explanations and patterns covering arrays, graphs, trees, and dynamic programming.",
      category: "Data Structures And Algorithms",
      thumbnail: "/blind75.jpg?height=200&width=350",
      videoCount: 32,
      duration: "8h 05m",
      playlistUrl:
        "https://youtube.com/playlist?list=PLYz3B3MBs9EnnNxfkOZwbchV34b84H_1_&si=TgobRY1lf8w5gW9j",
      featured: false,
      views: "288",
    },
  ];

  // Get all unique categories
  const allCategories = [
    "All",
    ...Array.from(
      new Set(videoPlaylists.map((playlist) => playlist.category))
    ).sort(),
  ];

  // Filter playlists based on selected category
  const filteredPlaylists =
    selectedCategory === "All"
      ? videoPlaylists
      : videoPlaylists.filter(
          (playlist) => playlist.category === selectedCategory
        );

  const featuredPlaylists = filteredPlaylists.filter((p) => p.featured);
  const otherPlaylists = filteredPlaylists.filter((p) => !p.featured);

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
            Videos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Educational video playlists covering programming, algorithms, system
            design, and technical interview preparation.
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
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg scale-105"
                    : "hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600"
                }`}
              >
                {category}
                {category !== "All" && (
                  <Badge
                    variant="secondary"
                    className="ml-2 px-2 py-0 text-xs bg-white/20 text-current border-0"
                  >
                    {
                      videoPlaylists.filter((p) => p.category === category)
                        .length
                    }
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredPlaylists.length} of {videoPlaylists.length}{" "}
              playlists
            </p>
          </div>
        </div>

        {/* Featured Playlists */}
        {featuredPlaylists.length > 0 && (
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
              <Play className="h-6 w-6 text-red-500 mr-2" />
              Featured Playlists
              <Badge variant="secondary" className="ml-3 px-3 py-1">
                {featuredPlaylists.length}
              </Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {featuredPlaylists.map((playlist, index) => (
                <Card
                  key={playlist.id}
                  className={`group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
                    visibleSections.includes("featured")
                      ? "animate-fade-in-up"
                      : ""
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                  onClick={() => window.open(playlist.playlistUrl, "_blank", "noopener,noreferrer")}
                  tabIndex={0}
                  role="link"
                  aria-label={playlist.title}
                >
                  <div className="relative w-full aspect-[16/9] bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={playlist.thumbnail || "/placeholder.svg"}
                      alt={playlist.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-8 w-8 text-white fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Play className="h-3 w-3 mr-1" />
                      Featured
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 text-white border-0 text-xs">
                        {playlist.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                      <List className="h-3 w-3 mr-1" />
                      {playlist.videoCount} videos
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                        {playlist.title}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {playlist.views} views
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
                      {playlist.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <List className="h-4 w-4 mr-1" />
                          <span>{playlist.videoCount} videos</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{playlist.duration}</span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-xs"
                      >
                        {playlist.category}
                      </Badge>
                    </div>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white group/btn"
                      asChild
                    >
                      <span>
                        <Play className="h-4 w-4 mr-2" />
                        Watch Playlist
                        <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Playlists */}
        {otherPlaylists.length > 0 && (
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
              {selectedCategory === "All"
                ? "All Playlists"
                : `${selectedCategory} Playlists`}
              <Badge variant="secondary" className="ml-3 px-3 py-1">
                {otherPlaylists.length}
              </Badge>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPlaylists.map((playlist, index) => (
                <Card
                  key={playlist.id}
                  className={`group hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    visibleSections.includes("other")
                      ? "animate-fade-in-up"
                      : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  onClick={() => window.open(playlist.playlistUrl, "_blank", "noopener,noreferrer")}
                  tabIndex={0}
                  role="link"
                  aria-label={playlist.title}
                >
                  <div className="relative w-full aspect-[16/9] rounded-t-lg overflow-hidden bg-white flex items-center justify-center">
                    <Image
                      src={playlist.thumbnail || "/placeholder.svg"}
                      alt={playlist.title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-6 w-6 text-white fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/50 text-white border-0 text-xs">
                        {playlist.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                      <List className="h-3 w-3 mr-1" />
                      {playlist.videoCount}
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                        {playlist.title}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {playlist.views}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                      {playlist.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <List className="h-3 w-3 mr-1" />
                          <span>{playlist.videoCount}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{playlist.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-red-600 hover:bg-red-700 text-white group/btn"
                      asChild
                    >
                      <span>
                        <Play className="h-3 w-3 mr-2" />
                        Watch Playlist
                        <ExternalLink className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPlaylists.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Play className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No playlists found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              No playlists match the selected category "{selectedCategory}". Try
              selecting a different filter.
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("All")}
              className="px-6"
            >
              Show All Playlists
            </Button>
          </div>
        )}

        {/* Stats Section */}
        <div
          ref={(el) => {
            sectionRefs.current[4] = el;
          }}
          data-section="stats"
          className={`mt-20 transition-all duration-700 ${
            visibleSections.includes("stats")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {videoPlaylists.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Total Playlists
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {videoPlaylists.reduce(
                    (acc, playlist) => acc + playlist.videoCount,
                    0
                  )}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Total Videos
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {allCategories.length - 1}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Categories
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  50K
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Total Views
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
