
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on the main routes for active state styling
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
      }`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <Shield className="h-8 w-8 text-fraud-blue" />
          <span className="text-xl font-bold text-fraud-blue">FraudGuard</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`transition-all duration-300 hover:text-fraud-success ${
              isActive("/") 
                ? "text-fraud-blue font-medium border-b-2 border-fraud-blue" 
                : "text-gray-600"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`transition-all duration-300 hover:text-fraud-success ${
              isActive("/about") 
                ? "text-fraud-blue font-medium border-b-2 border-fraud-blue" 
                : "text-gray-600"
            }`}
          >
            About
          </Link>
          <Link 
            to="/chatbot" 
            className={`transition-all duration-300 hover:text-fraud-success ${
              isActive("/chatbot") 
                ? "text-fraud-blue font-medium border-b-2 border-fraud-blue" 
                : "text-gray-600"
            }`}
          >
            Chatbot
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex">
          <Button variant="outline" className="px-3">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
