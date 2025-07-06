"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Home Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Animated Background with coding pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
            <div className="absolute top-10 left-10 text-6xl font-mono text-blue-600 dark:text-blue-400 rotate-12 animate-pulse">
              {"<>"}
            </div>
            <div className="absolute top-32 right-20 text-4xl font-mono text-purple-600 dark:text-purple-400 -rotate-12 animate-bounce">
              {"{ }"}
            </div>
            <div className="absolute bottom-32 left-20 text-5xl font-mono text-green-600 dark:text-green-400 rotate-45 animate-pulse">
              {"[]"}
            </div>
            <div className="absolute bottom-20 right-32 text-3xl font-mono text-red-600 dark:text-red-400 -rotate-45 animate-bounce">
              {"()"}
            </div>
            <div className="absolute top-1/2 left-1/4 text-2xl font-mono text-yellow-600 dark:text-yellow-400 rotate-90 animate-pulse">
              {"</"}
            </div>
            <div className="absolute top-1/3 right-1/3 text-4xl font-mono text-indigo-600 dark:text-indigo-400 -rotate-12 animate-bounce">
              {"=>"}
            </div>
            <div className="absolute top-20 left-1/2 text-3xl font-mono text-pink-600 dark:text-pink-400 rotate-12 animate-pulse">
              {"()"}
            </div>
            <div className="absolute bottom-40 right-10 text-2xl font-mono text-cyan-600 dark:text-cyan-400 -rotate-45 animate-bounce">
              {"&&"}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Profile Image with glow */}
          <div className="mb-8 relative flex justify-center">
            <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-60 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow" />
              <div className="absolute inset-2 sm:inset-3 lg:inset-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-xl">
                <Image
                  src="/koray.jpeg?height=256&width=256"
                  alt="Koray Kara"
                  width={256}
                  height={256}
                  className="w-52 h-52 sm:w-58 sm:h-58 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-white dark:border-gray-900"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Hi, I'm{" "}
              <span className="font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Koray Kara
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Software Developer • Tech & Algorithm Enthusiast
            </p>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
              I love building modern and large scale , solving real-world problems with code, and sharing what I learn.
              <br />
              Welcome to my digital playground — explore my projects, photography, and thoughts on technology!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 w-full max-w-md mx-auto">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <Link href="/connect">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
