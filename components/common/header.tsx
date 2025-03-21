"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";


const navigationData = {
  main: [{ name: "Pricing", href: "/pricing" }],
  useCases: [
    {
      name: "💍 Weddings",
      href: "/use-cases/weddings/",
      description: "Discover how we can help with your Weddings needs",
    },
    {
      name: "🏢 Corporate Events",
      href: "/use-cases/corporate-events/",
      description: "Discover how we can help with your Corporate Events needs",
    },
    {
      name: "🎉 Celebrations",
      href: "/use-cases/celebrations",
      description: "Discover how we can help with your Celebrations needs",
    },
  ],
};

// ListItem component for navigation menu
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 py-4 backdrop-blur-md bg-purple-50/50 dark:bg-gray-950/50 border-b border-gray-200/20 dark:border-gray-800/20">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text ml-2 dark:from-purple-400 dark:to-pink-400">
            Shared Memories
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}

      <div className="hidden md:flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Use Cases Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/50 dark:hover:bg-gray-800/50 text-md">
                Use Cases
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] backdrop-blur-md bg-white/80 dark:bg-gray-950/80 rounded-lg">
                  {navigationData.useCases.map((item) => (
                    <ListItem
                      key={item.name}
                      title={item.name}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Main Navigation Items */}
            {navigationData.main.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className="text-md font-medium hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right Side - Auth & Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-3"></div>
    </header>
  );
}
