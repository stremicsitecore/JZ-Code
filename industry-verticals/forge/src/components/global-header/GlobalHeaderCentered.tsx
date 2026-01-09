'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import type { GlobalHeaderProps } from './global-header.props';
import { Button } from '@/components/ui/button';
import { useMatchMedia } from '@/hooks/use-match-media';

const NAV_ITEMS = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Villas', href: '/villas' },
  { label: 'Private Homes', href: '/private-homes' },
  { label: 'Stories', href: '/stories' },
];

export const GlobalHeaderCentered: React.FC<GlobalHeaderProps> = (props) => {
  const { fields, isPageEditing } = props ?? {};
  const { logo } = fields?.data?.item ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const [sheetAnimationComplete, setSheetAnimationComplete] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const isReducedMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
  const navRef = useRef<HTMLDivElement>(null);
  // Reset sheet animation state when sheet closes
  useEffect(() => {
    if (!isOpen) {
      setSheetAnimationComplete(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY < prevScrollY) {
        setVisible(true);
      } else if (currentScrollY > 10 && currentScrollY > prevScrollY) {
        setVisible(false);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  // Sheet animation duration in seconds
  const sheetAnimationDuration = isReducedMotion ? 0 : 0.3;

  return (
    <AnimatePresence mode="wait" data-component="GlobalHeader">
      <motion.header
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: isReducedMotion ? 0 : 0.2 }}
        className={cn(
          '@container sticky top-0 z-50 flex w-full flex-col items-center justify-center bg-transparent py-6'
        )}
      >
        {/* Centered Logo */}
        <div className="mb-4 flex items-center justify-center">
          {!isPageEditing ? (
            <Link href="/" className="flex items-center justify-center">
              {logo?.jsonValue ? (
                <ImageWrapper
                  image={logo?.jsonValue}
                  className="h-auto w-[180px] object-contain"
                  sizes="180px"
                  alt="Home"
                />
              ) : (
                <span className="font-serif text-4xl italic tracking-wide text-foreground">
                  One&amp;Only
                </span>
              )}
            </Link>
          ) : logo?.jsonValue ? (
            <ImageWrapper
              image={logo?.jsonValue}
              className="h-auto w-[180px] object-contain"
              sizes="180px"
              alt="Home"
            />
          ) : (
            <span className="font-serif text-4xl italic tracking-wide text-foreground">
              One&amp;Only
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="@lg:flex hidden" ref={navRef}>
          <ul className="flex items-center gap-2">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.label} className="flex items-center">
                <Link
                  href={item.href}
                  className="px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
                {index < NAV_ITEMS.length - 1 && (
                  <span className="text-foreground/40">•</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile Navigation */}
        <div className="@lg:hidden absolute right-4 top-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-background/30 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                />
              )}
            </AnimatePresence>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent [&_svg]:size-8">
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="h-[100dvh] border-t-0 bg-background/60 p-0 backdrop-blur-md [&>button_svg]:size-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  duration: sheetAnimationDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onAnimationComplete={() => setSheetAnimationComplete(true)}
                className="my-12 flex h-full w-full flex-col p-6"
              >
                <AnimatePresence>
                  {sheetAnimationComplete && (
                    <motion.nav
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col space-y-4"
                    >
                      {NAV_ITEMS.map((item, index) => (
                        <motion.div
                          key={`${item.label}-mobile`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.05 * index,
                            duration: isReducedMotion ? 0 : 0.3,
                          }}
                          className="flex justify-center"
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.nav>
                  )}
                </AnimatePresence>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};