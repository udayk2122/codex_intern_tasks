import React, { useState, useCallback, useEffect, useRef } from "react";

// --- Component 1: Random String Generator ---
const Generator = () => {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const passwordRef = useRef(null);

  // Generate password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+[]{}|;:,.<>?";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Copy to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);

    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy"), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="card w-full max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Random String Generator
      </h1>

      {/* Input + Copy button */}
      <div className="flex shadow rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          className="w-full text-lg outline-none px-4 py-2"
          placeholder="Generated String"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className="copy-btn shrink-0">
          {copyButtonText}
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row text-sm gap-y-4 sm:gap-x-4">
        <div className="flex items-center gap-x-2 flex-grow">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer w-full"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="whitespace-nowrap">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

// --- Component 2: Home Page ---
const Home = () => {
  return (
    <div className="text-center text-gray-200">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
      <p className="text-lg text-gray-400">
        Use the navigation to open the Random String Generator.
      </p>
    </div>
  );
};

// --- Component 3: Layout with Navigation ---
const Layout = ({ currentPage, onNavigate, children }) => {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center font-sans p-4 w-full">
      <nav className="w-full max-w-lg mx-auto mb-8">
        <ul className="flex justify-center gap-6 bg-slate-800 px-6 py-3 rounded-xl shadow-lg list-none">
          <li>
            <button
              onClick={() => onNavigate("home")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                currentPage === "home"
                  ? "text-indigo-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigate("generator")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                currentPage === "generator"
                  ? "text-indigo-400 font-bold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Generator
            </button>
          </li>
        </ul>
      </nav>

      <main className="w-full flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

// --- Main App ---
const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const handleNavigate = (page) => setCurrentPage(page);

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {currentPage === "home" && <Home />}
      {currentPage === "generator" && <Generator />}
    </Layout>
  );
};

export default App;

