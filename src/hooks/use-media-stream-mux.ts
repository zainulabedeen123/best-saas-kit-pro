export type UseMediaStreamResult = {
    type: "webcam" | "screen";
    start: () => Promise<MediaStream>;
    stop: () => void;
    isStreaming: boolean;
    stream: MediaStream | null;
  };