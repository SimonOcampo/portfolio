"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FolderKanban,
  Briefcase,
  FileText,
  Mail,
  type LucideIcon,
} from "lucide-react";

interface DockItem {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  scrollTop?: boolean;
}

const ITEMS: DockItem[] = [
  { label: "Home", href: "#", icon: Home, scrollTop: true },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Resume", href: "/Resume.pdf", icon: FileText, external: true },
  { label: "Contact", href: "#education", icon: Mail },
];

function DockLink({ item }: { item: DockItem }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.scrollTop) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className="relative flex items-center justify-center rounded-full p-2 text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.98 }}
      aria-label={item.label}
    >
      <item.icon className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={1.8} />
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export default function FloatingDock() {
  return (
    <nav
      className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4"
      aria-label="Quick navigation"
    >
      <motion.div
        className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl sm:gap-2 sm:px-5 sm:py-2.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {ITEMS.map((item) => (
          <DockLink key={item.label} item={item} />
        ))}
      </motion.div>
    </nav>
  );
}
