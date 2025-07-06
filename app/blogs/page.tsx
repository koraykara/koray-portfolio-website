"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, TrendingUp, Filter } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
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

  const featuredPost = {
    title: "Understanding and Implementing Flood Fill Algorithm",
    excerpt:
      "Welcome to my blog post about understanding and implementing the flood fill algorithm! Whether you’re just starting out with coding or looking to improve your algorithmic skills, this article will walk you through a specific problem from LeetCode that involves flood fill. ",
    date: "Jun 4, 2023",
    readTime: "8 min read",
    category: "DS & Algorithms",
    slug: "https://medium.com/@koray.kara98.kk/understanding-and-implementing-flood-fill-algorithm-60ab81538d54",
    featured: true,
    // views: "2.1k",
  };

  const blogPosts = [
    {
      title:
        "Understanding the Power of the Slow and Fast Pointer Technique in Computer Science",
      excerpt:
        "In the world of computer science, we often come across tricky problems that need smart solutions. One technique that has gained popularity is the slow and fast pointer technique. It’s a clever method that can help us solve problems efficiently, especially when dealing with linked lists and cyclic structures. In this article, we’ll explore this technique in simple terms, understand how it works, and see how it can improve the performance of our code.",
      date: "Jun 3, 2023",
      readTime: "9 min read",
      category: "DS & Algorithms",
      slug: "https://medium.com/@koray.kara98.kk/understanding-the-power-of-the-slow-and-fast-pointer-technique-in-computer-science-1388c5ddf569",
      image: "/slow_fast.png",
      // views: "2.7k",
    },
    {
      title: "Daily LeetCode Problems: Subsets",
      excerpt:
        "In this blog post, we will delve into the intriguing problem of generating subsets, as presented in the popular coding platform LeetCode. Understanding how to efficiently generate subsets is a fundamental skill for any programmer or coding enthusiast.",
      date: "May 28, 2023",
      readTime: "8 min read",
      category: "DS & Algorithms",
      slug: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-exploring-the-coin-change-problem-subsets-6957b279c92d",
      image: "/subset.png",
      // views: "1.5k",
    },
    {
      title:
        "Daily LeetCode Problems: Exploring the Coin Change Problem, Finding the Minimum Number of Coins",
      excerpt:
        "Welcome to our latest blog post! Today, we will delve into the coin change problem. This classic algorithmic problem challenges us to find the minimum number of coins needed to make a given amount of money.",
      date: "May 24, 2023",
      readTime: "8 min read",
      category: "DS & Algorithms",
      slug: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-exploring-the-coin-change-problem-finding-the-minimum-number-of-coins-92a76a724c62",
      image: "/coinchange.png",
      // views: "2.9k",
    },
    {
      title: "Daily LeetCode Problems: Solving the Permutations Problem",
      excerpt:
        "In this blog post, we will explore the “Permutations” problem on LeetCode. We will discuss an algorithmic approach to generate all possible permutations of a given set of numbers.",
      date: "May 24, 2023",
      readTime: "4 min read",
      category: "DS & Algorithms",
      slug: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-solving-the-permutations-problem-f2bfd7ff0954",
      image: "/permutation.png",
      // views: "3.5k",
    },
    {
      title: "Solving the Binary Tree Maximum Path Sum Problem",
      excerpt:
        "Welcome to another exciting problem-solving journey! In this blog, we will dive into the world of binary trees and explore an intriguing problem",
      date: "May 21, 2023",
      readTime: "11 min read",
      category: "DS & Algorithms",
      slug: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-solving-the-binary-tree-maximum-path-sum-problem-f9e5e9b9b740",
      image: "/max_path_sum.png",
      // views: "2.3k",
    },
    {
      title: "Daily LeetCode Problems: Count Good Nodes in Binary Tree.",
      excerpt:
        "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.",
      date: "May 20, 2023",
      readTime: "5 min read",
      category: "DS & Algorithms",
      slug: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-count-good-nodes-in-binary-tree-cf0b1ffa9afd",
      image: "/good_nodes.png",
      // views: "2.8k",
    },
    {
      title: "Daily LeetCode: Binary Tree Right Side View – Problem 199",
      excerpt:
        "In this post, I break down the logic behind Problem 199 from LeetCode, explaining how to view a binary tree from the right side using level-order traversal.",
      date: "May 19, 2023",
      readTime: "6 min read",
      category: "DS & Algorithms",
      slug: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-problem-199-binary-tree-right-side-view-54cf24d33b88",
      image: "/right_side_view.png",
      // views: "1.8k",
    },
  ];

  // Get all unique categories including featured post
  const allPosts = [featuredPost, ...blogPosts];
  const allCategories = [
    "All",
    ...Array.from(new Set(allPosts.map((post) => post.category))).sort(),
  ];

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  // Check if featured post should be shown
  const showFeaturedPost =
    selectedCategory === "All" || featuredPost.category === selectedCategory;

  return (
    <div className="min-h-screen py-16 px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
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
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights about web development,
            programming, and technology.
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
                    {allPosts.filter((p) => p.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(showFeaturedPost ? 1 : 0) + filteredPosts.length} of{" "}
              {allPosts.length} articles
            </p>
          </div>
        </div>

        {/* Featured Post */}
        {showFeaturedPost && (
          <div
            ref={(el) => {
              sectionRefs.current[2] = el;
            }} // Sadece atama, return yok!
            data-section="featured"
            className={`mb-16 transition-all duration-700 ${
              visibleSections.includes("featured")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center mb-8">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Featured Post
              </h2>
            </div>

            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-0">
              <CardContent className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {featuredPost.category}
                      </Badge>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        Featured
                      </Badge>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                      {featuredPost.title}
                    </h3>

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      {/* <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        <span>{featuredPost.views} views</span>
                      </div> */}
                    </div>

                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
                      asChild
                    >
                      <Link href={`${featuredPost.slug}`}>
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="w-full h-64 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                      <img
                        src="/flood-fill.png"
                        alt="Flood Fill Algorithm Illustration"
                        className="w-full h-full object-contain"
                        style={{ maxHeight: "15rem" }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 && (
          <div
            ref={(el) => {
              sectionRefs.current[3] = el;
            }} // Sadece atama, return yok!
            data-section="posts"
            className={`transition-all duration-700 ${
              visibleSections.includes("posts")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
              {selectedCategory === "All"
                ? "All Articles"
                : `${selectedCategory} Articles`}
              <Badge variant="secondary" className="ml-3 px-3 py-1">
                {filteredPosts.length}
              </Badge>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    visibleSections.includes("posts")
                      ? "animate-fade-in-up"
                      : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative w-full aspect-[3/2] rounded-t-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-contain object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/50 text-white border-0 text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                      <Link href={`${post.slug}`} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        asChild
                      >
                        <a
                          href={post.slug}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read more →
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!showFeaturedPost && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Filter className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              No articles match the selected category "{selectedCategory}". Try
              selecting a different filter.
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("All")}
              className="px-6"
            >
              Show All Articles
            </Button>
          </div>
        )}

        {/* Load More */}
        {(showFeaturedPost || filteredPosts.length > 0) && (
          <div
            ref={(el) => {
              sectionRefs.current[4] = el;
            }}
            data-section="loadmore"
            className={`text-center mt-12 transition-all duration-700 ${
              visibleSections.includes("loadmore")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Button variant="outline" size="lg" className="px-8">
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
