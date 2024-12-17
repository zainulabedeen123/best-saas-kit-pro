'use client';

import React, { useState, useEffect } from "react";

interface ApiKeyManagerProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeyChange }) => {
  const [apiKeyInput, setApiKeyInput] = useState<string>("");

  useEffect(() => {
    // Load the API key from localStorage when the component mounts
    const storedApiKey = localStorage.getItem("GEMINI_API_KEY");
    if (storedApiKey) {
      setApiKeyInput(storedApiKey);
      onApiKeyChange(storedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    localStorage.setItem("GEMINI_API_KEY", apiKeyInput);
    onApiKeyChange(apiKeyInput);
    alert("API key saved successfully!");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border border-gray-600 rounded-md">
      <input
        type="text"
        value={apiKeyInput}
        onChange={(e) => setApiKeyInput(e.target.value)}
        placeholder="Enter your API key"
        className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white border-gray-600"
      />
      <button
        onClick={handleSaveApiKey}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Save API Key
      </button>
    </div>
  );
};

export default ApiKeyManager;