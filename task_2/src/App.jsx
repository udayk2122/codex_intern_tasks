import { useState, useCallback, useEffect, useRef } from 'react';
import { ShieldCheck, Clipboard, ClipboardCheck, User, Mail, Linkedin } from 'lucide-react';

// Reminder: If you haven't already, install the icon library
// npm install lucide-react

// --- Section Components ---

const StringGenerator = () => {
  const [length, setLength] = useState(16);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (uppercaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+[]{}|;:',.<>?/~`";
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
    setCopied(false);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);
  }, [length, numberAllowed, charAllowed, uppercaseAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, uppercaseAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-lg mx-auto shadow-2xl rounded-2xl p-6 md:p-8 bg-gray-800 text-white animate-fade-in-down">
      <h1 className="text-3xl font-bold text-center mb-6">String Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          className={`outline-none w-full py-3 px-4 bg-gray-900 text-lg transition-colors duration-700 ${isAnimating ? 'animate-pulse-bg' : ''}`}
          placeholder="Generated String"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none px-4 py-2 text-white font-semibold transition-all duration-300 transform active:scale-95 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          {copied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="flex flex-col text-sm gap-y-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer w-full accent-blue-500"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="font-medium whitespace-nowrap">Length: {length}</label>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-x-2">
            <input type="checkbox" id="uppercaseInput" checked={uppercaseAllowed} onChange={() => setUppercaseAllowed(prev => !prev)} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 cursor-pointer" />
            <label htmlFor="uppercaseInput" className="cursor-pointer select-none">Uppercase</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" id="numberInput" checked={numberAllowed} onChange={() => setNumberAllowed(prev => !prev)} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 cursor-pointer" />
            <label htmlFor="numberInput" className="cursor-pointer select-none">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" id="characterInput" checked={charAllowed} onChange={() => setCharAllowed(prev => !prev)} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 cursor-pointer" />
            <label htmlFor="characterInput" className="cursor-pointer select-none">Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ABOUT ME SECTION (Personalized) ---
const AboutSection = () => (
  <div className="w-full max-w-lg mx-auto shadow-2xl rounded-2xl p-6 md:p-8 bg-gray-800 text-white animate-fade-in-down">
    <h1 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3"><User /> About Me</h1>
    <div className="text-gray-300 space-y-4">
      <p>
        My name is <strong>Avula Uday Kiran</strong>, and I am a passionate front-end developer based in India. I love building intuitive and dynamic user interfaces.
      </p>
      <p>
        This "Stringify" application is a personal project to showcase my skills in modern web technologies like <strong>React</strong> and <strong>Tailwind CSS</strong>. My goal is to create tools that are not only functional but also provide a great user experience.
      </p>
    </div>
  </div>
);

// --- CONTACT SECTION (Personalized) ---
const ContactSection = () => (
  <div className="w-full max-w-lg mx-auto shadow-2xl rounded-2xl p-6 md:p-8 bg-gray-800 text-white animate-fade-in-down">
    <h1 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3"><Mail /> Get in Touch</h1>
    <div className="text-gray-300 space-y-6 text-center">
      <p>
        I'd love to connect! You can find me on LinkedIn or send me an email directly. I'm always open to discussing new projects, creative ideas, or opportunities.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a 
          href="https://www.linkedin.com/in/udaykiran3010/" // <-- YOUR LINKEDIN URL
          target="_blank" 
          rel="noopener noreferrer"
          className="flex w-full sm:w-auto justify-center items-center gap-2 font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          <Linkedin size={20} /> LinkedIn
        </a>
        <a 
          href="mailto:avulauday0301@gmail.com" // <-- YOUR EMAIL ADDRESS
          className="flex w-full sm:w-auto justify-center items-center gap-2 font-medium text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          <Mail size={20} /> Email
        </a>
      </div>
    </div>
  </div>
);


// --- Main App Component ---
function App() {
  const [activeView, setActiveView] = useState('home');

  const NavLink = ({ viewName, children }) => {
    const isActive = activeView === viewName;
    return (
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveView(viewName); }}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
      >
        {children}
      </a>
    );
  };

  return (
    <>
      <nav className="bg-gray-800/50 backdrop-blur-sm shadow-lg w-full fixed top-0 left-0 z-10 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ShieldCheck className="h-8 w-8 text-blue-400" />
              <span className="ml-3 text-2xl font-bold text-white">Stringify</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink viewName="home">Home</NavLink>
                <NavLink viewName="about">About</NavLink>
                <NavLink viewName="contact">Contact</NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center min-h-screen font-sans pt-20 pb-4 px-4">
        {activeView === 'home' && <StringGenerator />}
        {activeView === 'about' && <AboutSection />}
        {activeView === 'contact' && <ContactSection />}
      </main>
    </>
  );
}

export default App;