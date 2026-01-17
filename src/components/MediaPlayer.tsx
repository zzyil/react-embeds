import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ExitFullscreenIcon,
  FullscreenIcon,
  PauseIcon,
  PipIcon,
  PlayIcon,
  SettingsIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMutedIcon
} from "./Icons";

/**
 * Props for the MediaPlayer component.
 */
export type MediaPlayerProps = {
  /** Source URL for the video (supports MP4, HLS .m3u8, DASH .mpd) */
  src: string;
  /** Poster image URL to show before playback */
  poster?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Whether to autoplay the video */
  autoPlay?: boolean;
  /** Available quality options for manual quality switching */
  qualities?: { label: string; src: string; }[];
  /** Callback when quality is changed */
  onQualityChange?: (quality: { label: string; src: string; }) => void;
};

const palette = {
  red: "#f00",
  text: "#fff",
  rail: "rgba(255,255,255,0.2)",
  buffer: "rgba(255,255,255,0.4)"
};

// Helper to detect streaming format from URL
function getStreamingType(url: string): "dash" | "hls" | "native" {
  const lowerUrl = url.toLowerCase();
  // Check for DASH manifest URLs
  if (lowerUrl.includes(".mpd") || lowerUrl.includes("/live-dash/") || lowerUrl.includes("/dash-abr")) {
    return "dash";
  }
  // Check for HLS manifest URLs
  if (lowerUrl.includes(".m3u8") || lowerUrl.includes("/hls/")) {
    return "hls";
  }
  return "native";
}

/**
 * Custom video player with support for native video, HLS, and DASH streaming.
 * Provides a consistent UI with playback controls, volume, quality selection,
 * fullscreen, and picture-in-picture support.
 *
 * @param props - Player configuration
 * @returns Video player element with custom controls
 *
 * @example
 * ```tsx
 * <MediaPlayer
 *   src="https://example.com/video.m3u8"
 *   poster="https://example.com/poster.jpg"
 *   autoPlay={false}
 * />
 * ```
 *
 * @remarks
 * - HLS playback requires the `hls.js` peer dependency
 * - DASH playback requires the `dashjs` peer dependency
 * - Both are loaded dynamically and are optional
 */
