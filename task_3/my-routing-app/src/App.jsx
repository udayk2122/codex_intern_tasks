import React, { useState, useEffect } from 'react';
import { Home, Info, Mail, Menu, X } from 'lucide-react';

// Main App Component
export default function App() {
  // State to manage the current page/route. 'home' is the default.
  const [page, setPage] = useState('home');
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // A simple router function to render the correct page component
  const renderPage = () => {
    switch (page) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  // Effect to handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || 'home';
      setPage(path);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial page based on URL path
    const initialPath = window.location.pathname.slice(1) || 'home';
    setPage(initialPath);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Function to handle navigation
  const navigate = (newPage) => {
    setPage(newPage);
    // Update the browser URL without a full page reload
    window.history.pushState(null, '', `/${newPage === 'home' ? '' : newPage}`);
    setIsMenuOpen(false); // Close menu on navigation
  };

  // Navigation link component for cleaner code
  const NavLink = ({ pageName, icon, children }) => {
    const isActive = page === pageName;
    return (
      <button
        onClick={() => navigate(pageName)}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          isActive
            ? 'bg-gray-800 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        {icon}
        <span className="ml-3">{children}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-indigo-400">MyApp</span>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:space-x-4">
              <NavLink pageName="home" icon={<Home size={18} />}>Home</NavLink>
              <NavLink pageName="about" icon={<Info size={18} />}>About</NavLink>
              <NavLink pageName="contact" icon={<Mail size={18} />}>Contact</NavLink>
            </nav>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink pageName="home" icon={<Home size={18} />}>Home</NavLink>
            <NavLink pageName="about" icon={<Info size={18} />}>About</NavLink>
            <NavLink pageName="contact" icon={<Mail size={18} />}>Contact</NavLink>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 min-h-[60vh] flex items-center justify-center">
             {/* The current page is rendered here */}
             {renderPage()}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800/50 mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Client-Side Routing Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// A simple template for page content
const PageContent = ({ title, children }) => (
  <div className="text-center">
    <h1 className="text-4xl font-bold tracking-tight text-indigo-400 sm:text-5xl lg:text-6xl mb-4">{title}</h1>
    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">{children}</p>
  </div>
);

// Home Page Component
const HomePage = () => (
  <PageContent title="Welcome Home">
    This is the main landing page of our application. You can navigate to other sections using the links in the header. This entire experience is rendered on the client-side without full page reloads.
  </PageContent>
);

// About Page Component
const AboutPage = () => (
  <PageContent title="About Us">
    We are a demonstration of how client-side routing works in a React application. By using component state, we can swap out content dynamically to create a seamless, app-like experience in the browser.
  </PageContent>
);

// Contact Page Component
const ContactPage = () => (
  <PageContent title="Get In Touch">
    This is the contact page. While this is just a demo, in a real application, you might find a contact form or our contact details here. Feel free to explore the code to see how this page was rendered.
  </PageContent>
);

