'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../app/lib/AuthProvider';
import { UserDropdown } from './user-dropdown';
import { cn } from '@/lib/utils';
import SearchInput from './search-input';
import NavItem from './nav-item';
import { dashboardUnAuthenticated, dashboardNav } from '@/app/lib/navigation';
import { logout } from '@/app/lib/authHelpers';

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("Filter by");
  const [search, setSearch] = useState("");

   const { session, loading } = useAuth();

   useEffect(() => {
    if (!loading && !session) {
      router.push('/auth/login');
    }
  }, [loading, session, router]);

  const unauthenticatedLinks = (
    <>
      {dashboardUnAuthenticated.map((item) => (
        <NavItem key={item.label} {...item} />
      ))}

      {/* <Link href="/" className="text-gray-700 hover:text-amber-950 text-sm font-medium">
        Features
      </Link>
      <Link href="/" className="text-gray-700 hover:text-amber-950 text-sm font-medium">
        Pricing
      </Link>
      <Link href="/" className="text-gray-700 hover:text-amber-950 text-sm font-medium">
        About Us
      </Link> */}
      <Button
        variant="outline"
        className="hover:cursor-pointer border-black"
        onClick={() => {
          setMenuOpen(false);
          router.push('/auth/login');
        }}
      >
        Sign In
      </Button>
      <Button
        className="bg-amber-950 hover:cursor-pointer text-white"
        onClick={() => {
          setMenuOpen(false);
          router.push('/auth/signup');
        }}
      >
        Sign Up
      </Button>
    </>
  );

  const authenticatedLinks = (
    <>
      <div className="block md:hidden">
          {dashboardNav.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
          <Button
            variant="outline"
            className="w-full hover:cursor-pointer border-black"
            onClick={logout}
          >
          Sign Out
        </Button>
      </div>
      <div className='flex justify-center md:justify-start'>
        <UserDropdown />
     </div>
    </>
  );

  return (
    <header className={cn("w-full shadow-sm relative z-50", !session && "bg-[#F4F2F0]")}>
      <div className={cn("", session ? "px-0" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>
        <div className={cn("flex justify-between items-center", session ? "py-0.2" : "py-4")}>
          <Link href="/" className="flex items-center">
            <Image
              className="hover:cursor-pointer"
              src={"/akinia-logo.png"}
              alt="Akinia Logo"
              width={112}
              height={66}
            />
          </Link>

          {/* Search input */}
          { session && (
          <div className="w-1/3 hidden md:block">
            <SearchInput
              options={["Company", "Investor", "Country"]}
              selected={selected}
              onSelect={setSelected}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </div>
          )}

          {/* Mobile nav */}

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-4 mx-4">
            {session ? authenticatedLinks : unauthenticatedLinks}
          </nav>

          {/* Hamburger icon */}
          <div className={cn("md:hidden flex items-center")}>
            <button onClick={() => setMenuOpen(true)} className="text-gray-800">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <div className={`fixed inset-0 z-40 ${menuOpen ? '' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            menuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Side panel */}
        <div
          className={`absolute top-0 right-0 w-full h-full bg-[#F4F2F0] shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col space-y-4`}
        >
          <div className="flex justify-end">
            <button onClick={() => setMenuOpen(false)} className="text-gray-800">
              <X size={24} />
            </button>
          </div>
          {session ? authenticatedLinks : unauthenticatedLinks}
        </div>
      </div>
    </header>
  );
}