export function MediaPlayer(props: MediaPlayerProps): JSX.Element {
  const { src, poster, alt, autoPlay } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dashPlayerRef = useRef<any>(null);
  const hlsPlayerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoRatio, setVideoRatio] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [hlsLevels, setHlsLevels] = useState<{ height: number; index: number; }[]>([]);
  const [hlsCurrentLevel, setHlsCurrentLevel] = useState(-1);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const speedSteps = [0.75, 1, 1.25, 1.5, 2];
  const showControls = !isPlaying || showSettings || isCoarsePointer;
  const volumePercent = Math.round((muted ? 0 : volume) * 100);

  const streamingType = useMemo(() => getStreamingType(src), [src]);
  const durationLabel = useMemo(() => isLive ? "LIVE" : formatTime(duration), [duration, isLive]);
  const positionLabel = useMemo(() => formatTime((progress / 100) * duration), [
    progress,
    duration
  ]);

  // Initialize DASH player or native video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const background = backgroundRef.current;
    if (background) {
      background.muted = true;
      background.loop = true;
      background.playsInline = true;
    }

    // Determine if we are switching qualities for the same content
    let restoreState: { currentTime: number; isPlaying: boolean } | null = null;

    if (dashPlayerRef.current?.savedState) {
      restoreState = dashPlayerRef.current.savedState;
    } else if ((video as any)._savedState) {
      restoreState = (video as any)._savedState;
    }

    // Cleanup previous DASH player if exists
    if (dashPlayerRef.current) {
      dashPlayerRef.current.destroy();
      dashPlayerRef.current = null;
    }

    // Clear saved state from element to prevent accidental restores on new videos
    (video as any)._savedState = null;

    if (streamingType === "dash") {
      // Dynamic import for optional dependency
      import("dashjs")
        .then(({ default: dashjs }) => {
          const player = dashjs.MediaPlayer().create();

          player.on("error", (e: any) => {
            console.error("[MediaPlayer] DASH player error:", e);
          });

          player.initialize(video, src, autoPlay ?? false);

          if (restoreState) {
            player.seek(restoreState.currentTime);
            if (restoreState.isPlaying) {
              player.play();
              setIsPlaying(true);
            }
          }

          dashPlayerRef.current = player;

          player.on("streamInitialized", () => {
            const isStreamLive = player.isDynamic();
            setIsLive(isStreamLive);
          });
        })
        .catch((err) => {
          console.warn("[MediaPlayer] dashjs not found (optional peer dependency). Falling back to native.", err);
          video.src = src;
        });

    } else if (streamingType === "hls") {
      // Dynamic import for optional dependency
      import("hls.js")
        .then(({ default: Hls }) => {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, (event: any, data: any) => {
              if (data && data.levels) {
                const levels = data.levels.map((l: any, i: number) => ({
                  height: l.height,
                  index: i
                })).sort((a: any, b: any) => b.height - a.height);
                setHlsLevels(levels);
              }

              if (restoreState) {
                video.currentTime = restoreState.currentTime;
                if (restoreState.isPlaying) video.play().catch(() => setIsPlaying(false));
              } else if (autoPlay) {
                video.play().catch(() => setIsPlaying(false));
              }
            });

            hls.on(Hls.Events.ERROR, (event: any, data: any) => {
              if (data.fatal) {
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    hls.startLoad();
                    break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError();
                    break;
                  default:
                    hls.destroy();
                    break;
                }
              }
            });

            hlsPlayerRef.current = hls;
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            video.src = src;
            if (restoreState) {
              video.currentTime = restoreState.currentTime;
              if (restoreState.isPlaying) video.play().catch(() => setIsPlaying(false));
            } else if (autoPlay) {
              video.play().catch(() => setIsPlaying(false));
            }
          }
        })
        .catch((err) => {
          // Check if it's Safari/Native HLS reachable
          if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
          } else {
            console.warn("[MediaPlayer] hls.js not found (optional peer dependency) and no native HLS support.", err);
            video.src = src;
          }
        });
    } else {
      // Native video handling for mp4 etc.
      video.src = src;
      if (restoreState) {
        video.currentTime = restoreState.currentTime;
        if (restoreState.isPlaying) {
          video.play().catch(() => setIsPlaying(false));
          setIsPlaying(true);
        }
      } else if (autoPlay) {
        video.play().catch(() => setIsPlaying(false));
      }
    }

    // Cleanup on src change or unmount
    return () => {
      const cleanupVideo = videoRef.current;
      // Determine if current cleanup is for a quality switch
      if (cleanupVideo) {
        const currentState = {
          currentTime: cleanupVideo.currentTime,
          isPlaying: !cleanupVideo.paused
        };

        // Save to DOM element to persist across resets
        (cleanupVideo as any)._savedState = currentState;

        if (dashPlayerRef.current) {
          dashPlayerRef.current.savedState = currentState;
        }
      }

      if (dashPlayerRef.current) {
        dashPlayerRef.current.destroy();
        dashPlayerRef.current = null;
      }

      if (hlsPlayerRef.current) {
        hlsPlayerRef.current.destroy();
        hlsPlayerRef.current = null;
      }
    };
  }, [src, autoPlay, streamingType]);

  // Separate effect for volume/muted changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    function onFullscreenChange() {
      const doc = document as any;
      const isFull = Boolean(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isFull);
    }

    const events = [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
      "msfullscreenchange"
    ];

    events.forEach((event) => document.addEventListener(event, onFullscreenChange));
    return () =>
      events.forEach((event) => document.removeEventListener(event, onFullscreenChange));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const syncPointer = () => setIsCoarsePointer(mediaQuery.matches);
    syncPointer();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncPointer);
      return () => mediaQuery.removeEventListener("change", syncPointer);
    }

    mediaQuery.addListener(syncPointer);
    return () => mediaQuery.removeListener(syncPointer);
  }, []);

  // Close settings tooltip when clicking outside
  useEffect(() => {
    if (!showSettings) return;

    function handleClickOutside(event: MouseEvent) {
      const wrapper = wrapperRef.current;
      if (wrapper && !wrapper.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSettings]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
    const end = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0;
    setBuffered(Math.min(100, (end / video.duration) * 100));

    const background = backgroundRef.current;
    if (background && Math.abs(background.currentTime - video.currentTime) > 0.2) {
      background.currentTime = video.currentTime;
    }
  }

  function handleLoadedMetadata() {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration || 0);
    video.playbackRate = speedSteps[speedIndex] ?? 1;

    if (video.videoWidth && video.videoHeight) {
      setVideoRatio(video.videoWidth / video.videoHeight);
    }

    const background = backgroundRef.current;
    if (background) {
      background.currentTime = video.currentTime || 0;
    }
  }

  function handleEnded() {
    setIsPlaying(false);
    setProgress(100);
    const background = backgroundRef.current;
    if (background) {
      background.pause();
    }
  }

  function handlePlay() {
    setIsPlaying(true);
    const background = backgroundRef.current;
    if (background) {
      background.play().catch(() => undefined);
    }
  }

  function handlePause() {
    setIsPlaying(false);
    const background = backgroundRef.current;
    if (background) {
      background.pause();
    }
  }

  function handleSeek(event: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const nextProgress = Number(event.target.value);
    const nextTime = (nextProgress / 100) * video.duration;
    video.currentTime = nextTime;
    setProgress(nextProgress);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    if (muted || volume === 0) {
      const targetVolume = volume === 0 ? 0.5 : volume;
      video.muted = false;
      video.volume = targetVolume;
      setVolume(targetVolume);
      setMuted(false);
    } else {
      video.muted = true;
      setMuted(true);
    }
  }

  function changeVolume(event: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;
    const nextVolume = Math.min(1, Math.max(0, Number(event.target.value)));
    setVolume(nextVolume);
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setMuted(nextVolume === 0);
  }

  function toggleFullscreen() {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (!isFullscreen) {
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
      } else if ((wrapper as any).webkitRequestFullscreen) {
        (wrapper as any).webkitRequestFullscreen();
      } else if ((wrapper as any).msRequestFullscreen) {
        (wrapper as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }

  function togglePictureInPicture() {
    const video = videoRef.current;
    if (!video) return;

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (video.requestPictureInPicture) {
      video.requestPictureInPicture();
    }
  }

  function changeSpeed(index: number) {
    const video = videoRef.current;
    if (!video) return;
    setSpeedIndex(index);
    video.playbackRate = speedSteps[index] || 1;
    setShowSettings(false);
  }

  function changeQuality(quality: { label: string; src: string; }) {
    if (props.onQualityChange) {
      props.onQualityChange(quality);
      setShowSettings(false);
    }
  }

  function setHlsQuality(index: number) {
    if (hlsPlayerRef.current) {
      hlsPlayerRef.current.currentLevel = index;
      setHlsCurrentLevel(index);
      setShowSettings(false);
    }
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  return (
    <div
      ref={wrapperRef}
      className="media-player"
      style={{
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        minWidth: 0,
        minHeight: 0,
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#000",
        boxSizing: "border-box",
        aspectRatio: "16/9",
        "--video-ratio": videoRatio ? `${videoRatio}` : "16/9",
        group: "group"
      } as any}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).dataset.hover = "true";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).dataset.hover = "false";
      }}
    >
      {/* Background Blur */}
      {!isFullscreen && (
        <video
          ref={backgroundRef}
          src={src}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(20px)",
            opacity: 0.5,
            transform: "scale(1.1)",
            zIndex: 0
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Video */}
      <video
        ref={videoRef}
        poster={poster}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={handlePlay}
        onPause={handlePause}
        playsInline
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "contain",
          zIndex: 1,
          cursor: "pointer"
        }}
      >
        <p>Your browser does not support the video tag.</p>
      </video>

      {/* Controls Overlay */}
      <div
        className="controls"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "40px 20px 20px",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.2s",
          pointerEvents: showControls ? "auto" : "none",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxSizing: "border-box"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        {/* Progress Bar */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 4,
            backgroundColor: palette.rail,
            borderRadius: 2,
            cursor: "pointer",
            marginBottom: 8
          }}
        >
          {/* Buffered */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${buffered}%`,
              backgroundColor: palette.buffer,
              borderRadius: 2
            }}
          />
          {/* Progress */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${progress}%`,
              backgroundColor: palette.red,
              borderRadius: 2
            }}
          />
          {/* Scrubber Input */}
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            style={{
              position: "absolute",
              top: -6,
              left: 0,
              width: "100%",
              height: 16,
              opacity: 0,
              cursor: "pointer"
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              style={{
                background: "none",
                border: "none",
                color: palette.text,
                cursor: "pointer",
                padding: 0,
                display: "flex"
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Volume */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="volume-container">
              <button
                onClick={toggleMute}
                style={{
                  background: "none",
                  border: "none",
                  color: palette.text,
                  cursor: "pointer",
                  padding: 0,
                  display: "flex"
                }}
              >
                {muted || volume === 0 ? (
                  <VolumeMutedIcon />
                ) : volume < 0.5 ? (
                  <VolumeLowIcon />
                ) : (
                  <VolumeHighIcon />
                )}
              </button>
              <div className="volume-slider" style={{ width: 60 }}>
                <div className="volume-track">
                  <div className="volume-fill" style={{ width: `${volumePercent}%` }} />
                  <div className="volume-thumb" style={{ left: `${volumePercent}%` }} />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={muted ? 0 : volume}
                  onChange={changeVolume}
                  className="volume-range-input"
                />
              </div>
            </div>

            {/* Time */}
            <div style={{ color: palette.text, fontSize: 13, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {positionLabel} / {durationLabel}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Settings */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  background: "none",
                  border: "none",
                  color: palette.text,
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  transform: showSettings ? "rotate(45deg)" : "none",
                  transition: "transform 0.2s"
                }}
              >
                <SettingsIcon />
              </button>

              {showSettings && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 40,
                    right: -10,
                    backgroundColor: "rgba(28, 28, 28, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 8,
                    padding: 8,
                    minWidth: 180,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    color: "#fff",
                    fontSize: 13
                  }}
                >
                  {/* Speed */}
                  <div>
                    <div style={{ fontWeight: 600, padding: "4px 8px", color: "#aaa", fontSize: 11, textTransform: "uppercase" }}>
                      Playback Speed
                    </div>
                    {speedSteps.map((speed, i) => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(i)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          background: speedIndex === i ? "rgba(255,255,255,0.1)" : "transparent",
                          border: "none",
                          color: "#fff",
                          padding: "6px 8px",
                          borderRadius: 4,
                          cursor: "pointer",
                          textAlign: "left"
                        }}
                      >
                        <span>{speed === 1 ? "Normal" : `${speed}x`}</span>
                        {speedIndex === i && <span>✓</span>}
                      </button>
                    ))}
                  </div>

                  {/* HLS Qualities (if available) */}
                  {hlsLevels.length > 0 && (
                    <div style={{ paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                      <div style={{ fontWeight: 600, padding: "4px 8px", color: "#aaa", fontSize: 11, textTransform: "uppercase" }}>
                        Quality
                      </div>
                      <button
                        onClick={() => setHlsQuality(-1)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          background: hlsCurrentLevel === -1 ? "rgba(255,255,255,0.1)" : "transparent",
                          border: "none",
                          color: "#fff",
                          padding: "6px 8px",
                          borderRadius: 4,
                          cursor: "pointer",
                          textAlign: "left"
                        }}
                      >
                        <span>Auto</span>
                        {hlsCurrentLevel === -1 && <span>✓</span>}
                      </button>
                      {hlsLevels.map((level) => (
                        <button
                          key={level.index}
                          onClick={() => setHlsQuality(level.index)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            background: hlsCurrentLevel === level.index ? "rgba(255,255,255,0.1)" : "transparent",
                            border: "none",
                            color: "#fff",
                            padding: "6px 8px",
                            borderRadius: 4,
                            cursor: "pointer",
                            textAlign: "left"
                          }}
                        >
                          <span>{level.height}p</span>
                          {hlsCurrentLevel === level.index && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Manual Qualities (props) */}
                  {props.qualities && props.qualities.length > 0 && (
                    <div style={{ paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                      <div style={{ fontWeight: 600, padding: "4px 8px", color: "#aaa", fontSize: 11, textTransform: "uppercase" }}>
                        Source
                      </div>
                      {props.qualities.map((q) => (
                        <button
                          key={q.src}
                          onClick={() => changeQuality(q)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            background: src === q.src ? "rgba(255,255,255,0.1)" : "transparent",
                            border: "none",
                            color: "#fff",
                            padding: "6px 8px",
                            borderRadius: 4,
                            cursor: "pointer",
                            textAlign: "left"
                          }}
                        >
                          <span>{q.label}</span>
                          {src === q.src && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PIP & Fullscreen */}
            <button
              onClick={togglePictureInPicture}
              style={{ background: "none", border: "none", color: palette.text, cursor: "pointer", padding: 0 }}
            >
              <PipIcon />
            </button>
            <button
              onClick={toggleFullscreen}
              style={{ background: "none", border: "none", color: palette.text, cursor: "pointer", padding: 0 }}
            >
              {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* CSS for hover effect */}
      <style>{`
        .media-player {
          aspect-ratio: 16 / 9;
        }

        @media (max-width: 768px) {
          .media-player {
            aspect-ratio: var(--video-ratio, 16 / 9);
          }
        }

        [data-hover="true"] .controls {
          opacity: 1 !important;
          pointer-events: auto !important;
        }

        .volume-slider {
          position: relative;
          height: 12px;
          display: flex;
          align-items: center;
        }

        .volume-track {
          position: relative;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.35);
          border-radius: 999px;
        }

        .volume-fill {
          height: 4px;
          background: ${palette.red};
          border-radius: 999px;
        }

        .volume-thumb {
          position: absolute;
          top: 50%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${palette.red};
          transform: translate(-50%, -50%);
        }

        .volume-range-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
        }
      `}</style>
    </div>
  );
}
