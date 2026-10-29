// Articles published on Medium (https://medium.com/@koray.kara98.kk), newest first.
// Dates come from the Medium RSS feed; read times are Medium's estimates.

export type BlogCategory = "Design Patterns" | "Software Engineering" | "DS & Algorithms"

export type BlogPost = {
  title: string
  excerpt: string
  date: string // YYYY-MM-DD
  readTime: number // minutes
  category: BlogCategory
  language: "EN" | "TR"
  url: string
  image: string
  tags?: string[]
}

export const blogPosts: BlogPost[] = [
  {
    title: "Java’da Prototype Pattern: Nesneleri Klonlayarak Verimli ve Esnek Çözümler",
    excerpt:
      "Creating some objects from scratch is costly. The Prototype pattern copies an existing object instead: what it is, when to use it, its trade-offs, and Java examples.",
    date: "2025-08-16",
    readTime: 3,
    category: "Design Patterns",
    language: "TR",
    url: "https://medium.com/@koray.kara98.kk/javada-prototype-pattern-nesneleri-klonlayarak-verimli-ve-esnek-%C3%A7%C3%B6z%C3%BCmler-0f7b7f7f7af6",
    image: "/blog/prototype.jpg",
    tags: ["Java", "Creational patterns"],
  },
  {
    title: "Java’da Factory Pattern: Nesne Oluşturmayı Esnek ve Yönetilebilir Hale Getirin",
    excerpt:
      "Instantiating many concrete classes directly makes code hard to maintain. The Factory pattern centralises object creation: the problems it solves, a Java implementation and real-world examples.",
    date: "2025-08-09",
    readTime: 3,
    category: "Design Patterns",
    language: "TR",
    url: "https://medium.com/@koray.kara98.kk/javada-factory-pattern-nesne-olu%C5%9Fturmay%C4%B1-esnek-ve-y%C3%B6netilebilir-hale-getirin-843db808ab7e",
    image: "/blog/factory.jpg",
    tags: ["Java", "Creational patterns"],
  },
  {
    title: "Java’da Builder Pattern: Nesne Oluşturmanın En Esnek Yolu",
    excerpt:
      "Long constructors and null parameters make complex objects painful to build. A step-by-step look at the Builder pattern, when to use it, and how to implement it in Java.",
    date: "2025-08-07",
    readTime: 3,
    category: "Design Patterns",
    language: "TR",
    url: "https://medium.com/@koray.kara98.kk/javada-builder-pattern-nesne-olu%C5%9Fturman%C4%B1n-en-esnek-yolu-480bcbe95ea9",
    image: "/blog/builder.jpg",
    tags: ["Java", "Creational patterns"],
  },
  {
    title: "What is Object-Oriented Programming (OOP)?",
    excerpt:
      "The paradigm behind most modern software, from banking apps to video games: classes, objects and the principles that give code structure, reusability and safety.",
    date: "2025-07-05",
    readTime: 2,
    category: "Software Engineering",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/what-is-object-oriented-programming-oop-cd18a88cbc06",
    image: "/blog/oop.jpg",
    tags: ["OOP", "Fundamentals"],
  },
  {
    title: "Understanding and Implementing Flood Fill Algorithm",
    excerpt:
      "A walkthrough of the flood fill algorithm through a LeetCode problem, for anyone starting out with coding or sharpening their algorithmic skills.",
    date: "2023-06-04",
    readTime: 8,
    category: "DS & Algorithms",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/understanding-and-implementing-flood-fill-algorithm-60ab81538d54",
    image: "/flood-fill.png",
    tags: ["DFS", "LeetCode"],
  },
  {
    title: "Understanding the Power of the Slow and Fast Pointer Technique in Computer Science",
    excerpt:
      "How the slow and fast pointer technique solves linked-list and cycle problems efficiently, explained in simple terms with the reasoning behind it.",
    date: "2023-06-03",
    readTime: 9,
    category: "DS & Algorithms",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/understanding-the-power-of-the-slow-and-fast-pointer-technique-in-computer-science-1388c5ddf569",
    image: "/slow_fast.jpg",
    tags: ["Linked lists", "Two pointers"],
  },
  {
    title: "Daily LeetCode Problems: Subsets",
    excerpt:
      "Generating every subset of a set with recursion and backtracking, a fundamental skill for any programmer.",
    date: "2023-05-28",
    readTime: 8,
    category: "DS & Algorithms",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-exploring-the-coin-change-problem-subsets-6957b279c92d",
    image: "/subset.jpg",
    tags: ["Backtracking", "LeetCode"],
  },
  {
    title: "Daily LeetCode Problems: Exploring the Coin Change Problem, Finding the Minimum Number of Coins",
    excerpt:
      "The classic coin change problem: finding the minimum number of coins for an amount with dynamic programming and tabulation.",
    date: "2023-05-24",
    readTime: 8,
    category: "DS & Algorithms",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-exploring-the-coin-change-problem-finding-the-minimum-number-of-coins-92a76a724c62",
    image: "/coinchange.jpg",
    tags: ["Dynamic programming", "LeetCode"],
  },
  {
    title: "Daily LeetCode Problems: Solving the Permutations Problem",
    excerpt:
      "An algorithmic approach to generating every permutation of a set of numbers with backtracking.",
    date: "2023-05-24",
    readTime: 4,
    category: "DS & Algorithms",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-solving-the-permutations-problem-f2bfd7ff0954",
    image: "/permutation.jpg",
    tags: ["Backtracking", "LeetCode"],
  },
  {
    title: "Solving the Binary Tree Maximum Path Sum Problem",
    excerpt:
      "Finding the maximum path sum in a binary tree with a single post-order traversal.",
    date: "2023-05-21",
    readTime: 11,
    category: "DS & Algorithms",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-solving-the-binary-tree-maximum-path-sum-problem-f9e5e9b9b740",
    image: "/max_path_sum.jpg",
    tags: ["Binary trees", "LeetCode"],
  },
  {
    title: "Daily LeetCode Problems: Count Good Nodes in Binary Tree",
    excerpt:
      "A node is good if no node on the path from the root to it has a greater value. Counting them with a depth-first traversal.",
    date: "2023-05-20",
    readTime: 5,
    category: "DS & Algorithms",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-count-good-nodes-in-binary-tree-cf0b1ffa9afd",
    image: "/good_nodes.jpg",
    tags: ["Binary trees", "LeetCode"],
  },
  {
    title: "Daily LeetCode: Binary Tree Right Side View (Problem 199)",
    excerpt:
      "Viewing a binary tree from the right side with level-order traversal, step by step.",
    date: "2023-05-19",
    readTime: 6,
    category: "DS & Algorithms",
    language: "EN",
    url: "https://medium.com/@koray.kara98.kk/daily-leetcode-problems-problem-199-binary-tree-right-side-view-54cf24d33b88",
    image: "/right_side_view.jpg",
    tags: ["BFS", "LeetCode"],
  },
]

export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
