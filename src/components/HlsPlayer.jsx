import  { useEffect, useRef } from 'react';
import Hls from 'hls.js';

// eslint-disable-next-line react/prop-types
const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({ debug: false });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        // video.muted = false;
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('canplay', () => {
        video.play();
      });
    }
  }, [src]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hls.js demo - basic usage</h1>
      <video height="600" ref={videoRef} controls></video>
    </div>
  );
};

export default HlsPlayer;
