import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Camera } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { AuthSession } from '@/types';
import AvatarNav from './avatar-nav';

const navigationData = {
  main: [{ name: 'Pricing', href: '/pricing' }],
  useCases: [
    {
      name: '💍 Weddings',
      href: '/use-cases/weddings/',
      description: 'Discover how we can help with your Weddings needs',
    },
    {
      name: '🏢 Corporate Events',
      href: '/use-cases/corporate-events/',
      description: 'Discover how we can help with your Corporate Events needs',
    },
    {
      name: '🎉 Celebrations',
      href: '/use-cases/celebrations',
      description: 'Discover how we can help with your Celebrations needs',
    },
  ],
};

// ListItem component for navigation menu
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function Header({ session }: { session: AuthSession | null }) {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200/20 bg-purple-50/50 px-4 py-4 backdrop-blur-md sm:px-6 dark:border-gray-800/20 dark:bg-gray-950/50">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Camera className="h-6 w-6 text-purple-600 sm:h-8 sm:w-8 dark:text-purple-400" />
          <span className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-lg font-bold text-transparent sm:text-2xl dark:from-purple-400 dark:to-pink-400">
            Shared Memories
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}

      {session && (
        <div className="hidden items-center gap-4 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Use Cases Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-md bg-transparent hover:bg-white/50 dark:hover:bg-gray-800/50">
                  Use Cases
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 rounded-lg bg-white/80 p-4 backdrop-blur-md md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-gray-950/80">
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
      )}
      {/* Right Side - Auth & Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {session && <AvatarNav user={session.user} />}
      </div>
    </header>
  );
}
