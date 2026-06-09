import { AlertCircle, Pause, Play, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

export function AudioSegmentPlayer({ file, label }: { file: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch {
      setFailed(true);
    }
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={file}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      <button aria-label={playing ? "暂停音频" : "播放音频"} onClick={toggle}>
        {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
      </button>
      <div>
        <strong>{label}</strong>
        <div className="audio-wave"><i /></div>
        <small>完整真题音频 · 可自由暂停与继续</small>
      </div>
      {failed ? (
        <button className="audio-retry" onClick={() => { setFailed(false); audioRef.current?.load(); }}>
          <RotateCcw size={15} /> 重试
        </button>
      ) : <AlertCircle aria-label="使用耳机效果更佳" size={18} />}
    </div>
  );
}

