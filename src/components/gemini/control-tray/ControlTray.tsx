import cn from "classnames";
import { memo, ReactNode, RefObject, useEffect, useRef, useState } from "react";
// import ApiKeyModal from "@/components/gemini/apikey-modal/ApiKeyModal"; // Import the modal
import { useLiveAPIContext } from "@/components/gemini/LiveAPIContext";
import { UseMediaStreamResult } from "@/hooks/use-media-stream-mux";
import { useScreenCapture } from "@/hooks/use-screen-capture";
import { useWebcam } from "@/hooks/use-webcam";
import { AudioRecorder } from "@/lib/audio-recorder";
import { FaMicrophone, FaMicrophoneSlash, FaCog } from 'react-icons/fa';
import { HiOutlinePause, HiOutlinePlay  } from "react-icons/hi2";
import { LuScreenShare, LuScreenShareOff  } from "react-icons/lu";
import { IoVideocamOutline, IoVideocamOffOutline  } from "react-icons/io5";
import { useRouter } from "next/navigation";

export type ControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement>;
  children?: ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
};

// type MediaStreamButtonProps = {
//   isStreaming: boolean;
//   start: () => Promise<any>;
//   stop: () => any;
// };

type MediaStreamButtonProps = {
  isStreaming: boolean;
  start: () => Promise<any>;
  stop: () => any;
  icon: ReactNode; // New prop for the icon
};

const MediaStreamButton = memo(
  ({ isStreaming, start, stop, icon }: MediaStreamButtonProps) => (
    <button
      className="flex items-center justify-center bg-transparent text-gray-600 text-2xl rounded-full w-12 h-12 transition duration-200 hover:bg-gray-300"
      onClick={isStreaming ? stop : start}
    >
      {isStreaming ? <IoVideocamOffOutline /> : icon}
    </button>
  ),
);

MediaStreamButton.displayName = "MediaStreamButton";

function ControlTray({
  videoRef,
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
}: ControlTrayProps) {
  const videoStreams = [useWebcam(), useScreenCapture()];
  const [activeVideoStream, setActiveVideoStream] = useState<MediaStream | null>(null);
  const [webcam, screenCapture] = videoStreams;
  const [inVolume, setInVolume] = useState(0);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const renderCanvasRef = useRef<HTMLCanvasElement>(null);
  const connectButtonRef = useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { client, connected, connect, disconnect, volume } = useLiveAPIContext();

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([{ mimeType: "audio/pcm;rate=16000", data: base64 }]);
    };
    if (connected && !muted && audioRecorder) {
      audioRecorder.on("data", onData).on("volume", setInVolume).start();
    } else {
      audioRecorder.stop();
    }
    return () => {
      audioRecorder.off("data", onData).off("volume", setInVolume);
    };
  }, [connected, client, muted, audioRecorder]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = activeVideoStream;
    }

    let timeoutId = -1;

    function sendVideoFrame() {
      const video = videoRef.current;
      const canvas = renderCanvasRef.current;

      if (!video || !canvas) {
        return;
      }

      const ctx = canvas.getContext("2d")!;
      canvas.width = video.videoWidth * 0.25;
      canvas.height = video.videoHeight * 0.25;
      if (canvas.width + canvas.height > 0) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg", 1.0);
        const data = base64.slice(base64.indexOf(",") + 1, Infinity);
        client.sendRealtimeInput([{ mimeType: "image/jpeg", data }]);
      }
      if (connected) {
        timeoutId = window.setTimeout(sendVideoFrame, 1000 / 0.5);
      }
    }
    if (connected && activeVideoStream !== null) {
      requestAnimationFrame(sendVideoFrame);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [connected, activeVideoStream, client, videoRef]);

  const changeStreams = (next?: UseMediaStreamResult) => async () => {
    if (next) {
      const mediaStream = await next.start();
      setActiveVideoStream(mediaStream);
      onVideoStreamChange(mediaStream);
    } else {
      setActiveVideoStream(null);
      onVideoStreamChange(null);
    }

    videoStreams.filter((msr) => msr !== next).forEach((msr) => msr.stop());
  };

  const handleSaveApiKey = (apiKey: string) => {
    localStorage.setItem("GEMINI_API_KEY", apiKey);
    alert("API Key saved successfully!");
  };

  return (
    <section className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center gap-2 pb-4">
      <canvas style={{ display: "none" }} ref={renderCanvasRef} />
      <nav className={cn("flex gap-3 p-1 bg-transparent rounded-full border border-white", { 'opacity-100': !connected })}>
        <button
          className="flex items-center justify-center bg-red-900 text-white text-2xl rounded-full w-12 h-12 transition duration-200 hover:bg-red-400"
          onClick={() => setMuted(!muted)}
        >
          {!muted ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>

        {supportsVideo && (
          <>
            <MediaStreamButton
              isStreaming={screenCapture.isStreaming}
              start={changeStreams(screenCapture)}
              stop={changeStreams()}
              icon={screenCapture.isStreaming ? <LuScreenShareOff /> : <LuScreenShare />} // Screen share icons
            />
            <MediaStreamButton
              isStreaming={webcam.isStreaming}
              start={changeStreams(webcam)}
              stop={changeStreams()}
              icon={webcam.isStreaming ? <IoVideocamOffOutline /> : <IoVideocamOutline />} // Webcam icons
            />
          </>
        )}
        {children}
      </nav>

      <div className={cn("flex flex-col items-center", { 'opacity-100': !connected })}>
        <div className="flex items-center justify-center bg-transparent rounded-full border border-none">
          <button
            ref={connectButtonRef}
            className={cn("flex items-center justify-center text-2xl rounded-full w-12 h-12 transition duration-200", { 'bg-transparent text-white border border-white': connected, 'bg-transparent border border-white text-white': !connected })}
            onClick={connected ? disconnect : connect}
          >
            <span>{connected ? <HiOutlinePause /> : <HiOutlinePlay />}</span>
          </button>
        </div>
        <span className="text-sm text-blue-500 hidden">Streaming</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center bg-transparent rounded-full border border-white">
          <button className="flex items-center justify-center text-2xl rounded-full w-12 h-12 transition duration-200 text-white" onClick={() => router.push("/dashboard/settings")}>
            <FaCog />
          </button>
        </div>
        <span className="text-sm text-blue-500 hidden">Settings</span>
      </div>

      <section className="control-tray-apikey">
        {/* <ApiKeyModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={handleSaveApiKey} /> */}
      </section>
    </section>
  );
}

export default memo(ControlTray);
ControlTray.displayName = "ControlTray";