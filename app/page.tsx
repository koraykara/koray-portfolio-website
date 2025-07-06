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
              I love building modern and large scale systems, solving real-world problems with code, and sharing what I learn.
              <br />
              Welcome to my digital playground — explore my projects, photography, and thoughts on technology!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/connect">Get In Touch</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-10">
            <Link href="https://github.com/koraykara" target="_blank" aria-label="GitHub">
              <svg className="w-7 h-7 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.36.309.68.919.68 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
              </svg>
            </Link>
            <Link href="https://www.linkedin.com/in/koray-kara-424b19146/" target="_blank" aria-label="LinkedIn">
              <svg className="w-7 h-7 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.609v5.587z"/>
              </svg>
            </Link>
            <Link href="https://www.instagram.com/koraykara98/" target="_blank" aria-label="Instagram">
              <svg className="w-7 h-7 text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.771.13 4.659.387 3.678 1.368c-.981.981-1.238 2.093-1.296 3.374C2.014 5.668 2 6.077 2 9.333v5.334c0 3.256.014 3.665.072 4.946.058 1.281.315 2.393 1.296 3.374.981.981 2.093 1.238 3.374 1.296C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.281-.058 2.393-.315 3.374-1.296.981-.981 1.238-2.093 1.296-3.374.058-1.281.072-1.69.072-4.946V9.333c0-3.256-.014-3.665-.072-4.946-.058-1.281-.315-2.393-1.296-3.374-.981-.981-2.093-1.238-3.374-1.296C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </section>
    </div>
  )
}
