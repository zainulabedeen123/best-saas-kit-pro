'use client';

import React, { useRef, useState, useEffect } from "react";
import { LiveAPIProvider } from "@/components/gemini/LiveAPIContext";
import { Altair } from "@/components/gemini/altair/Altair";
import ControlTray from "@/components/gemini/control-tray/ControlTray";
import cn from "classnames";

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [apiKey, setApiKey] = useState<string>("");

  // Load the API key from localStorage when the component mounts
  useEffect(() => {
    const storedApiKey = localStorage.getItem("GEMINI_API_KEY");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <LiveAPIProvider url={uri} apiKey={apiKey}>
        <div className="flex flex-col h-[85vh] w-auto bg-[#111111] text-gray-300 rounded-lg">
          <main className="relative flex flex-col items-center justify-center flex-grow gap-4 overflow-hidden">
            <div className="flex flex-1 items-center justify-center">
              <Altair />
              <video
                className={cn("flex-grow max-w-[90%] rounded-2xl", {
                  hidden: !videoRef.current || !videoStream,
                })}
                ref={videoRef}
                autoPlay
                playsInline
              />
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
            >
              {/* put your own buttons here */}
            </ControlTray>
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
}

export default App;