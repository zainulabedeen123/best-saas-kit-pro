// 'use client';

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Import from next/navigation

// const ApiKeyManager: React.FC = () => {
//   const [apiKeyInput, setApiKeyInput] = useState<string>("");
//   const router = useRouter(); // Use the updated hook for App Router

//   useEffect(() => {
//     // Load the API key from localStorage when the page loads
//     const storedApiKey = localStorage.getItem("GEMINI_API_KEY");
//     if (storedApiKey) {
//       setApiKeyInput(storedApiKey);
//     }
//   }, []);

//   const handleSaveApiKey = () => {
//     localStorage.setItem("GEMINI_API_KEY", apiKeyInput);
//     alert("API key saved successfully!");
//     router.push("/"); // Navigate to the main page
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-2xl font-bold mb-4">Manage API Key</h1>
//       <input
//         type="text"
//         value={apiKeyInput}
//         onChange={(e) => setApiKeyInput(e.target.value)}
//         placeholder="Enter your API key"
//         className="w-96 px-4 py-2 mb-4 border rounded-md bg-gray-800 text-white border-gray-600"
//       />
//       <button
//         onClick={handleSaveApiKey}
//         className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//       >
//         Save API Key
//       </button>
//     </div>
//   );
// };

// export default ApiKeyManager;

'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use the App Router's navigation

const ApiKeyManager: React.FC = () => {
  const [apiKeyInput, setApiKeyInput] = useState<string>(""); // Initialize state
  const router = useRouter();

  useEffect(() => {
    // Load the API key from localStorage only on the client
    if (typeof window !== "undefined") {
      const storedApiKey = localStorage.getItem("GEMINI_API_KEY");
      if (storedApiKey) {
        setApiKeyInput(storedApiKey);
      }
    }
  }, []);

  const handleSaveApiKey = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("GEMINI_API_KEY", apiKeyInput);
      alert("API key saved successfully!");
      router.push("/dashboard/settings"); // Navigate to the main page
    }
  };

  return (
    <>
    <h1 className="text-2xl font-bold mb-4">Manage API Key</h1>
    <div className="w-full items-center justify-center min-h-screen bg-[#111111] text-white rounded-lg p-4">
    <p className="font-semibold p-2">Enter your Gamini API key:</p>
    <p className="text-sm p-2">API is saved to local storage so don't worry 😅</p>
    <div className="flex flex-row gap-4 w-full items-baseline justify-center min-h-screen bg-[#111111] text-white rounded-lg p-2">
      <input
        type="text"
        value={apiKeyInput}
        onChange={(e) => setApiKeyInput(e.target.value)}
        placeholder="Enter your API key"
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFBE1A] focus:border-transparent"
      />
      <button
        onClick={handleSaveApiKey}
        className="bg-[#FFBE1A] text-[#111111] font-semibold px-4 py-2 rounded-lg hover:bg-[#FFBE1A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[#FFBE1A] hover:bg-[#FFBE1A]/90"
      >
        Save API Key
      </button>
    </div>
    </div>
    </>
  );
};

export default ApiKeyManager;