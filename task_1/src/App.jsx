// src/App.jsx
import { useState } from 'react';
import countries from './countries';

const App = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('en-US');
  const [toLang, setToLang] = useState('hi-IN');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!fromText) return;
    setLoading(true);
    setToText('Translating...');
    try {
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${fromLang}|${toLang}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.responseData) {
        setToText(data.responseData.translatedText);
      } else {
        setToText('Translation failed');
      }
    } catch (error) {
      setToText('Error: Could not connect to the translation service.');
      console.error('Translation error:', error);
    }
    setLoading(false);
  };

  const handleCopy = (text) => {
    if (!text || text === 'Translating...' || text.startsWith('Error')) return;
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleSpeak = (text, lang) => {
    if (!text || text === 'Translating...' || text.startsWith('Error')) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const handleSwap = () => {
    // Swap text
    setFromText(toText);
    setToText(fromText);
    // Swap languages
    setFromLang(toLang);
    setToLang(fromLang);
  };

  const Icon = ({ children, onClick, tooltip }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
      >
        {children}
      </button>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {tooltip}
      </span>
    </div>
  );
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">Text Translator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Text Area */}
          <div className="relative">
            <textarea
              className="w-full h-48 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter text..."
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
            />
            <div className="absolute bottom-4 left-4 flex items-center space-x-3">
              <Icon onClick={() => handleSpeak(fromText, fromLang)} tooltip="Speak">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              </Icon>
              <Icon onClick={() => handleCopy(fromText)} tooltip="Copy">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </Icon>
            </div>
          </div>

          {/* Output Text Area */}
          <div className="relative">
            <textarea
              className="w-full h-48 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Translation"
              value={toText}
              readOnly
              disabled
            />
             <div className="absolute bottom-4 left-4 flex items-center space-x-3">
              <Icon onClick={() => handleSpeak(toText, toLang)} tooltip="Speak">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              </Icon>
              <Icon onClick={() => handleCopy(toText)} tooltip="Copy">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </Icon>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full">
            <span className="text-gray-500 dark:text-gray-300 font-medium">From:</span>
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="flex-grow p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <button onClick={handleSwap} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </button>
          
          <div className="flex items-center gap-2 w-full">
            <span className="text-gray-500 dark:text-gray-300 font-medium">To:</span>
            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="flex-grow p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Translating...' : 'Translate Text'}
        </button>
      </div>
    </div>
  );
};

export default App;