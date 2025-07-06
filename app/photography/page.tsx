"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Heart, Eye, Download, X } from "lucide-react";
import Image from "next/image";

export default function PhotographyPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Germany"];

  const photos = [
    {
      id: 1,
      title: "Winter at Nymphenburg Palace",
      category: "Germany",
      location: "Munich",
      date: "January 2025",
      likes: 89,
      views: 940,
      image: "/photo1.jpeg",
      description:
        "A serene winter scene in front of the historic Nymphenburg Palace in Munich, Germany. Snow-covered ground and Baroque architecture create a timeless atmosphere.",
    },
    {
      id: 2,
      title: "BMW Experience",
      category: "Germany",
      location: "BMW Welt, Munich",
      date: "January 2025",
      likes: 89,
      views: 890,
      image: "/photo2.jpeg",
      description:
        "Standing beside a stunning BMW M model at BMW Welt in Munich — a celebration of automotive innovation and design.",
    },
    {
      id: 3,
      title: "Morning at Marienplatz",
      category: "Germany",
      location: "Munich - Marienplatz",
      date: "January 2025",
      likes: 156,
      views: 1500,
      image: "/germany.jpeg?height=400&width=600",
      description:
        "Enjoying a crisp winter morning at Munich’s historic Marienplatz, with the iconic Old Town Hall standing tall behind.",
    },
    {
      id: 4,
      title: "Courtyard Calm",
      category: "Germany",
      location: "Munich Residenz",
      date: "January 2025",
      likes: 67,
      views: 670,
      image: "/photo3.jpeg",
      description:
        "A peaceful moment in the inner courtyard of the Munich Residenz — blending Renaissance architecture with a crisp winter atmosphere.",
    },
    {
      id: 5,
      title: "Neues Rathaus at Marienplatz",
      category: "Germany",
      location: "Munich - Marienplatz",
      date: "January 2025",
      likes: 98,
      views: 980,
      image: "/photo4.jpeg",
      description:
        "Standing in front of the majestic Neues Rathaus at Munich's iconic Marienplatz — a perfect blend of Gothic Revival architecture and lively urban energy.",
    },
    {
      id: 6,
      title: "Altes Rathaus Facade",
      category: "Germany",
      location: "Munich - Marienplatz",
      date: "January 2025",
      likes: 134,
      views: 1340,
      image: "/photo5.jpeg",
      description:
        "A detailed view of Munich’s Old Town Hall (Altes Rathaus), showcasing its Gothic charm and historic coat of arms, captured on a moody winter afternoon.",
    },
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const selectedPhoto =
    selectedImage !== null ? photos.find((p) => p.id === selectedImage) : null;

  return (
    <div className="min-h-screen py-16 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-light mb-6 text-gray-900 dark:text-white">
            Photography
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Capturing moments, emotions, and the beauty of the world through my
            lens. A collection of my favorite shots from travels and daily life.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <Card
              key={photo.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedImage(photo.id)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={photo.image || "/placeholder.svg"}
                  alt={photo.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-black/50 text-white border-0">
                    {photo.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {photo.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {photo.location} • {photo.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Equipment Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            My Equipment
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Camera className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold mb-2">Camera</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Canon EOS R5
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    L
                  </span>
                </div>
                <h3 className="font-semibold mb-2">Primary Lens</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  24-70mm f/2.8L
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    E
                  </span>
                </div>
                <h3 className="font-semibold mb-2">Editing</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Lightroom & Photoshop
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-full overflow-auto">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
              >
                <X className="h-4 w-4" />
              </Button>
              <Image
                src={selectedPhoto.image || "/placeholder.svg"}
                alt={selectedPhoto.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
              <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedPhoto.location} • {selectedPhoto.date}
                    </p>
                  </div>
                  <Badge>{selectedPhoto.category}</Badge>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
