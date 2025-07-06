"use client"

import { Mail, Github, Linkedin, Instagram, BookOpen } from "lucide-react"

export default function ConnectPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "koray.kara98.kk@gmail.com",
      href: "mailto:koray.kara98.kk@gmail.com",
      description: "You can reach me anytime via email.",
      color: "text-blue-600 dark:text-blue-400",
      hover: "hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-500",
      border: "border-blue-200 dark:border-blue-500/40",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/koraykara",
      username: "@koraykara",
      description: "Check out my open source projects and contributions.",
      color: "text-gray-900 dark:text-white",
      hover: "hover:bg-gray-200 dark:hover:bg-gray-800/70 hover:border-gray-500",
      border: "border-gray-200 dark:border-gray-600/40",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/koray-kara-424b19146/",
      username: "koraykara",
      description: "Connect with me professionally and see my career journey.",
      color: "text-[#0A66C2]",
      hover: "hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-[#0A66C2]",
      border: "border-blue-200 dark:border-blue-500/40",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/koraykara98/",
      username: "@koraykara98",
      description: "Follow my personal journey and behind-the-scenes moments.",
      color: "text-pink-600",
      hover: "hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:border-pink-500",
      border: "border-pink-200 dark:border-pink-500/40",
    },
    {
      icon: null, // PNG ile göstereceğiz
      label: "YouTube",
      href: "https://www.youtube.com/@koraykara6270",
      username: "@koraykara",
      description: "Watch my videos on software, tech and more.",
      color: "",
      hover: "hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-500",
      border: "border-red-200 dark:border-red-500/40",
      isYoutube: true,
    },
    {
      icon: BookOpen,
      label: "Medium",
      href: "https://medium.com/@koray.kara98.kk",
      username: "@koray.kara98.kk",
      description: "Read my articles on software development, technology and more.",
      color: "text-green-600 dark:text-green-400",
      hover: "hover:bg-green-100 dark:hover:bg-green-900/30 hover:border-green-500",
      border: "border-green-200 dark:border-green-500/40",
    },
  ]

  return (
    <div className="min-h-screen py-16 px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-light mb-6 text-gray-900 dark:text-white">Let's Connect</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm always interested in new opportunities, collaborations, and interesting conversations. Feel free to
            reach out if you'd like to work together or just say hello!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col items-center gap-12 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {/* Contact Card */}
            {contactInfo.map((contact) => {
              const Icon = contact.icon
              return (
                <div
                  key={contact.label}
                  className={`flex flex-col items-start rounded-2xl bg-white dark:bg-[#23293a] ${contact.border} ${contact.hover} shadow-md transition-all duration-200 p-8 min-h-[220px] hover:scale-105 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500`}
                >
                  <div className="flex items-center mb-4">
                    <Icon className={`h-9 w-9 mr-4 ${contact.color}`} />
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">{contact.label}</span>
                  </div>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 dark:text-blue-300 font-medium break-all mb-2 underline"
                  >
                    {contact.value}
                  </a>
                  <p className="text-gray-600 dark:text-gray-300 text-base">{contact.description}</p>
                </div>
              )
            })}
            {/* Social Cards */}
            {socialLinks.map((social) => {
              // YouTube için özel icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-start rounded-2xl bg-white dark:bg-[#23293a] ${social.border} ${social.hover} shadow-md transition-all duration-200 p-8 min-h-[220px] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <div className="flex items-center mb-4">
                    {social.isYoutube ? (
                      <img
                        src="/youtube.png"
                        alt="YouTube"
                        className="h-9 w-9 mr-4 rounded-lg shadow-sm"
                        style={{ background: "transparent" }}
                      />
                    ) : (
                      social.icon && <social.icon className={`h-9 w-9 mr-4 ${social.color}`} />
                    )}
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">{social.label}</span>
                  </div>
                  <span
                    className={`font-medium mb-2 underline ${social.color}`}
                  >
                    {social.username}
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-base">{social.description}</p>
                </a>
              )
            })}
          </div>

          {/* Availability Card */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-2xl rounded-2xl border-2 border-green-400 bg-green-50 dark:bg-[#1a232a] p-8 flex items-start gap-4 shadow-lg transition-all duration-200"
              style={{
                boxShadow: "0 0 0 6px rgba(34,197,94,0.10), 0 4px 32px 0 rgba(34,197,94,0.13)"
              }}
            >
              <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-green-500 inline-block shadow-green-400/40 shadow-sm" aria-hidden="true"></span>
              <div>
                <p className="text-xl sm:text-2xl font-semibold text-green-700 dark:text-green-400 mb-2">
                  Available for new projects
                </p>
                <p className="text-green-700 dark:text-green-300 text-base sm:text-lg">
                  I'm currently accepting new freelance projects and full-time opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
