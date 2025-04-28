
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-fraud-blue text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="text-lg font-bold">FraudGuard</span>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              AI-powered credit card fraud detection web application for bank staff and analysts.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/chatbot" className="text-sm text-gray-300 hover:text-white transition-colors">
                Chatbot
              </Link>
            </div>
          </div>
          
          {/* Resources */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="flex flex-col space-y-2">
              <a 
                href="https://www.kaggle.com/datasets/ealaxi/paysim1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                PaySim Dataset
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} FraudGuard. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
