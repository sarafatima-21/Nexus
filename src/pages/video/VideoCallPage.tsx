import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';

export function VideoCallPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const startCall = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
    setStream(mediaStream);
  };

  const endCall = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  const toggleVideo = () => {
    stream?.getVideoTracks().forEach(track => (track.enabled = !videoOn));
    setVideoOn(!videoOn);
  };

  const toggleAudio = () => {
    stream?.getAudioTracks().forEach(track => (track.enabled = !audioOn));
    setAudioOn(!audioOn);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Video Call</h1>

      <video
        ref={videoRef}
        autoPlay
        className="w-full max-w-lg rounded border"
      />

      <div className="flex gap-3">
        <Button onClick={startCall}>Start Call</Button>
        <Button onClick={endCall} variant="secondary">End Call</Button>
        <Button onClick={toggleVideo}>
          {videoOn ? 'Video Off' : 'Video On'}
        </Button>
        <Button onClick={toggleAudio}>
          {audioOn ? 'Mute' : 'Unmute'}
        </Button>
      </div>
    </div>
  );
}