import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export function NavigationMenu() {
  return (
    <nav className="hidden md:flex items-center justify-between gap-3 p-4 font-mono">
      <ul className="flex gap-4">
        <li className="group">
          <Link href="/">Home</Link>
          <div className="bg-teal-500 h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
        <li className="group">
          <Link href="/about">About</Link>
          <div className="bg-teal-500 h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
        <li className="group">
          <Link href="/contact">Contact</Link>
          <div className="bg-teal-500 h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
        <li className="group">
          <Link href="/projects">Projects</Link>
          <div className="bg-teal-500 h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
        <li className="group">
          <Link href="/activity">Activity</Link>
          <div className="bg-teal-500 h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
        <li className="group">
          <Link href="cv">CV</Link>
          <div className="bg-teal-500 h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
      </ul>
      <ModeToggle />
    </nav>
  )
}