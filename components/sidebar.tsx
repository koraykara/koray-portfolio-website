"use client"

import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { site } from "@/lib/site"

const socialLinks = [
	{ href: site.links.github, label: "GitHub", icon: Github },
	{ href: site.links.linkedin, label: "LinkedIn", icon: Linkedin },
	{ href: site.links.instagram, label: "Instagram", icon: Instagram },
	{ href: `mailto:${site.email}`, label: "Email", icon: Mail },
]

export function Sidebar() {
	return (
		<TooltipProvider>
			{/* Sidebar: Hidden on mobile, visible on md+ */}
			<aside aria-label="Social links" className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 z-50 flex-col">
				{/* Logo/Brand */}
				<div className="flex items-center justify-center h-20 border-b border-gray-200/50 dark:border-gray-700/50">
					<Link href="/" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center motion-safe:hover:scale-105 transition-transform duration-200" aria-label="Koray Kara, home">
						<span className="text-white font-bold text-sm" aria-hidden>KK</span>
					</Link>
				</div>

				{/* Spacer */}
				<div className="flex-1"></div>

				{/* Social Links */}
				<div className="px-3 py-8">
					<div className="space-y-4">
						{socialLinks.map((link) => {
							const IconComponent = link.icon
							return (
								<Tooltip key={link.href} delayDuration={0}>
									<TooltipTrigger asChild>
										<a
											href={link.href}
											target={link.href.startsWith("mailto:") ? undefined : "_blank"}
											rel="noopener noreferrer"
											aria-label={link.label}
											className="flex items-center justify-center w-full h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
										>
											<IconComponent className="h-5 w-5 motion-safe:group-hover:scale-110 transition-transform duration-200" aria-hidden />
										</a>
									</TooltipTrigger>
									<TooltipContent side="right" className="ml-2">
										<p>{link.label}</p>
									</TooltipContent>
								</Tooltip>
							)
						})}
					</div>
				</div>
			</aside>

			{/* Bottom bar for mobile */}
			<nav aria-label="Social links" className="fixed md:hidden bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 flex justify-around py-2">
				{socialLinks.map((link) => {
					const IconComponent = link.icon
					return (
						<a
							key={link.href}
							href={link.href}
							target={link.href.startsWith("mailto:") ? undefined : "_blank"}
							rel="noopener noreferrer"
							className="flex min-w-[56px] flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
						>
							<IconComponent className="h-6 w-6" aria-hidden />
							<span className="text-[10px] mt-1">{link.label}</span>
						</a>
					)
				})}
			</nav>
		</TooltipProvider>
	)
}
