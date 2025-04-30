
import { Anchor } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-ocean-700 to-ocean-900 text-white py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Anchor className="h-8 w-8 text-vintage-gold" />
          <h1 className="text-2xl md:text-3xl font-serif font-bold">
            Titanic Data Wizard Guide
          </h1>
        </div>
        <div className="hidden md:block">
          <p className="text-ocean-100 italic">
            Cleaning & Feature Engineering Tutorial
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
