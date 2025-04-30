
import { GithubIcon, BookOpen, MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-serif font-bold">Titanic Data Wizard Guide</h3>
            <p className="text-gray-400 text-sm mt-1">A comprehensive tutorial for the Titanic dataset</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-vintage-gold transition-colors flex items-center gap-2">
              <BookOpen size={18} />
              <span className="text-sm">Resources</span>
            </a>
            <a href="#" className="hover:text-vintage-gold transition-colors flex items-center gap-2">
              <GithubIcon size={18} />
              <span className="text-sm">GitHub</span>
            </a>
            <a href="#" className="hover:text-vintage-gold transition-colors flex items-center gap-2">
              <MailIcon size={18} />
              <span className="text-sm">Contact</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Titanic Data Wizard Guide. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
