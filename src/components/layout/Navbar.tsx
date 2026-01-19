import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "../shared/SearchBar";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Favorites", path: "/favorites" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div 
        className={`absolute inset-0 -z-10 transition-all duration-300 ${
          isMobileMenuOpen 
            ? "bg-black" 
            : isScrolled 
              ? "bg-black/80 backdrop-blur-md shadow-lg" 
              : "bg-transparent bg-linear-to-b from-black/80 to-transparent"
        }`} 
      />
      <div className="max-w-7xl mx-auto px-4 py-4 gap-2 flex items-center justify-between" ref={searchContainerRef}>
        
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <img src="/src/assets/images/logo.png" alt="Movie App Logo" className="h-8 w-auto object-contain" />
        </Link>
        
        {/* Desktop Menu */}
        {!isMobileSearchOpen && (
           <nav className="hidden flex-1 md:flex items-center gap-8 ml-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Section: Search & Menu */}
        <div className={`flex items-center gap-2 md:gap-4 ${isMobileSearchOpen ? 'flex-1 justify-end ml-4' : ''}`}>
          
          {/* Desktop Search */}
          <div className="hidden md:block w-80">
            <SearchBar />
          </div>

          {/* Mobile Search (Expandable) */}
          <div className={`md:hidden flex items-center justify-end overflow-visible transition-all duration-300 ease-in-out ${isMobileSearchOpen ? 'w-full' : ''}`}>
            {isMobileSearchOpen ? (
              <div className="relative w-full flex items-center gap-2 animate-in slide-in-from-right-10 fade-in duration-300">
                 <SearchBar 
                    className="flex-1" 
                    autoFocus 
                    placeholder="Search..."
                    onSearch={() => {
                      setIsMobileSearchOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                 />
              </div>
            ) : (
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Hamburger Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none shrink-0"
          >
            {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 h-screen bg-black/95 backdrop-blur-xl border-t border-white/10 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-200 hover:text-white hover:font-medium py-2 text-lg font-medium border-b border-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
