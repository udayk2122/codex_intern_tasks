import React, { useState, useCallback } from 'react';

// Main App Component
const App = () => {
  // --- STATE MANAGEMENT ---
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('fr'); // Default to French
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- LANGUAGE OPTIONS ---
  const languages = [
    { code: 'ar', name: 'Arabic' }, { code: 'zh', name: 'Chinese' },
    { code: 'en', name: 'English' }, { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' }, { code: 'hi', name: 'Hindi' },
    { code: 'it', name: 'Italian' }, { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' }, { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' }, { code: 'es', name: 'Spanish' },
    { code: 'tr', name: 'Turkish' },
  ];

  // --- API TRANSLATION LOGIC ---
  const translateText = useCallback(async () => {
    setTranslatedText('');
    setError(null);
    setIsLoading(true);

    if (!inputText.trim()) {
      setIsLoading(false);
      setError("Please enter some text to translate.");
      return;
    }

    const url = 'https://lingvanex-translate.p.rapidapi.com/translate';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'YOUR_API_KEY_HERE', // <-- IMPORTANT: Replace with your actual key
        'X-RapidAPI-Host': 'lingvanex-translate.p.rapidapi.com'
      },
      body: JSON.stringify({ from: 'en_US', to: targetLanguage, text: inputText })
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.result) {
        setTranslatedText(result.result);
      } else {
        throw new Error("Translation failed. The API may have returned an unexpected format.");
      }
    } catch (err) {
      console.error("Translation Error:", err);
      setError(err.message || "An unexpected error occurred. Please check your API key and network.");
    } finally {
      setIsLoading(false);
    }
  }, [inputText, targetLanguage]);

  // --- RENDER COMPONENT ---
  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Text Translator</h1>
          <p className="text-slate-400 mt-2">Translate English to your favorite language instantly.</p>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <textarea
            className="w-full h-36 p-4 bg-slate-700 text-white rounded-lg border-2 border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition duration-300 resize-none"
            placeholder="Enter English text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          {/* Language Selector and Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              className="w-full sm:w-auto flex-grow p-3 bg-slate-700 text-white rounded-lg border-2 border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition duration-300"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={translateText}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Translating...</span>
                </div>
              ) : 'Translate'}
            </button>
          </div>
        </div>

        {/* Output Area */}
        {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg animate-pulse">{error}</div>}
        
        {(translatedText || isLoading) && !error && (
           <div className="space-y-2">
             <h3 className="text-lg font-semibold text-slate-300">Translated Text:</h3>
             <div className="w-full min-h-[9rem] p-4 bg-slate-900 text-white rounded-lg border-2 border-slate-700">
                {isLoading ? <div className="text-slate-400">Waiting for translation...</div> : translatedText}
             </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default App;

