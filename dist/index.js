"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AppleMusicEmbed: () => AppleMusicEmbed,
  ApplePodcastsEmbed: () => ApplePodcastsEmbed,
  ArchiveOrgEmbed: () => ArchiveOrgEmbed,
  BilibiliEmbed: () => BilibiliEmbed,
  BlueskyEmbed: () => BlueskyEmbed,
  CardLayoutProvider: () => CardLayoutProvider,
  DailymotionEmbed: () => DailymotionEmbed,
  DeezerEmbed: () => DeezerEmbed,
  EmbedCard: () => EmbedCard,
  FacebookEmbed: () => FacebookEmbed,
  InstagramEmbed: () => InstagramEmbed,
  KickEmbed: () => KickEmbed,
  LinkedInEmbed: () => LinkedInEmbed,
  MastodonEmbed: () => MastodonEmbed,
  MediaPlayer: () => MediaPlayer,
  OdyseeEmbed: () => OdyseeEmbed,
  PinterestEmbed: () => PinterestEmbed,
  PlatformIcon: () => PlatformIcon,
  RedditEmbed: () => RedditEmbed,
  RumbleEmbed: () => RumbleEmbed,
  SoundCloudEmbed: () => SoundCloudEmbed,
  SpotifyEmbed: () => SpotifyEmbed,
  TelegramEmbed: () => TelegramEmbed,
  ThreadsEmbed: () => ThreadsEmbed,
  TidalEmbed: () => TidalEmbed,
  TikTokEmbed: () => TikTokEmbed,
  TruthSocialEmbed: () => TruthSocialEmbed,
  TumblrEmbed: () => TumblrEmbed,
  TwitchEmbed: () => TwitchEmbed,
  XEmbed: () => XEmbed,
  YouTubeEmbed: () => YouTubeEmbed
});
module.exports = __toCommonJS(index_exports);

// src/components/EmbedCard.tsx
var import_react3 = __toESM(require("react"));

// src/components/MediaPlayer.tsx
var import_react = require("react");

// src/components/Icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function PlayIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 5v14l11-7z" }) });
}
function PauseIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }) });
}
function VolumeHighIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" }) });
}
function VolumeLowIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" }) });
}
function VolumeMutedIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" }) });
}
function SettingsIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84a.484.484 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.27.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" }) });
}
function PipIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z" }) });
}
function FullscreenIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" }) });
}
function ExitFullscreenIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "24", height: "24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" }) });
}

// src/components/MediaPlayer.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var palette = {
  red: "#f00",
  text: "#fff",
  rail: "rgba(255,255,255,0.2)",
  buffer: "rgba(255,255,255,0.4)"
};
function getStreamingType(url) {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes(".mpd") || lowerUrl.includes("/live-dash/") || lowerUrl.includes("/dash-abr")) {
    return "dash";
  }
  if (lowerUrl.includes(".m3u8") || lowerUrl.includes("/hls/")) {
    return "hls";
  }
  return "native";
}
function MediaPlayer(props) {
  const { src, poster, alt, autoPlay } = props;
  const videoRef = (0, import_react.useRef)(null);
  const backgroundRef = (0, import_react.useRef)(null);
  const wrapperRef = (0, import_react.useRef)(null);
  const dashPlayerRef = (0, import_react.useRef)(null);
  const hlsPlayerRef = (0, import_react.useRef)(null);
  const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
  const [progress, setProgress] = (0, import_react.useState)(0);
  const [duration, setDuration] = (0, import_react.useState)(0);
  const [buffered, setBuffered] = (0, import_react.useState)(0);
  const [volume, setVolume] = (0, import_react.useState)(1);
  const [muted, setMuted] = (0, import_react.useState)(false);
  const [speedIndex, setSpeedIndex] = (0, import_react.useState)(1);
  const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
  const [videoRatio, setVideoRatio] = (0, import_react.useState)(null);
  const [showSettings, setShowSettings] = (0, import_react.useState)(false);
  const [isLive, setIsLive] = (0, import_react.useState)(false);
  const [hlsLevels, setHlsLevels] = (0, import_react.useState)([]);
  const [hlsCurrentLevel, setHlsCurrentLevel] = (0, import_react.useState)(-1);
  const [isCoarsePointer, setIsCoarsePointer] = (0, import_react.useState)(false);
  const speedSteps = [0.75, 1, 1.25, 1.5, 2];
  const showControls = !isPlaying || showSettings || isCoarsePointer;
  const volumePercent = Math.round((muted ? 0 : volume) * 100);
  const streamingType = (0, import_react.useMemo)(() => getStreamingType(src), [src]);
  const durationLabel = (0, import_react.useMemo)(() => isLive ? "LIVE" : formatTime(duration), [duration, isLive]);
  const positionLabel = (0, import_react.useMemo)(() => formatTime(progress / 100 * duration), [
    progress,
    duration
  ]);
  (0, import_react.useEffect)(() => {
    const video = videoRef.current;
    if (!video) return;
    const background = backgroundRef.current;
    if (background) {
      background.muted = true;
      background.loop = true;
      background.playsInline = true;
    }
    let restoreState = null;
    if (dashPlayerRef.current?.savedState) {
      restoreState = dashPlayerRef.current.savedState;
    } else if (video._savedState) {
      restoreState = video._savedState;
    }
    if (dashPlayerRef.current) {
      dashPlayerRef.current.destroy();
      dashPlayerRef.current = null;
    }
    video._savedState = null;
    if (streamingType === "dash") {
      import("dashjs").then(({ default: dashjs }) => {
        const player = dashjs.MediaPlayer().create();
        player.on("error", (e) => {
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
      }).catch((err) => {
        console.warn("[MediaPlayer] dashjs not found (optional peer dependency). Falling back to native.", err);
        video.src = src;
      });
    } else if (streamingType === "hls") {
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
            if (data && data.levels) {
              const levels = data.levels.map((l, i) => ({
                height: l.height,
                index: i
              })).sort((a, b) => b.height - a.height);
              setHlsLevels(levels);
            }
            if (restoreState) {
              video.currentTime = restoreState.currentTime;
              if (restoreState.isPlaying) video.play().catch(() => setIsPlaying(false));
            } else if (autoPlay) {
              video.play().catch(() => setIsPlaying(false));
            }
          });
          hls.on(Hls.Events.ERROR, (event, data) => {
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
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = src;
          if (restoreState) {
            video.currentTime = restoreState.currentTime;
            if (restoreState.isPlaying) video.play().catch(() => setIsPlaying(false));
          } else if (autoPlay) {
            video.play().catch(() => setIsPlaying(false));
          }
        }
      }).catch((err) => {
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = src;
        } else {
          console.warn("[MediaPlayer] hls.js not found (optional peer dependency) and no native HLS support.", err);
          video.src = src;
        }
      });
    } else {
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
    return () => {
      const cleanupVideo = videoRef.current;
      if (cleanupVideo) {
        const currentState = {
          currentTime: cleanupVideo.currentTime,
          isPlaying: !cleanupVideo.paused
        };
        cleanupVideo._savedState = currentState;
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
  (0, import_react.useEffect)(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = muted;
  }, [volume, muted]);
  (0, import_react.useEffect)(() => {
    function onFullscreenChange() {
      const doc = document;
      const isFull = Boolean(
        doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement
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
    return () => events.forEach((event) => document.removeEventListener(event, onFullscreenChange));
  }, []);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    if (!showSettings) return;
    function handleClickOutside(event) {
      const wrapper = wrapperRef.current;
      if (wrapper && !wrapper.contains(event.target)) {
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
    setProgress(video.currentTime / video.duration * 100);
    const end = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0;
    setBuffered(Math.min(100, end / video.duration * 100));
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
      background.play().catch(() => void 0);
    }
  }
  function handlePause() {
    setIsPlaying(false);
    const background = backgroundRef.current;
    if (background) {
      background.pause();
    }
  }
  function handleSeek(event) {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const nextProgress = Number(event.target.value);
    const nextTime = nextProgress / 100 * video.duration;
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
  function changeVolume(event) {
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
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen();
      } else if (wrapper.msRequestFullscreen) {
        wrapper.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
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
  function changeSpeed(index) {
    const video = videoRef.current;
    if (!video) return;
    setSpeedIndex(index);
    video.playbackRate = speedSteps[index] || 1;
    setShowSettings(false);
  }
  function changeQuality(quality) {
    if (props.onQualityChange) {
      props.onQualityChange(quality);
      setShowSettings(false);
    }
  }
  function setHlsQuality(index) {
    if (hlsPlayerRef.current) {
      hlsPlayerRef.current.currentLevel = index;
      setHlsCurrentLevel(index);
      setShowSettings(false);
    }
  }
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      ref: wrapperRef,
      className: "media-player",
      style: {
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
      },
      onMouseEnter: (e) => {
        e.currentTarget.dataset.hover = "true";
      },
      onMouseLeave: (e) => {
        e.currentTarget.dataset.hover = "false";
      },
      children: [
        !isFullscreen && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "video",
          {
            ref: backgroundRef,
            src,
            style: {
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
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "video",
          {
            ref: videoRef,
            poster,
            onClick: togglePlay,
            onTimeUpdate: handleTimeUpdate,
            onLoadedMetadata: handleLoadedMetadata,
            onEnded: handleEnded,
            onPlay: handlePlay,
            onPause: handlePause,
            playsInline: true,
            style: {
              position: "relative",
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "contain",
              zIndex: 1,
              cursor: "pointer"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Your browser does not support the video tag." })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: "controls",
            style: {
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
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.opacity = "1";
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "div",
                {
                  style: {
                    position: "relative",
                    width: "100%",
                    height: 4,
                    backgroundColor: palette.rail,
                    borderRadius: 2,
                    cursor: "pointer",
                    marginBottom: 8
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${buffered}%`,
                          backgroundColor: palette.buffer,
                          borderRadius: 2
                        }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${progress}%`,
                          backgroundColor: palette.red,
                          borderRadius: 2
                        }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "input",
                      {
                        type: "range",
                        min: "0",
                        max: "100",
                        step: "0.1",
                        value: progress,
                        onChange: handleSeek,
                        style: {
                          position: "absolute",
                          top: -6,
                          left: 0,
                          width: "100%",
                          height: 16,
                          opacity: 0,
                          cursor: "pointer"
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "button",
                    {
                      onClick: togglePlay,
                      style: {
                        background: "none",
                        border: "none",
                        color: palette.text,
                        cursor: "pointer",
                        padding: 0,
                        display: "flex"
                      },
                      children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PauseIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PlayIcon, {})
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8 }, className: "volume-container", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "button",
                      {
                        onClick: toggleMute,
                        style: {
                          background: "none",
                          border: "none",
                          color: palette.text,
                          cursor: "pointer",
                          padding: 0,
                          display: "flex"
                        },
                        children: muted || volume === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VolumeMutedIcon, {}) : volume < 0.5 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VolumeLowIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VolumeHighIcon, {})
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "volume-slider", style: { width: 60 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "volume-track", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "volume-fill", style: { width: `${volumePercent}%` } }),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "volume-thumb", style: { left: `${volumePercent}%` } })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "input",
                        {
                          type: "range",
                          min: "0",
                          max: "1",
                          step: "0.05",
                          value: muted ? 0 : volume,
                          onChange: changeVolume,
                          className: "volume-range-input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { color: palette.text, fontSize: 13, fontWeight: 500, fontVariantNumeric: "tabular-nums" }, children: [
                    positionLabel,
                    " / ",
                    durationLabel
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "relative" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "button",
                      {
                        onClick: () => setShowSettings(!showSettings),
                        style: {
                          background: "none",
                          border: "none",
                          color: palette.text,
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          transform: showSettings ? "rotate(45deg)" : "none",
                          transition: "transform 0.2s"
                        },
                        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SettingsIcon, {})
                      }
                    ),
                    showSettings && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                      "div",
                      {
                        style: {
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
                        },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, padding: "4px 8px", color: "#aaa", fontSize: 11, textTransform: "uppercase" }, children: "Playback Speed" }),
                            speedSteps.map((speed, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                              "button",
                              {
                                onClick: () => changeSpeed(i),
                                style: {
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
                                },
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: speed === 1 ? "Normal" : `${speed}x` }),
                                  speedIndex === i && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u2713" })
                                ]
                              },
                              speed
                            ))
                          ] }),
                          hlsLevels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }, children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, padding: "4px 8px", color: "#aaa", fontSize: 11, textTransform: "uppercase" }, children: "Quality" }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                              "button",
                              {
                                onClick: () => setHlsQuality(-1),
                                style: {
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
                                },
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Auto" }),
                                  hlsCurrentLevel === -1 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u2713" })
                                ]
                              }
                            ),
                            hlsLevels.map((level) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                              "button",
                              {
                                onClick: () => setHlsQuality(level.index),
                                style: {
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
                                },
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                                    level.height,
                                    "p"
                                  ] }),
                                  hlsCurrentLevel === level.index && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u2713" })
                                ]
                              },
                              level.index
                            ))
                          ] }),
                          props.qualities && props.qualities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }, children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, padding: "4px 8px", color: "#aaa", fontSize: 11, textTransform: "uppercase" }, children: "Source" }),
                            props.qualities.map((q) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                              "button",
                              {
                                onClick: () => changeQuality(q),
                                style: {
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
                                },
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: q.label }),
                                  src === q.src && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u2713" })
                                ]
                              },
                              q.src
                            ))
                          ] })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "button",
                    {
                      onClick: togglePictureInPicture,
                      style: { background: "none", border: "none", color: palette.text, cursor: "pointer", padding: 0 },
                      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PipIcon, {})
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "button",
                    {
                      onClick: toggleFullscreen,
                      style: { background: "none", border: "none", color: palette.text, cursor: "pointer", padding: 0 },
                      children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExitFullscreenIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FullscreenIcon, {})
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("style", { children: `
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
      ` })
      ]
    }
  );
}

// src/components/PlatformIcons.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var PLATFORM_ICON_PATHS = {
  reddit: {
    viewBox: "0 0 24 24",
    path: "M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z"
  },
  x: {
    viewBox: "0 0 24 24",
    path: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"
  },
  bluesky: {
    viewBox: "0 0 24 24",
    path: "M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026"
  },
  mastodon: {
    viewBox: "0 0 16 16",
    path: "M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765c0 0-2.285 1.017-2.285 4.488l-.002.662c-.004.64-.007 1.35.011 2.091.083 3.394.626 6.74 3.78 7.57 1.454.383 2.703.463 3.709.408 1.823-.1 2.847-.647 2.847-.647l-.06-1.317s-1.303.41-2.767.36c-1.45-.05-2.98-.156-3.215-1.928a4 4 0 0 1-.033-.496s1.424.346 3.228.428c1.103.05 2.137-.064 3.188-.189zm1.613-2.47H11.13v-4.08c0-.859-.364-1.295-1.091-1.295-.804 0-1.207.517-1.207 1.541v2.233H7.168V5.89c0-1.024-.403-1.541-1.207-1.541-.727 0-1.091.436-1.091 1.296v4.079H3.197V5.522q0-1.288.66-2.046c.456-.505 1.052-.764 1.793-.764.856 0 1.504.328 1.933.983L8 4.39l.417-.695c.429-.655 1.077-.983 1.934-.983.74 0 1.336.259 1.791.764q.662.757.661 2.046z"
  },
  threads: {
    viewBox: "0 0 24 24",
    path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"
  },
  truthSocial: {
    viewBox: "0 0 48 48",
    path: ""
  },
  telegram: {
    viewBox: "0 0 24 24",
    path: "M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.751-.244-1.349-.374-1.296-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.119.098.152.228.166.33.016.115.025.234.015.366z"
  },
  linkedin: {
    viewBox: "0 0 24 24",
    path: "M22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003zM7.433 20.452H4.114V9h3.319v11.452zM5.774 7.433a1.926 1.926 0 1 1 0-3.852 1.926 1.926 0 0 1 0 3.852zM20.452 20.452h-3.319v-5.569c0-1.328-.027-3.038-1.853-3.038-1.853 0-2.136 1.445-2.136 2.939v5.668h-3.319V9h3.186v1.561h.045c.444-.84 1.528-1.726 3.145-1.726 3.364 0 3.983 2.214 3.983 5.093v6.524z"
  },
  bilibili: {
    viewBox: "0 0 24 24",
    path: "M21.723 5.779a2.278 2.278 0 0 0-2.28-2.278h-2.567L18.67.64a.32.32 0 0 0-.26-.14H15.57a.32.32 0 0 0-.26.14l-1.42 2.861H10.11L8.69.64A.32.32 0 0 0 8.43.5H5.59a.32.32 0 0 0-.26.14L7.124 3.5H4.556A2.278 2.278 0 0 0 2.277 5.78v12.442A2.278 2.278 0 0 0 4.556 20.5h14.887a2.278 2.278 0 0 0 2.28-2.278zm-2.278 11.582a.608.608 0 0 1-.61.608H5.165a.608.608 0 0 1-.61-.608V6.639c0-.337.273-.61.61-.61h13.67c.337 0 .61.273.61.61zm-8.416-8.383a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zm6.14 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"
  },
  instagram: {
    viewBox: "0 0 24 24",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
  },
  tiktok: {
    viewBox: "0 0 24 24",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
  },
  facebook: {
    viewBox: "0 0 24 24",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
  },
  youtube: {
    viewBox: "0 0 24 24",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  },
  rumble: {
    viewBox: "0 0 24 24",
    path: "M14.4528 13.5458c.8064-.6542.9297-1.8381.2756-2.6445a1.8802 1.8802 0 0 0-.2756-.2756 21.2127 21.2127 0 0 0-4.3121-2.776c-1.066-.51-2.256.2-2.4261 1.414a23.5226 23.5226 0 0 0-.14 5.5021c.116 1.23 1.292 1.964 2.372 1.492a19.6285 19.6285 0 0 0 4.5062-2.704v-.008zm6.9322-5.4002c2.0335 2.228 2.0396 5.637.014 7.8723A26.1487 26.1487 0 0 1 8.2946 23.846c-2.6848.6713-5.4168-.914-6.1662-3.5781-1.524-5.2002-1.3-11.0803.17-16.3045.772-2.744 3.3521-4.4661 6.0102-3.832 4.9242 1.174 9.5443 4.196 13.0764 8.0121v.002z"
  },
  dailymotion: {
    viewBox: "0 0 24 24",
    path: "M21.823 7.327a11.928 11.928 0 0 0-2.606-3.814 12.126 12.126 0 0 0-3.866-2.57A12.246 12.246 0 0 0 10.617 0H1.831a.602.602 0 0 0-.609.603v3.764c0 .162.064.312.179.426l4.164 4.123a.612.612 0 0 0 .439.177h4.56c.806 0 1.56.313 2.125.88.557.559.856 1.296.843 2.075-.029 1.571-1.343 2.849-2.931 2.849h-6.74a.613.613 0 0 0-.432.176.619.619 0 0 0-.178.427v3.764c0 .162.063.312.178.427l4.139 4.099a.647.647 0 0 0 .476.21h2.572a12.276 12.276 0 0 0 4.733-.945 12.145 12.145 0 0 0 3.866-2.571 11.959 11.959 0 0 0 2.607-3.813c.633-1.479.956-3.051.956-4.67 0-1.619-.321-3.19-.956-4.669l.001-.005Z"
  },
  odysee: {
    viewBox: "0 0 24 24",
    path: "M11.965 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12 12 12 0 0 0-3.209-8.167 7.272 7.272 0 0 1-.799 3.218c-.548.957-2.281 2.77-3.264 3.699a.723.723 0 0 0 .056 1.104c.996.74 2.658 2.151 2.788 3.422.176 1.835 1.6 4.02 1.675 4.159a.67.67 0 0 1-.105.327 12.067 12.067 0 0 1-2.03 1.898 2.435 2.435 0 0 1-.807.126c-1.944-.04-1.526-1.866-1.712-2.905s-.78-3.085-2.716-2.788c0 0 .484 4.243-1.489 5.546s-5.843 2.27-6.55-.408 2.46-2.384 2.684-2.384c.223 0 2.233-.632 1.267-2.53-.967-1.898-2.01-3.5-2.01-3.5a11.37 11.37 0 0 0-2.735 1.285 5.42 5.42 0 0 0-1.061.82c-1.065 1.104-2.19 1.713-2.954 1.358a1.368 1.368 0 0 1-.32-.221A11.926 11.926 0 0 1 .1 13.503c.43-.641 2.082-2.038 3.696-2.906 1.304-.702 2.737-.988 3.118-1.355-.671-2.235-1.882-5.703.832-7.33C9.881.634 12.69-.142 13.77 2.958c1.08 3.1.802 3.796 1.267 3.796.465 0 1.608.223 2.09-1.75.356-1.445.574-2.685 1.379-3.087A12 12 0 0 0 12 0a12 12 0 0 0-.035 0z"
  },
  archive: {
    viewBox: "0 0 24 24",
    path: "M22.667 22.884V24H1.333v-1.116zm-.842-1.675v1.396H2.175v-1.396zM4.233 6.14l.234.118.118 1.882.117 3.058v2.941l-.117 3.666-.02 2.47-.332.098H3.062l-.352-.098-.136-2.47-.118-3.646v-2.941l.118-3.078.107-1.892.244-.107zm16.842 0l.235.118.117 1.882.117 3.058v2.941l-.117 3.666-.02 2.47-.332.098h-1.171l-.352-.098-.137-2.47-.117-3.646v-2.941l.117-3.078.108-1.892.244-.107zm-11.79 0l.235.118.117 1.882.117 3.058v2.941l-.117 3.666-.02 2.47-.331.098H8.114l-.352-.098-.136-2.47-.117-3.646v-2.941l.117-3.078.107-1.892.244-.107zm6.457 0l.234.118.117 1.882.118 3.058v2.941l-.118 3.666-.019 2.47-.332.098H14.57l-.351-.098-.137-2.47-.117-3.646v-2.941l.117-3.078.108-1.892.244-.107zm6.083-2.511V5.58H2.175V3.628zM11.798 0l10.307 2.347-.413.723H1.951l-.618-.587Z"
  },
  kick: {
    viewBox: "0 0 24 24",
    path: "M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"
  },
  twitch: {
    viewBox: "0 0 24 24",
    path: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
  },
  tumblr: {
    viewBox: "0 0 24 24",
    path: "M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z"
  },
  pinterest: {
    viewBox: "0 0 24 24",
    path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"
  },
  spotify: {
    viewBox: "0 0 24 24",
    path: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
  },
  appleMusic: {
    viewBox: "0 0 24 24",
    path: "M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"
  },
  deezer: {
    viewBox: "0 0 24 24",
    path: "M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38h-5.19zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.594v3.027h5.189v-3.027h-5.19zm6.271 0v3.027h5.19v-3.027h-5.19zm6.27 0v3.027H24v-3.027h-5.19zM0 16.81v3.029h5.19v-3.03H0zm6.27 0v3.029h5.189v-3.03h-5.19zm6.271 0v3.029h5.19v-3.03h-5.19zm6.27 0v3.029H24v-3.03h-5.19Z"
  },
  tidal: {
    viewBox: "0 0 24 24",
    path: "M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004-4.004-4.004zM16.042 7.996l3.979-3.979L24 7.996l-3.979 3.979z"
  },
  soundcloud: {
    viewBox: "0 0 24 24",
    path: "M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z"
  },
  applePodcasts: {
    viewBox: "0 0 24 24",
    path: "M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59.12 2.2.007 2.864a8.506 8.506 0 01-3.24 5.296c-.608.46-2.096 1.261-2.336 1.261-.088 0-.096-.091-.056-.46.072-.592.144-.715.48-.856.536-.224 1.448-.874 2.008-1.435a7.644 7.644 0 002.008-3.536c.208-.824.184-2.656-.048-3.504-.728-2.696-2.928-4.792-5.624-5.352-.784-.16-2.208-.16-3 0-2.728.56-4.984 2.76-5.672 5.528-.184.752-.184 2.584 0 3.336.456 1.832 1.64 3.512 3.192 4.512.304.2.672.408.824.472.336.144.408.264.472.856.04.36.03.464-.056.464-.056 0-.464-.176-.896-.384l-.04-.03c-2.472-1.216-4.056-3.274-4.632-6.012-.144-.706-.168-2.392-.03-3.04.36-1.74 1.048-3.1 2.192-4.304 1.648-1.737 3.768-2.656 6.128-2.656zm.134 2.81c.409.004.803.04 1.106.106 2.784.62 4.76 3.408 4.376 6.174-.152 1.114-.536 2.03-1.216 2.88-.336.43-1.152 1.15-1.296 1.15-.023 0-.048-.272-.048-.603v-.605l.416-.496c1.568-1.878 1.456-4.502-.256-6.224-.664-.67-1.432-1.064-2.424-1.246-.64-.118-.776-.118-1.448-.008-1.02.167-1.81.562-2.512 1.256-1.72 1.704-1.832 4.342-.264 6.222l.413.496v.608c0 .336-.027.608-.06.608-.03 0-.264-.16-.512-.36l-.034-.011c-.832-.664-1.568-1.842-1.872-2.997-.184-.698-.184-2.024.008-2.72.504-1.878 1.888-3.335 3.808-4.019.41-.145 1.133-.22 1.814-.211zm-.13 2.99c.31 0 .62.06.844.178.488.253.888.745 1.04 1.259.464 1.578-1.208 2.96-2.72 2.254h-.015c-.712-.331-1.096-.956-1.104-1.77 0-.733.408-1.371 1.112-1.745.224-.117.534-.176.844-.176zm-.011 4.728c.988-.004 1.706.349 1.97.97.198.464.124 1.932-.218 4.302-.232 1.656-.36 2.074-.68 2.356-.44.39-1.064.498-1.656.288h-.003c-.716-.257-.87-.605-1.164-2.644-.341-2.37-.416-3.838-.218-4.302.262-.616.974-.966 1.97-.97z"
  }
};
function PlatformIcon({ platform, size = 16, color = "currentColor", ...props }) {
  if (platform === "truthSocial") {
    if (color !== "currentColor") {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "svg",
        {
          viewBox: "0 0 48 48",
          width: size,
          height: size,
          "aria-hidden": "true",
          focusable: "false",
          style: { display: "block" },
          ...props,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { width: "11", height: "10", x: "3", y: "6", fill: color }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { width: "11", height: "10", x: "34", y: "33", fill: color }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("polygon", { fill: color, points: "18,6 18,43 29,43 29,16 45,16 45,6" })
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "svg",
      {
        viewBox: "0 0 48 48",
        width: size,
        height: size,
        "aria-hidden": "true",
        focusable: "false",
        style: { display: "block" },
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { width: "11", height: "10", x: "3", y: "6", fill: "#661dff" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { width: "11", height: "10", x: "34", y: "33", fill: "#17e8b5" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("polygon", { fill: "#661dff", points: "18,6 18,43 29,43 29,16 45,16 45,6" })
        ]
      }
    );
  }
  const icon = PLATFORM_ICON_PATHS[platform];
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "svg",
    {
      viewBox: icon.viewBox,
      width: size,
      height: size,
      fill: color,
      "aria-hidden": "true",
      focusable: "false",
      style: { display: "block" },
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: icon.path })
    }
  );
}

// src/components/PlatformBranding.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var PROVIDER_TO_PLATFORM = {
  reddit: "reddit",
  x: "x",
  "x (formerly twitter)": "x",
  twitter: "x",
  bluesky: "bluesky",
  mastodon: "mastodon",
  threads: "threads",
  "truth social": "truthSocial",
  telegram: "telegram",
  linkedin: "linkedin",
  bilibili: "bilibili",
  instagram: "instagram",
  tiktok: "tiktok",
  facebook: "facebook",
  youtube: "youtube",
  rumble: "rumble",
  dailymotion: "dailymotion",
  odysee: "odysee",
  "archive.org": "archive",
  archive: "archive",
  kick: "kick",
  twitch: "twitch",
  tumblr: "tumblr",
  pinterest: "pinterest",
  spotify: "spotify",
  "apple music": "appleMusic",
  deezer: "deezer",
  tidal: "tidal",
  soundcloud: "soundcloud",
  "apple podcasts": "applePodcasts"
};
var PLATFORM_COLORS = {
  reddit: "#ff4500",
  x: "#111111",
  bluesky: "#0285ff",
  mastodon: "#6364ff",
  threads: "#111111",
  truthSocial: "#661dff",
  telegram: "#229ED9",
  linkedin: "#0a66c2",
  bilibili: "#00a1d6",
  instagram: "#e1306c",
  tiktok: "#fe2c55",
  facebook: "#1877f2",
  youtube: "#ff0000",
  rumble: "#85c742",
  dailymotion: "#0a0a0a",
  odysee: "#ef2e24",
  archive: "#222222",
  kick: "#53fc18",
  twitch: "#9146ff",
  tumblr: "#001935",
  pinterest: "#e60023",
  spotify: "#1db954",
  appleMusic: "#fa243c",
  deezer: "#ef5466",
  tidal: "#000000",
  soundcloud: "#ff5500",
  applePodcasts: "#a24bdc"
};
function PlatformBranding({
  provider,
  theme,
  iconSize = 16,
  hideProviderTitle = false,
  icon
}) {
  if (!provider) return null;
  const normalizedProvider = provider.toLowerCase().trim();
  const platformId = PROVIDER_TO_PLATFORM[normalizedProvider];
  const resolvedIcon = icon ?? (platformId ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    PlatformIcon,
    {
      platform: platformId,
      size: iconSize,
      color: theme === "dark" ? "#ffffff" : platformId === "truthSocial" ? "currentColor" : PLATFORM_COLORS[platformId],
      "aria-label": provider
    }
  ) : null);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
        opacity: 0.8
      },
      children: [
        resolvedIcon,
        !hideProviderTitle && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: provider })
      ]
    }
  );
}

// src/components/CardLayout.tsx
var import_react2 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var CardLayoutContext = (0, import_react2.createContext)(void 0);
function CardLayoutProvider({ layout, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CardLayoutContext.Provider, { value: layout, children });
}
function useCardLayout(explicit) {
  const context = (0, import_react2.useContext)(CardLayoutContext);
  return explicit ?? context;
}

// src/components/EmbedCard.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var themes = {
  light: {
    background: "#ffffff",
    border: "rgba(0, 0, 0, 0.08)",
    text: "#1d1d1f",
    muted: "#86868b",
    accent: "var(--embed-accent, #ff4500)",
    alert: "#ff3b30",
    shadow: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
    hoverShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08)",
    card: "#ffffff",
    mediaBg: "rgba(0, 0, 0, 0.02)",
    linkHoverBg: "rgba(0, 0, 0, 0.03)",
    pollBar: {
      from: "rgba(var(--embed-accent-rgb), 0.08)",
      to: "rgba(var(--embed-accent-rgb), 0.04)"
    }
  },
  dark: {
    background: "#000000",
    // Pure black
    border: "rgba(255, 255, 255, 0.16)",
    text: "#ffffff",
    muted: "#a1a1aa",
    accent: "var(--embed-accent, #ff4500)",
    alert: "#ff6b6b",
    shadow: "none",
    hoverShadow: "0 0 0 1px rgba(255, 255, 255, 0.2)",
    card: "#000000",
    mediaBg: "rgba(255, 255, 255, 0.08)",
    linkHoverBg: "rgba(255, 255, 255, 0.12)",
    pollBar: {
      from: "rgba(var(--embed-accent-rgb), 0.2)",
      to: "rgba(var(--embed-accent-rgb), 0.1)"
    }
  }
};
function EmbedCard({
  provider,
  title,
  subtitle,
  subtitleIcon,
  author,
  timestamp,
  body,
  bodyHtml,
  media,
  pollData,
  badges = [],
  footerMeta = [],
  href,
  ctaLabel = "View source",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  linkBehavior = "cta",
  linkTarget = "_blank",
  disableCard = false,
  width = "100%",
  maxWidth = 600,
  status = "ok",
  statusMessage,
  footerChildren,
  className,
  style,
  showCTA = true,
  platformIcon,
  showBranding = true,
  hideProviderTitle = false,
  theme = "light",
  layout,
  childrenPlacement = "body",
  children
}) {
  const palette2 = themes[theme];
  const normalizedProvider = provider?.toLowerCase().trim();
  const ctaPlatformId = normalizedProvider ? PROVIDER_TO_PLATFORM[normalizedProvider] : void 0;
  const platformColor = ctaPlatformId ? PLATFORM_COLORS[ctaPlatformId] : void 0;
  const usePlatformButtonColor = Boolean(ctaUsePlatformColor && platformColor);
  const usePlatformIconColor = Boolean(ctaUsePlatformIconColor && platformColor && !usePlatformButtonColor);
  const ctaIconColor = usePlatformButtonColor ? ctaPlatformId === "kick" ? "#000000" : "#ffffff" : usePlatformIconColor ? ctaPlatformId === "truthSocial" ? "currentColor" : platformColor : ctaPlatformId === "truthSocial" ? "#000000" : "currentColor";
  const ctaButtonTextColor = usePlatformButtonColor ? ctaPlatformId === "kick" ? "#000000" : "#ffffff" : palette2.text;
  const ctaIcon = ctaLabelIcon && ctaPlatformId ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    PlatformIcon,
    {
      platform: ctaPlatformId,
      size: 14,
      color: ctaIconColor,
      "aria-hidden": "true",
      focusable: "false"
    }
  ) : null;
  const useSharedBranding = normalizedProvider !== "youtube";
  const resolvedLayout = useCardLayout(layout) ?? "classic";
  const cardStyle = {
    "--embed-bg": palette2.background,
    "--embed-border": palette2.border,
    "--embed-text": palette2.text,
    "--embed-muted": palette2.muted,
    "--embed-card-bg": palette2.card,
    ...style
  };
  const [activeMedia, setActiveMedia] = import_react3.default.useState(media);
  import_react3.default.useEffect(() => {
    setActiveMedia(media);
  }, [media]);
  const baseCardStyle = {
    backgroundColor: disableCard ? "transparent" : palette2.card,
    borderRadius: disableCard ? 0 : 16,
    border: disableCard ? "none" : `1px solid ${palette2.border}`,
    overflow: "hidden",
    color: palette2.text,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    boxShadow: disableCard ? "none" : palette2.shadow,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    maxWidth,
    width,
    padding: disableCard ? 0 : 20,
    boxSizing: "border-box",
    display: "grid",
    gap: 12,
    ...cardStyle
  };
  if (status !== "ok") {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "article",
      {
        className,
        style: {
          ...baseCardStyle,
          alignItems: "center",
          textAlign: "center",
          gap: 12
        },
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: palette2.muted, opacity: 0.8 }, children: provider }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em" }, children: [
            status === "loading" && "Loading post...",
            status === "removed" && "This post is no longer available",
            status === "error" && "Unable to load the embed"
          ] }),
          statusMessage && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { fontSize: "0.9375rem", color: palette2.muted, lineHeight: 1.5 }, children: statusMessage }),
          href && status !== "loading" && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "a",
            {
              href,
              style: {
                color: palette2.text,
                border: `1.5px solid ${palette2.border}`,
                padding: "9px 18px",
                borderRadius: 999,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginTop: 4,
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundColor: palette2.background
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.backgroundColor = palette2.linkHoverBg;
                e.currentTarget.style.borderColor = palette2.text;
                e.currentTarget.style.transform = "translateY(-1px)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = palette2.background;
                e.currentTarget.style.borderColor = palette2.border;
                e.currentTarget.style.transform = "translateY(0)";
              },
              children: [
                "Open on ",
                provider
              ]
            }
          )
        ]
      }
    );
  }
  const isCardLink = linkBehavior === "card" && href;
  const isTitleLink = linkBehavior === "title" && href;
  const headerSection = /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("header", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
      showBranding && (useSharedBranding ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        PlatformBranding,
        {
          provider,
          theme,
          icon: platformIcon,
          hideProviderTitle
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          style: {
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: palette2.muted,
            opacity: 0.8
          },
          children: provider
        }
      )),
      subtitle && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.9375rem", fontWeight: 600, color: palette2.text, letterSpacing: "-0.01em" }, children: [
        subtitleIcon && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { style: { display: "inline-flex", alignItems: "center" }, children: subtitleIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: subtitle })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", alignItems: "flex-start" }, children: badges.map((badge) => {
      const isAccent = badge.tone === "accent";
      const isAlert = badge.tone === "alert";
      let badgeBg = "rgba(0, 0, 0, 0.04)";
      let badgeColor = palette2.muted;
      if (theme === "dark") {
        if (isAlert) {
          badgeBg = "rgba(255, 107, 107, 0.2)";
          badgeColor = "#ff6b6b";
        } else if (isAccent) {
          badgeBg = "rgba(255, 255, 255, 0.1)";
          badgeColor = "var(--embed-accent, #ff4500)";
        } else {
          badgeBg = "rgba(255, 255, 255, 0.1)";
          badgeColor = palette2.muted;
        }
      } else {
        if (isAlert) {
          badgeBg = "rgba(255, 59, 48, 0.1)";
          badgeColor = palette2.alert;
        } else if (isAccent) {
          badgeBg = "rgba(255, 69, 0, 0.1)";
          badgeColor = palette2.accent;
        }
      }
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "span",
        {
          style: {
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            padding: "5px 10px",
            borderRadius: 8,
            backgroundColor: badgeBg,
            color: badgeColor,
            border: "none",
            backdropFilter: "blur(10px)"
          },
          children: badge.label
        },
        badge.label
      );
    }) })
  ] });
  const titleSection = title && (isTitleLink ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "a",
    {
      href,
      target: linkTarget,
      rel: linkTarget === "_blank" ? "noopener noreferrer" : void 0,
      style: {
        fontSize: "1.125rem",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "-0.02em",
        color: palette2.text,
        textDecoration: "none",
        cursor: "pointer"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.textDecoration = "underline";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.textDecoration = "none";
      },
      children: title
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: palette2.text }, children: title }));
  const metaSection = author || timestamp ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { fontSize: "0.875rem", color: palette2.muted, fontWeight: 400 }, children: [author, timestamp].filter(Boolean).join(" \xB7 ") }) : null;
  const bodySection = bodyHtml || body ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "div",
    {
      style: { fontSize: "0.9375rem", color: palette2.text, lineHeight: 1.5, opacity: 0.85 },
      ...bodyHtml ? { dangerouslySetInnerHTML: { __html: bodyHtml } } : void 0,
      children: !bodyHtml ? body : null
    }
  ) : null;
  const mediaSection = /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    activeMedia?.type === "image" && (() => {
      const align = activeMedia.align || "center";
      const alignmentMargin = align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0 auto 0 0";
      const fullWidth = activeMedia.fullWidth !== false;
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: fullWidth ? { width: "100%" } : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          style: {
            width: fullWidth ? activeMedia.maxWidth ?? "100%" : activeMedia.maxWidth ?? "auto",
            maxWidth: fullWidth ? activeMedia.maxWidth ?? "100%" : activeMedia.maxWidth,
            margin: alignmentMargin
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              style: {
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${palette2.border}`,
                backgroundColor: palette2.mediaBg
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "img",
                {
                  src: activeMedia.url,
                  alt: activeMedia.alt ?? "Embedded media",
                  style: { display: "block", width: "100%", height: "auto" },
                  loading: "lazy"
                }
              )
            }
          )
        }
      ) });
    })(),
    activeMedia?.type === "video" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "div",
      {
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          MediaPlayer,
          {
            src: activeMedia.url,
            poster: activeMedia.poster,
            alt: activeMedia.alt,
            qualities: activeMedia.qualities,
            autoPlay: activeMedia.autoPlay,
            onQualityChange: (q) => {
              if (activeMedia) {
                setActiveMedia({ ...activeMedia, url: q.src });
              }
            }
          }
        )
      }
    ),
    activeMedia?.type === "iframe" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IframeWrapper, { media: activeMedia, palette: palette2, theme }),
    activeMedia?.type === "link" && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "a",
      {
        href: activeMedia.url,
        target: linkTarget,
        rel: linkTarget === "_blank" ? "noopener noreferrer" : void 0,
        style: {
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 12,
          border: `1px solid ${palette2.border}`,
          textDecoration: "none",
          color: "inherit",
          backgroundColor: palette2.background,
          transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = theme === "dark" ? "0 4px 12px rgba(0, 0, 0, 0.4)" : "0 4px 12px rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.borderColor = palette2.text;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = palette2.border;
        },
        children: [
          activeMedia.poster && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { width: "100%", height: 260, overflow: "hidden", backgroundColor: palette2.mediaBg }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "img",
            {
              src: activeMedia.poster,
              alt: "",
              style: { width: "100%", height: "100%", objectFit: "cover" }
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { padding: "18px 20px", display: "flex", flexDirection: "column", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: palette2.muted, opacity: 0.8 }, children: (() => {
              try {
                return new URL(activeMedia.url).hostname.replace("www.", "");
              } catch {
                return "";
              }
            })() }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { fontSize: "1.0625rem", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.01em", color: palette2.text }, children: activeMedia.alt })
          ] })
        ]
      }
    )
  ] });
  const pollSection = pollData ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { marginTop: 4, display: "flex", flexDirection: "column", gap: 10 }, children: [
    pollData.options.map((option) => {
      const percentage = pollData.total_vote_count > 0 && typeof option.vote_count === "number" ? Math.round(option.vote_count / pollData.total_vote_count * 100) : 0;
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        "div",
        {
          style: {
            position: "relative",
            padding: "12px 16px",
            borderRadius: 10,
            border: `1px solid ${palette2.border}`,
            backgroundColor: palette2.background,
            overflow: "hidden",
            transition: "border-color 0.2s"
          },
          children: [
            pollData.total_vote_count > 0 && typeof option.vote_count === "number" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "div",
              {
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${percentage}%`,
                  // In a real app we'd convert hex to rgba or use CSS vars more cleanly
                  // For now, we fallback to a generic overlay
                  background: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.04)",
                  zIndex: 0,
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", fontSize: "0.9375rem", fontWeight: 500, color: palette2.text }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: option.text }),
              typeof option.vote_count === "number" && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { style: { color: palette2.muted, fontWeight: 600 }, children: [
                percentage,
                "%"
              ] })
            ] })
          ]
        },
        option.id
      );
    }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { fontSize: "0.8125rem", color: palette2.muted, marginTop: 2, fontWeight: 500 }, children: [
      pollData.total_vote_count.toLocaleString(),
      " ",
      pollData.total_vote_count === 1 ? "vote" : "votes",
      " \xB7 ",
      pollData.is_prediction ? "Prediction" : "Poll"
    ] })
  ] }) : null;
  const childrenSection = children ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { padding: disableCard ? 0 : "0 20px" }, children }) : null;
  const childrenMediaSection = children ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { width: "100%" }, children }) : null;
  const mediaSlot = childrenPlacement === "media" ? childrenMediaSection : mediaSection;
  const trailingChildren = childrenPlacement === "media" ? null : childrenSection;
  const footerSection = footerMeta.length > 0 || href && ctaLabel ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "footer",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        marginTop: 4
      },
      children: [
        footerMeta.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" }, children: footerMeta.map((item) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { style: { fontSize: "0.8125rem", color: palette2.muted, fontWeight: 500 }, children: [
          item.label,
          ": ",
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { style: { color: palette2.text, fontWeight: 600 }, children: item.value })
        ] }, item.label)) }),
        footerChildren,
        href && ctaLabel && showCTA && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "a",
          {
            href,
            target: linkTarget,
            rel: linkTarget === "_blank" ? "noopener noreferrer" : void 0,
            style: {
              color: ctaButtonTextColor,
              border: `1.5px solid ${usePlatformButtonColor ? platformColor : palette2.border}`,
              padding: "9px 18px",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              backgroundColor: usePlatformButtonColor ? platformColor : palette2.background,
              display: "inline-flex",
              alignItems: "center",
              gap: 8
            },
            onMouseEnter: (e) => {
              if (usePlatformButtonColor) {
                e.currentTarget.style.backgroundColor = platformColor;
                e.currentTarget.style.borderColor = platformColor;
                e.currentTarget.style.color = ctaButtonTextColor;
              } else {
                e.currentTarget.style.backgroundColor = palette2.linkHoverBg;
                e.currentTarget.style.borderColor = palette2.text;
              }
              e.currentTarget.style.transform = "translateY(-1px)";
            },
            onMouseLeave: (e) => {
              if (usePlatformButtonColor) {
                e.currentTarget.style.backgroundColor = platformColor;
                e.currentTarget.style.borderColor = platformColor;
                e.currentTarget.style.color = ctaButtonTextColor;
              } else {
                e.currentTarget.style.backgroundColor = palette2.background;
                e.currentTarget.style.borderColor = palette2.border;
              }
              e.currentTarget.style.transform = "translateY(0)";
            },
            children: [
              ctaLabelIconPosition === "before" && ctaIcon,
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: ctaLabel }),
              ctaLabelIconPosition === "after" && ctaIcon
            ]
          }
        )
      ]
    }
  ) : null;
  const classicContent = /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    headerSection,
    titleSection,
    metaSection,
    bodySection,
    mediaSlot,
    pollSection,
    trailingChildren,
    footerSection
  ] });
  const modernContent = /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    mediaSlot,
    headerSection,
    titleSection,
    metaSection,
    bodySection,
    pollSection,
    trailingChildren,
    footerSection
  ] });
  const cardContent = resolvedLayout === "modern" ? modernContent : classicContent;
  if (isCardLink) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "a",
      {
        href,
        target: linkTarget,
        rel: linkTarget === "_blank" ? "noopener noreferrer" : void 0,
        className,
        style: {
          ...baseCardStyle,
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          display: "grid",
          lineHeight: "normal"
        },
        onMouseEnter: (e) => {
          if (!disableCard) {
            e.currentTarget.style.boxShadow = palette2.hoverShadow;
            e.currentTarget.style.transform = "translateY(-2px)";
          }
        },
        onMouseLeave: (e) => {
          if (!disableCard) {
            e.currentTarget.style.boxShadow = palette2.shadow;
            e.currentTarget.style.transform = "translateY(0)";
          }
        },
        children: cardContent
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("article", { className, style: { ...baseCardStyle }, children: cardContent });
}
function IframeWrapper({ media, palette: palette2, theme }) {
  const [active, setActive] = import_react3.default.useState(!media.poster);
  const align = media.align || "center";
  const frame = media.frame !== false;
  const fullWidth = media.fullWidth !== false;
  import_react3.default.useEffect(() => {
    if (media.poster) setActive(false);
  }, [media.url, media.poster]);
  if (!active && media.poster) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        style: {
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${palette2.border}`,
          backgroundColor: palette2.mediaBg,
          height: media.height,
          aspectRatio: media.height ? void 0 : media.aspectRatio || "16/9",
          position: "relative",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        onClick: (e) => {
          e.preventDefault();
          setActive(true);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "img",
            {
              src: media.poster,
              alt: media.alt || "Preview",
              style: { width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              style: {
                zIndex: 10,
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M8 5v14l11-7z" }) })
            }
          )
        ]
      }
    );
  }
  const alignmentMargin = align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0 auto 0 0";
  const shouldRound = Boolean(frame || media.rounded);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: fullWidth ? { width: "100%" } : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "div",
    {
      style: {
        width: fullWidth ? media.maxWidth ?? "100%" : media.maxWidth ?? "auto",
        maxWidth: fullWidth ? media.maxWidth ?? "100%" : media.maxWidth,
        margin: alignmentMargin
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          style: {
            borderRadius: shouldRound ? 12 : 0,
            overflow: "hidden",
            border: frame ? `1px solid ${palette2.border}` : "none",
            backgroundColor: frame ? palette2.mediaBg : media.background || (media.rounded ? palette2.background : "transparent"),
            height: media.height,
            aspectRatio: media.height ? void 0 : media.aspectRatio || "16/9",
            width: fullWidth ? "100%" : media.maxWidth ?? "auto",
            position: "relative"
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "iframe",
            {
              src: media.url,
              title: media.alt || "Embedded content",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: media.iframeRadius
              },
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              allowFullScreen: true
            }
          )
        }
      )
    }
  ) });
}

// src/components/RedditEmbed.tsx
var import_react4 = require("react");

// src/utils/format.ts
function compactNumber(value) {
  return new Intl.NumberFormat(void 0, {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}
function formatDate(epochSeconds) {
  if (!epochSeconds) return "";
  const date = new Date(epochSeconds * 1e3);
  return new Intl.DateTimeFormat(void 0, {
    dateStyle: "medium"
  }).format(date);
}
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace > 0) return `${trimmed.slice(0, lastSpace)}...`;
  return `${trimmed}...`;
}

// src/utils/reddit.ts
function extractRedditPostId(rawUrl) {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    const hostname = url.hostname.replace(/^www\./, "");
    const parts = url.pathname.split("/").filter(Boolean);
    if (hostname === "redd.it" && parts[0]) {
      return parts[0];
    }
    const commentsIndex = parts.indexOf("comments");
    if (commentsIndex !== -1 && parts[commentsIndex + 1]) {
      return parts[commentsIndex + 1] ?? null;
    }
  } catch {
    return null;
  }
  return null;
}
function buildRedditJsonUrl(postId) {
  return `https://www.reddit.com/comments/${postId}.json?raw_json=1`;
}
function normalizeRedditLink(permalink) {
  if (!permalink) return "";
  if (permalink.startsWith("http")) return permalink;
  return `https://www.reddit.com${permalink}`;
}
function extractSubredditFromUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const rIndex = parts.indexOf("r");
    if (rIndex !== -1 && parts[rIndex + 1]) {
      return `r/${parts[rIndex + 1]}`;
    }
  } catch {
  }
  return "r/unknown";
}
function pickRedditMedia(post) {
  const secureMedia = post.secure_media;
  const redditVideo = secureMedia?.reddit_video;
  const videoUrl = redditVideo?.fallback_url || redditVideo?.preview_url;
  if (videoUrl) {
    return {
      type: "video",
      url: videoUrl,
      poster: typeof redditVideo?.poster_url === "string" ? redditVideo.poster_url : void 0,
      alt: typeof post.title === "string" ? post.title : "Reddit video"
    };
  }
  if (post.post_hint === "link") {
    const thumbnail2 = typeof post.thumbnail === "string" ? post.thumbnail : void 0;
    const preview2 = post.preview;
    const resolutions = preview2?.images?.[0]?.resolutions;
    const bestPreview = resolutions ? resolutions[resolutions.length - 1]?.url : void 0;
    const highResPoster = bestPreview ? decodeHtmlEntities(bestPreview) : void 0;
    const posterUrl = highResPoster || (thumbnail2 && thumbnail2.startsWith("http") ? thumbnail2 : void 0);
    const url = typeof post.url === "string" ? post.url : "";
    if (url) {
      return {
        type: "link",
        url,
        poster: posterUrl,
        alt: typeof post.title === "string" ? post.title : "External link"
      };
    }
  }
  const preview = post.preview;
  const images = preview?.images?.[0]?.resolutions;
  const lastImage = images && images[images.length - 1]?.url;
  if (lastImage) {
    return {
      type: "image",
      url: decodeHtmlEntities(lastImage),
      alt: typeof post.title === "string" ? post.title : "Reddit post image"
    };
  }
  const thumbnail = typeof post.thumbnail === "string" ? post.thumbnail : "";
  if (thumbnail && thumbnail.startsWith("http")) {
    return {
      type: "image",
      url: thumbnail,
      alt: typeof post.title === "string" ? post.title : "Reddit post thumbnail"
    };
  }
  return void 0;
}
function pickRedditPoll(post) {
  let pollData = post.poll_data;
  if (!pollData && Array.isArray(post.crosspost_parent_list)) {
    const parent = post.crosspost_parent_list[0];
    pollData = parent?.poll_data;
  }
  if (!pollData) {
    if (JSON.stringify(post).includes("poll_data")) {
      console.warn("[RedditEmbed] poll_data key found in JSON but extraction failed.", post);
    }
    return void 0;
  }
  return {
    options: Array.isArray(pollData.options) ? pollData.options : [],
    total_vote_count: typeof pollData.total_vote_count === "number" ? pollData.total_vote_count : 0,
    voting_end_timestamp: typeof pollData.voting_end_timestamp === "number" ? pollData.voting_end_timestamp : 0,
    is_prediction: Boolean(pollData.is_prediction)
  };
}
function cleanRedditSelftext(selftext) {
  if (!selftext) return "";
  return selftext.replace(/\[View Poll\]\([^)]+\)/gi, "").trim();
}
function isRedditPostRemoved(post) {
  const removedBy = post.removed_by_category;
  const selftext = typeof post.selftext === "string" ? post.selftext : "";
  const title = typeof post.title === "string" ? post.title : "";
  const author = typeof post.author === "string" ? post.author : "";
  return Boolean(
    removedBy || selftext === "[removed]" || selftext === "[deleted]" || title === "[removed]" || title === "[deleted]" || author === "[deleted]"
  );
}
function getRedditPostType(post) {
  const subreddit = post.subreddit.toLowerCase();
  const title = post.title.toLowerCase();
  if (subreddit === "r/iama" || title.includes("ama") || title.includes("ask me anything")) {
    return "AMA";
  }
  if (post.pollData) {
    return "Poll";
  }
  if (post.media) {
    if (post.media.type === "video") return "Video";
    if (post.media.type === "image") return "Image";
    if (post.media.type === "link") return "Link";
  }
  return "Text";
}
function decodeHtmlEntities(input) {
  return input.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// src/utils/jsonp.ts
function fetchJsonp(url, callbackParam = "jsonp") {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("JSONP is only supported in the browser."));
      return;
    }
    const callbackName = `jsonp_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callbackName];
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };
    const hasQuery = url.includes("?");
    const scriptUrl = `${url}${hasQuery ? "&" : "?"}${callbackParam}=${callbackName}`;
    script.src = scriptUrl;
    script.async = true;
    script.onerror = () => {
      cleanup();
      reject(new Error(`JSONP request to ${url} failed.`));
    };
    document.head.appendChild(script);
  });
}

// src/components/RedditEmbed.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function RedditEmbed({
  url,
  maxBodyLength = 220,
  // Defaults: show everything
  showTitle = true,
  showSubreddit = true,
  showAuthor = true,
  showDate = true,
  showBody = true,
  showMedia = true,
  showUpvotes = true,
  showCommentCount = true,
  showPostType = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Reddit",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  theme,
  width,
  maxWidth,
  cardLayout,
  // Link behavior
  linkBehavior = "cta",
  linkTarget = "_blank",
  className,
  style
}) {
  const postId = (0, import_react4.useMemo)(() => extractRedditPostId(url), [url]);
  const jsonUrl = (0, import_react4.useMemo)(() => postId ? buildRedditJsonUrl(postId) : "", [postId]);
  const [state, setState] = (0, import_react4.useState)({ status: "loading" });
  (0, import_react4.useEffect)(() => {
    if (!jsonUrl) {
      setState({ status: "error", error: "Invalid Reddit URL." });
      return;
    }
    const controller = new AbortController();
    async function load() {
      try {
        setState({ status: "loading" });
        const payload = await fetchRedditPayload({
          primaryUrl: jsonUrl,
          postUrl: url,
          postId,
          signal: controller.signal
        });
        const post2 = payload.kind === "listing" ? mapListingToPost(payload.listing) : mapOEmbedToPost(payload.oembed, url);
        if (post2.isRemoved) {
          setState({ status: "removed", data: post2 });
        } else {
          setState({ status: "ok", data: post2 });
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        setState({ status: "error", error: error.message || "Unknown error." });
      }
    }
    load();
    return () => controller.abort();
  }, [jsonUrl, postId]);
  if (state.status === "loading") {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      EmbedCard,
      {
        provider: "Reddit",
        status: "loading",
        theme,
        className,
        style,
        width,
        maxWidth,
        disableCard,
        showBranding,
        layout: cardLayout
      }
    );
  }
  if (state.status === "error") {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      EmbedCard,
      {
        provider: "Reddit",
        status: "error",
        statusMessage: state.error,
        href: url,
        theme,
        className,
        style,
        width,
        maxWidth,
        disableCard,
        showBranding,
        layout: cardLayout
      }
    );
  }
  const post = state.data;
  const badges = [];
  const postType = getRedditPostType(post);
  const typeBadgeTone = postType === "AMA" || postType === "Poll" || postType === "Video" ? "accent" : "muted";
  if (showPostType) {
    badges.push({ label: postType, tone: typeBadgeTone });
  }
  if (post.isNsfw) badges.push({ label: "NSFW", tone: "alert" });
  if (post.isSpoiler) badges.push({ label: "Spoiler", tone: "accent" });
  const footerMeta = [];
  if (showUpvotes) {
    footerMeta.push({ label: "Score", value: compactNumber(post.score) });
  }
  if (showCommentCount) {
    footerMeta.push({ label: "Comments", value: compactNumber(post.numComments) });
  }
  const trimmedBody = post.selftext ? truncateText(post.selftext, maxBodyLength) : "";
  const link = normalizeRedditLink(post.permalink || post.url || url);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Reddit" : "",
      title: showTitle ? post.title : void 0,
      subtitle: showSubreddit ? post.subreddit : void 0,
      author: showAuthor ? post.author : void 0,
      timestamp: showDate ? formatDate(post.createdUtc) : void 0,
      body: showBody ? trimmedBody : void 0,
      media: showMedia ? post.media : void 0,
      pollData: showMedia ? post.pollData : void 0,
      badges,
      footerMeta,
      href: linkBehavior !== "none" ? link : void 0,
      ctaLabel: showCTA && linkBehavior === "cta" ? ctaLabel : void 0,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      linkBehavior,
      linkTarget,
      disableCard,
      theme,
      layout: cardLayout,
      width,
      maxWidth,
      status: state.status,
      statusMessage: state.status === "removed" ? "The post was removed or deleted." : void 0,
      className,
      style
    }
  );
}
async function fetchRedditPayload({
  primaryUrl,
  postUrl,
  postId,
  signal
}) {
  const targets = [];
  if (primaryUrl) targets.push(primaryUrl);
  let lastError = "Unable to reach Reddit.";
  for (const target of targets) {
    try {
      const response = await fetch(target, { signal });
      if (!response.ok) {
        lastError = response.status === 403 || response.status === 429 ? "Reddit blocked the request (403/429)." : `Reddit responded with ${response.status}`;
        continue;
      }
      const payload = await response.json();
      if (!Array.isArray(payload)) {
        lastError = "Unexpected response from Reddit.";
        continue;
      }
      return { kind: "listing", listing: payload };
    } catch (error) {
      if (error.name === "AbortError") throw error;
      if (target === primaryUrl && typeof window !== "undefined") {
        try {
          const jsonpPayload = await fetchJsonp(target, "jsonp");
          if (!Array.isArray(jsonpPayload)) {
            lastError = "Unexpected JSONP response from Reddit.";
            continue;
          }
          return { kind: "listing", listing: jsonpPayload };
        } catch (jsonpError) {
          console.warn("[RedditEmbed] JSONP failed:", jsonpError);
        }
      }
      if (error instanceof TypeError) {
        lastError = "Reddit blocked the request (CORS).";
      } else {
        lastError = error.message;
      }
    }
  }
  if (postUrl) {
    try {
      const oembedUrl = `https://www.reddit.com/oembed?url=${encodeURIComponent(postUrl)}`;
      const response = await fetch(oembedUrl, { signal });
      if (response.ok) {
        const oembed = await response.json();
        return { kind: "oembed", oembed };
      }
      lastError = `Reddit oEmbed responded with ${response.status}`;
    } catch (error) {
      if (error.name === "AbortError") throw error;
      lastError = error.message;
    }
  }
  throw new Error(lastError);
}
function mapListingToPost(listing) {
  const node = listing?.[0];
  const postData = node?.data?.children?.[0]?.data;
  if (!postData) {
    throw new Error("Unable to read the post data.");
  }
  return {
    title: typeof postData.title === "string" ? postData.title : "Untitled Reddit post",
    subreddit: typeof postData.subreddit_name_prefixed === "string" ? postData.subreddit_name_prefixed : "r/unknown",
    author: typeof postData.author === "string" ? `u/${postData.author}` : "u/unknown",
    selftext: typeof postData.selftext === "string" ? cleanRedditSelftext(postData.selftext) : "",
    createdUtc: typeof postData.created_utc === "number" ? postData.created_utc : 0,
    score: typeof postData.score === "number" ? postData.score : 0,
    numComments: typeof postData.num_comments === "number" ? postData.num_comments : 0,
    permalink: typeof postData.permalink === "string" ? postData.permalink : "",
    url: typeof postData.url === "string" ? postData.url : "",
    isNsfw: Boolean(postData.over_18),
    isSpoiler: Boolean(postData.spoiler),
    media: pickRedditMedia(postData),
    pollData: pickRedditPoll(postData),
    isRemoved: isRedditPostRemoved(postData)
  };
}
function mapOEmbedToPost(oembed, originalUrl) {
  return {
    title: oembed.title || "Reddit post",
    subreddit: extractSubredditFromUrl(originalUrl),
    author: oembed.author_name ? `u/${oembed.author_name}` : "u/unknown",
    selftext: "",
    createdUtc: 0,
    score: 0,
    numComments: 0,
    permalink: originalUrl,
    url: originalUrl,
    isNsfw: false,
    isSpoiler: false,
    media: oembed.thumbnail_url ? { type: "image", url: oembed.thumbnail_url, alt: oembed.title } : void 0,
    isRemoved: false
  };
}

// src/components/XEmbed.tsx
var import_react5 = require("react");

// src/utils/twitter.ts
function extractTweetId(url) {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    if (!hostname.includes("twitter.com") && !hostname.includes("x.com")) {
      return null;
    }
    const match = urlObj.pathname.match(/\/status(?:es)?\/(\d+)/);
    return match ? match[1] || null : null;
  } catch {
    return null;
  }
}
function normalizeTwitterUrl(url) {
  const tweetId = extractTweetId(url);
  if (!tweetId) return url;
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const statusIndex = pathParts.findIndex((p) => p === "status" || p === "statuses");
    if (statusIndex > 0 && pathParts[statusIndex - 1]) {
      const username = pathParts[statusIndex - 1];
      return `https://x.com/${username}/status/${tweetId}`;
    }
  } catch {
  }
  return url;
}
async function fetchTwitterOembed(url, params) {
  const oembedUrl = new URL("https://publish.twitter.com/oembed");
  oembedUrl.searchParams.set("url", url);
  if (params?.maxwidth) {
    oembedUrl.searchParams.set("maxwidth", String(params.maxwidth));
  }
  if (params?.hide_media) {
    oembedUrl.searchParams.set("hide_media", "1");
  }
  if (params?.hide_thread) {
    oembedUrl.searchParams.set("hide_thread", "1");
  }
  if (params?.omit_script) {
    oembedUrl.searchParams.set("omit_script", "1");
  }
  if (params?.align) {
    oembedUrl.searchParams.set("align", params.align);
  }
  if (params?.lang) {
    oembedUrl.searchParams.set("lang", params.lang);
  }
  if (params?.theme) {
    oembedUrl.searchParams.set("theme", params.theme);
  }
  if (params?.dnt) {
    oembedUrl.searchParams.set("dnt", "1");
  }
  const response = await fetch(oembedUrl.toString());
  if (!response.ok) {
    throw new Error(`X oEmbed returned ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// src/components/XEmbed.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function XEmbed({
  url,
  width,
  height,
  theme = "light",
  showBranding = true,
  showCTA = true,
  disableCard = false,
  ctaLabel = "Open on X",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  linkBehavior = "cta",
  linkTarget = "_blank",
  iframeAlignment = "center",
  constrainWidthByViewport = false,
  maxWidth = "100%",
  cardLayout
}) {
  const [data, setData] = (0, import_react5.useState)(null);
  const [error, setError] = (0, import_react5.useState)(null);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  const normalizedUrl = normalizeTwitterUrl(url);
  (0, import_react5.useEffect)(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchTwitterOembed(normalizedUrl, { theme }).then((oembed) => {
      if (mounted) {
        setData(oembed);
        setLoading(false);
      }
    }).catch((err) => {
      if (mounted) {
        console.warn("[XEmbed] Failed to fetch oEmbed:", err);
        setError("Failed to load X post");
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [normalizedUrl, theme]);
  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: iframeAlignment === "left" ? "flex-start" : iframeAlignment === "right" ? "flex-end" : "center"
  };
  const effectiveMaxWidth = constrainWidthByViewport ? "100%" : maxWidth;
  const effectiveWidth = constrainWidthByViewport ? "fit-content" : width;
  const cardStyle = {};
  if (constrainWidthByViewport) {
    if (iframeAlignment === "center") {
      cardStyle.marginLeft = "auto";
      cardStyle.marginRight = "auto";
    } else if (iframeAlignment === "left") {
      cardStyle.marginRight = "auto";
      cardStyle.marginLeft = "0";
    } else if (iframeAlignment === "right") {
      cardStyle.marginLeft = "auto";
      cardStyle.marginRight = "0";
    }
    cardStyle.alignSelf = iframeAlignment === "left" ? "flex-start" : iframeAlignment === "right" ? "flex-end" : "center";
  }
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      EmbedCard,
      {
        provider: "X (formerly Twitter)",
        title: "Loading X Post...",
        status: "loading",
        width: effectiveWidth,
        maxWidth: effectiveMaxWidth,
        theme,
        showBranding,
        showCTA,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        disableCard,
        style: cardStyle,
        layout: cardLayout
      }
    );
  }
  if (error || !data || !data.html) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      EmbedCard,
      {
        provider: "X (formerly Twitter)",
        title: "X Post",
        subtitle: normalizedUrl,
        status: "error",
        statusMessage: error || "Unable to load embedded content",
        width: effectiveWidth,
        maxWidth: effectiveMaxWidth,
        href: normalizedUrl,
        theme,
        showBranding,
        showCTA,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        disableCard,
        style: cardStyle,
        layout: cardLayout
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    EmbedCard,
    {
      provider: "X (formerly Twitter)",
      width: effectiveWidth,
      maxWidth: effectiveMaxWidth,
      theme,
      showBranding,
      showCTA,
      disableCard,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      href: normalizedUrl,
      linkBehavior,
      linkTarget,
      style: cardStyle,
      layout: cardLayout,
      childrenPlacement: "media",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("style", { children: `
                .twitter-embed-aligned iframe, 
                .twitter-embed-aligned .twitter-tweet {
                    margin-left: ${iframeAlignment === "left" ? "0 !important" : iframeAlignment === "right" ? "auto !important" : "auto !important"};
                    margin-right: ${iframeAlignment === "left" ? "auto !important" : iframeAlignment === "right" ? "0 !important" : "auto !important"};
                }
            ` }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: containerStyle, className: "twitter-embed-aligned", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "div",
          {
            style: {
              maxWidth: 550,
              // Standard max width for tweets
              width: "100%",
              // Ensure the inner native widget is aligned correctly within this wrapper
              display: "flex",
              flexDirection: "column",
              alignItems: iframeAlignment === "left" ? "flex-start" : iframeAlignment === "right" ? "flex-end" : "center"
            },
            dangerouslySetInnerHTML: { __html: data.html },
            ref: (node) => {
              if (node) {
                if (!window.twttr) {
                  const script = document.createElement("script");
                  script.src = "https://platform.twitter.com/widgets.js";
                  script.async = true;
                  script.charset = "utf-8";
                  document.body.appendChild(script);
                } else {
                  window.twttr.widgets?.load(node);
                }
              }
            }
          }
        ) })
      ]
    }
  );
}

// src/components/CardStyles.ts
function getCardContainerStyle(theme, disableCard) {
  return {
    background: disableCard ? "transparent" : theme === "dark" ? "#000000" : "#ffffff",
    borderWidth: disableCard ? 0 : "1.5px",
    borderStyle: disableCard ? "none" : "solid",
    borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgba(0,0,0,0.08)",
    borderRadius: disableCard ? 0 : 16,
    boxShadow: disableCard ? "none" : theme === "dark" ? "none" : "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
    padding: disableCard ? 0 : 20,
    display: "grid",
    gap: 12,
    overflow: "hidden",
    boxSizing: "border-box",
    width: "100%",
    margin: "0",
    transition: "box-shadow 0.2s ease, transform 0.2s ease"
  };
}
function getCardHoverStyles(theme) {
  return {
    hover: {
      boxShadow: theme === "dark" ? "0 0 0 1px rgba(255, 255, 255, 0.2)" : "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08)",
      transform: "translateY(-1px)"
    },
    rest: {
      boxShadow: theme === "dark" ? "none" : "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
      transform: "translateY(0)"
    }
  };
}
function getCtaStyle(theme) {
  return {
    color: theme === "dark" ? "#ffffff" : "#1d1d1f",
    border: `1.5px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgba(0,0,0,0.08)"}`,
    padding: "9px 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.875rem",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content"
  };
}
function getCtaHoverStyles(theme) {
  return {
    hover: {
      backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.03)",
      borderColor: theme === "dark" ? "#ffffff" : "#1d1d1f",
      transform: "translateY(-1px)"
    },
    rest: {
      backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgba(0,0,0,0.08)",
      transform: "translateY(0)"
    }
  };
}

// src/components/InstagramEmbed.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function extractPostId(url) {
  try {
    const match = url.match(/\/(p|reel|reels)\/([^\/\?]+)/);
    return match && match[2] ? match[2] : "";
  } catch {
    return "";
  }
}
function isLikelyVideo(url) {
  return url.includes("/reel") || url.includes("/reels");
}
function InstagramEmbed({
  url,
  width = "100%",
  maxWidth = 550,
  className,
  style,
  theme = "light",
  iframeAlignment = "center",
  constrainWidthByViewport = true,
  constrainWidthByEmbed = false,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Instagram",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  cardLayout
}) {
  const normalizedUrl = (url || "").split("?")[0] || "";
  const ctaHover = getCtaHoverStyles(theme);
  const ctaBaseStyle = getCtaStyle(theme);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.instagram : "currentColor";
  const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
  const postId = extractPostId(normalizedUrl);
  const isVideo = isLikelyVideo(normalizedUrl);
  if (!postId) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      EmbedCard,
      {
        provider: "Instagram",
        status: "error",
        statusMessage: "Invalid Instagram URL",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: { ...style, "--embed-accent": "#E1306C" },
        layout: cardLayout
      }
    );
  }
  const embedType = normalizedUrl.includes("/reel") || normalizedUrl.includes("/reels") ? "reel" : "p";
  const embedUrl = `https://www.instagram.com/${embedType}/${postId}/embed`;
  const embedHeight = isVideo ? 780 : 680;
  const normalizedMaxWidth = typeof maxWidth === "string" && maxWidth.trim() === "100%" ? void 0 : maxWidth;
  const fallbackCardWidth = typeof normalizedMaxWidth === "number" ? `${normalizedMaxWidth}px` : normalizedMaxWidth || "550px";
  const alignmentMargin = iframeAlignment === "center" || constrainWidthByEmbed ? "0 auto" : iframeAlignment === "right" ? "0 0 0 auto" : "0 auto 0 0";
  const heightLimit = `min(100vh, ${embedHeight}px)`;
  const computedMaxWidth = constrainWidthByViewport ? isVideo ? `min(100%, calc(${heightLimit} * 0.5625))` : `min(100%, calc(${heightLimit} * 1))` : "100%";
  const cardMaxWidth = constrainWidthByEmbed ? typeof width === "number" ? `${width}px` : width === "100%" ? fallbackCardWidth : width : maxWidth;
  const alignmentStyles = {};
  if (constrainWidthByEmbed) {
    if (iframeAlignment === "center") {
      alignmentStyles.marginLeft = "auto";
      alignmentStyles.marginRight = "auto";
    } else if (iframeAlignment === "left") {
      alignmentStyles.marginRight = "auto";
      alignmentStyles.marginLeft = "0";
    } else if (iframeAlignment === "right") {
      alignmentStyles.marginLeft = "auto";
      alignmentStyles.marginRight = "0";
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      className,
      style: {
        width,
        maxWidth: cardMaxWidth,
        ...alignmentStyles,
        ...style
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
        "div",
        {
          style: {
            ...getCardContainerStyle(theme, disableCard)
          },
          children: [
            resolvedLayout === "classic" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PlatformBranding, { provider: "Instagram", theme }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "iframe",
              {
                src: embedUrl,
                width,
                height: embedHeight,
                style: {
                  border: 0,
                  width: "100%",
                  maxWidth: computedMaxWidth,
                  margin: alignmentMargin,
                  display: "block",
                  borderRadius: disableCard ? void 0 : 8
                },
                allowTransparency: true,
                allow: "encrypted-media",
                title: "Instagram post"
              }
            ),
            resolvedLayout === "modern" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PlatformBranding, { provider: "Instagram", theme }),
            showCTA && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              "a",
              {
                href: normalizedUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  ...ctaBaseStyle,
                  gap: 8,
                  backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.instagram : ctaBaseStyle.backgroundColor,
                  borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.instagram : ctaBaseStyle.borderColor,
                  color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                },
                onMouseEnter: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.instagram;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.instagram;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.hover.transform;
                },
                onMouseLeave: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.instagram;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.instagram;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.rest.transform;
                },
                children: [
                  ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PlatformIcon, { platform: "instagram", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: ctaLabel }),
                  ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PlatformIcon, { platform: "instagram", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" })
                ]
              }
            )
          ]
        }
      )
    }
  );
}

// src/components/BlueskyEmbed.tsx
var import_react6 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var BlueskyEmbed = ({
  url,
  width,
  height,
  linkTarget = "_blank",
  linkBehavior,
  showCTA = true,
  ctaLabel = "View on Bluesky",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  showAuthor = true,
  showHandle = true,
  showDate = true,
  showBody = true,
  showMedia = true,
  theme = "light",
  retryDelay = 5e3,
  maxRetries = 3,
  style,
  disableCard,
  maxWidth,
  showBranding = true,
  cardLayout
}) => {
  const match = url.match(/bsky\.app\/profile\/([^/]+)\/post\/([^/?#]+)/);
  const user = match ? match[1] : null;
  const postId = match ? match[2] : null;
  const [state, setState] = (0, import_react6.useState)({ status: "idle" });
  (0, import_react6.useEffect)(() => {
    if (!user || !postId) {
      setState({ status: "error" });
      return;
    }
    setState({ status: "loading" });
    let isMounted = true;
    let attempts = 0;
    const fetchData = async () => {
      try {
        attempts++;
        const postUri = `at://${user}/app.bsky.feed.post/${postId}`;
        const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(postUri)}`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch");
        const data2 = await res.json();
        if (isMounted) {
          if (data2.thread.$type === "app.bsky.feed.defs#threadViewPost") {
            const post = data2.thread.post;
            const resolveMedia = (embed) => {
              if (!embed) return void 0;
              if (embed.$type === "app.bsky.embed.images#view" && embed.images.length > 0) {
                const image = embed.images[0];
                if (!image) return void 0;
                return {
                  type: "image",
                  url: image.fullsize || image.thumb,
                  alt: image.alt
                };
              }
              if (embed.$type === "app.bsky.embed.video#view") {
                return {
                  type: "video",
                  url: embed.playlist,
                  poster: embed.thumbnail
                };
              }
              if (embed.$type === "app.bsky.embed.external#view" && embed.external.thumb) {
                return {
                  type: "image",
                  url: embed.external.thumb,
                  alt: embed.external.title
                };
              }
              if (embed.$type === "app.bsky.embed.recordWithMedia#view") {
                return resolveMedia(embed.media);
              }
              return void 0;
            };
            const recordText = post.record?.text ?? "";
            const recordCreatedAt = post.record?.createdAt ?? "";
            const authorName = post.author.displayName || post.author.handle;
            let createdAt = recordCreatedAt;
            try {
              const date = new Date(recordCreatedAt);
              createdAt = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              });
            } catch {
            }
            setState({
              status: "ok",
              data: {
                id: postId,
                text: recordText,
                authorName,
                authorHandle: post.author.handle,
                authorAvatar: post.author.avatar,
                createdAt,
                likeCount: post.likeCount ?? 0,
                repostCount: post.repostCount ?? 0,
                replyCount: post.replyCount ?? 0,
                permalink: url,
                media: resolveMedia(post.embed)
              }
            });
          } else {
            throw new Error("Post not found or blocked");
          }
        }
      } catch (e) {
        if (isMounted) {
          console.error("[BlueskyEmbed] Error:", e);
          if (attempts < maxRetries) {
            setTimeout(fetchData, retryDelay);
          } else {
            setState({ status: "error" });
          }
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [user, postId, maxRetries, retryDelay, url]);
  const platformColor = theme === "dark" ? "#ffffff" : "#0285ff";
  const platformIcon = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PlatformIcon, { platform: "bluesky", size: 16, color: platformColor, "aria-label": "Bluesky" });
  if (state.status === "error" || !state.data) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      EmbedCard,
      {
        provider: "Bluesky",
        href: url,
        status: state.status === "idle" ? "loading" : state.status,
        showCTA,
        style,
        ctaLabel,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        className: "bluesky-embed",
        width,
        maxWidth,
        platformIcon,
        showBranding,
        theme,
        layout: cardLayout
      }
    );
  }
  const { data } = state;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    EmbedCard,
    {
      provider: "Bluesky",
      href: url,
      author: showAuthor ? data.authorName : void 0,
      subtitle: showHandle && data.authorHandle ? `@${data.authorHandle}` : void 0,
      body: showBody ? data.text : void 0,
      timestamp: showDate ? data.createdAt : void 0,
      linkTarget,
      linkBehavior,
      media: showMedia ? data.media : void 0,
      showCTA,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      style: {
        ...style,
        "--embed-accent": "#0085ff"
      },
      disableCard,
      className: "bluesky-embed",
      width,
      maxWidth,
      platformIcon,
      showBranding,
      theme,
      layout: cardLayout,
      footerMeta: [
        { label: "Likes", value: data.likeCount?.toLocaleString() },
        { label: "Reposts", value: data.repostCount?.toLocaleString() },
        { label: "Replies", value: data.replyCount?.toLocaleString() }
      ].filter((m) => m.value && m.value !== "0")
    }
  );
};

// src/components/MastodonEmbed.tsx
var import_react7 = require("react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var DEFAULT_PROXY = "/api/mastodon-oembed";
var applyMastodonTheme = (html, embedTheme) => {
  return html.replace(/data-embed-url="([^"]+)"/i, (_match, url) => {
    try {
      const embedUrl = new URL(url);
      embedUrl.searchParams.set("theme", embedTheme);
      return `data-embed-url="${embedUrl.toString()}"`;
    } catch {
      return `data-embed-url="${url}"`;
    }
  });
};
var buildMastodonEmbedHtml = (statusUrl, embedTheme) => {
  const parsed = new URL(statusUrl);
  const cleanedPath = parsed.pathname.replace(/\/+$/, "");
  const embedUrl = new URL(`${cleanedPath}/embed`, parsed.origin);
  embedUrl.searchParams.set("theme", embedTheme);
  return `<blockquote class="mastodon-embed" data-embed-url="${embedUrl.toString()}"></blockquote><script data-allowed-prefixes="${parsed.origin}/" async src="${parsed.origin}/embed.js"></script>`;
};
var buildEmbedDocument = (html, id, theme) => {
  const borderColor = theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.08)";
  const background = theme === "dark" ? "#0b0b0c" : "#ffffff";
  return `<!doctype html><html><head><meta charset="utf-8"/><base target="_blank" />
<style>
html,body{margin:0;background:transparent;}
.mastodon-embed{
  max-width:100%!important;
  border:1px solid ${borderColor}!important;
  background:${background}!important;
  border-radius:12px!important;
  overflow:hidden!important;
}
</style></head><body>${html}
<script>
const report = () => {
  const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  window.parent && window.parent.postMessage({ type: "mastodon-embed-height", id: "${id}", height }, "*");
};
const delayReport = () => setTimeout(report, 300);
window.addEventListener("load", delayReport);
if (window.ResizeObserver) {
  const observer = new ResizeObserver(delayReport);
  observer.observe(document.body);
} else {
  setInterval(report, 500);
}
</script></body></html>`;
};
var extractStatusId = (statusUrl) => {
  const match = statusUrl.match(/\/(\d+)(?:[/?#]|$)/);
  return match?.[1] ?? null;
};
var stripHtml = (html) => {
  if (!html) return "";
  if (typeof window !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return (doc.body?.textContent || "").replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    } catch {
    }
  }
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").trim();
};
var ensureLinkTargets = (html) => {
  return html.replace(/<a\b([^>]*?)>/gi, (_match, attrs) => {
    let nextAttrs = attrs;
    if (!/target\s*=/.test(attrs)) {
      nextAttrs += ' target="_blank"';
    }
    if (!/rel\s*=/.test(attrs)) {
      nextAttrs += ' rel="noopener noreferrer"';
    }
    return `<a${nextAttrs}>`;
  });
};
var MastodonEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  maxHeight,
  theme = "light",
  renderMode = "card",
  linkTarget = "_blank",
  linkBehavior = "cta",
  showCTA = true,
  ctaLabel = "View on Mastodon",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  showBranding = true,
  showAuthor = true,
  showHandle = true,
  showDate = true,
  showBody = true,
  showMedia = true,
  showFavorites = true,
  showReblogs = true,
  showReplies = true,
  maxBodyLength = 500,
  disableCard = false,
  className,
  style,
  oembedProxyUrl = DEFAULT_PROXY,
  cardLayout
}) => {
  const reactId = (0, import_react7.useId)();
  const embedId = (0, import_react7.useMemo)(() => `mastodon-${reactId.replace(/[^a-z0-9]/gi, "")}`, [reactId]);
  const [state, setState] = (0, import_react7.useState)({ status: "loading" });
  const [embedHeight, setEmbedHeight] = (0, import_react7.useState)(320);
  const ctaHover = getCtaHoverStyles(theme);
  (0, import_react7.useEffect)(() => {
    const onMessage = (event) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type !== "mastodon-embed-height") return;
      if (data.id !== embedId) return;
      if (typeof data.height === "number" && data.height > 0) {
        const clamped = maxHeight ? Math.min(data.height, maxHeight) : data.height;
        setEmbedHeight(Math.min(Math.max(clamped, 200), 2e3));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [embedId, maxHeight]);
  (0, import_react7.useEffect)(() => {
    if (!url) {
      setState({ status: "error", error: "No URL provided." });
      return;
    }
    let cancelled = false;
    const fetchData = async () => {
      setState({ status: "loading" });
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          throw new Error("Invalid URL protocol.");
        }
        if (renderMode === "oembed") {
          const html = buildMastodonEmbedHtml(url, theme);
          if (cancelled) return;
          setState({ status: "ok", html });
        } else {
          const statusId = extractStatusId(url);
          if (!statusId) {
            throw new Error("Invalid Mastodon status URL.");
          }
          const apiUrl = new URL(`/api/v1/statuses/${statusId}`, parsed.origin);
          const response = await fetch(apiUrl.toString(), {
            headers: { Accept: "application/json" }
          });
          if (!response.ok) {
            throw new Error(`Mastodon API returned ${response.status}`);
          }
          const status = await response.json();
          if (cancelled) return;
          const account = status.account || {};
          const contentHtmlRaw = `${status.spoiler_text ? `<p>${status.spoiler_text}</p>` : ""}${status.content || ""}`;
          const contentHtml = ensureLinkTargets(contentHtmlRaw);
          const contentText = stripHtml(contentHtml);
          const createdAt = status.created_at ? new Date(status.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }) : "";
          const attachment = Array.isArray(status.media_attachments) ? status.media_attachments[0] : void 0;
          let media;
          if (attachment && showMedia) {
            if (attachment.type === "image" && attachment.url) {
              media = {
                type: "image",
                url: attachment.url,
                alt: attachment.description || attachment.text_url || void 0
              };
            } else if ((attachment.type === "video" || attachment.type === "gifv") && attachment.url) {
              media = {
                type: "video",
                url: attachment.url,
                poster: attachment.preview_url || void 0
              };
            }
          }
          setState({
            status: "ok",
            card: {
              authorName: account.display_name || account.username || "Mastodon",
              authorHandle: account.acct || account.username || "",
              contentHtml,
              contentText,
              createdAt,
              media,
              favorites: status.favourites_count || 0,
              reblogs: status.reblogs_count || 0,
              replies: status.replies_count || 0
            }
          });
        }
      } catch (error) {
        if (cancelled) return;
        setState({
          status: "error",
          error: error instanceof Error ? error.message : "Failed to load embed."
        });
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [url, renderMode, showMedia, theme]);
  if (state.status !== "ok") {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      EmbedCard,
      {
        provider: "Mastodon",
        href: url,
        status: state.status === "error" ? "error" : "loading",
        showCTA,
        ctaLabel,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        linkBehavior,
        linkTarget,
        className,
        style,
        disableCard,
        width,
        maxWidth,
        showBranding,
        theme,
        layout: cardLayout
      }
    );
  }
  if (renderMode === "oembed" && "html" in state) {
    const themedHtml = applyMastodonTheme(state.html || "", theme);
    const srcDoc = buildEmbedDocument(themedHtml, embedId, theme);
    const wrapperStyle = {
      width,
      maxWidth,
      ...style
    };
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className, style: { ...wrapperStyle, display: "grid", gap: 12 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "iframe",
        {
          title: "Mastodon embed",
          srcDoc,
          width: "100%",
          height: embedHeight,
          style: {
            border: 0,
            display: "block",
            borderRadius: 12,
            background: theme === "dark" ? "#0b0b0c" : "#ffffff"
          },
          loading: "lazy",
          allowFullScreen: true
        }
      ),
      showCTA && linkBehavior !== "none" && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
        "a",
        {
          href: url,
          target: linkTarget,
          rel: linkTarget === "_blank" ? "noopener noreferrer" : void 0,
          style: {
            ...getCtaStyle(theme),
            gap: 8,
            backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.mastodon : getCtaStyle(theme).backgroundColor,
            borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.mastodon : getCtaStyle(theme).borderColor,
            color: ctaUsePlatformColor ? "#ffffff" : getCtaStyle(theme).color
          },
          onMouseEnter: (e) => {
            if (ctaUsePlatformColor) {
              e.currentTarget.style.backgroundColor = PLATFORM_COLORS.mastodon;
              e.currentTarget.style.borderColor = PLATFORM_COLORS.mastodon;
              e.currentTarget.style.color = "#ffffff";
            } else {
              e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
              e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
            }
            e.currentTarget.style.transform = ctaHover.hover.transform;
          },
          onMouseLeave: (e) => {
            if (ctaUsePlatformColor) {
              e.currentTarget.style.backgroundColor = PLATFORM_COLORS.mastodon;
              e.currentTarget.style.borderColor = PLATFORM_COLORS.mastodon;
              e.currentTarget.style.color = "#ffffff";
            } else {
              e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
              e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
            }
            e.currentTarget.style.transform = ctaHover.rest.transform;
          },
          children: [
            ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              PlatformIcon,
              {
                platform: "mastodon",
                size: 14,
                color: ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.mastodon : "currentColor",
                "aria-hidden": "true",
                focusable: "false"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: ctaLabel }),
            ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              PlatformIcon,
              {
                platform: "mastodon",
                size: 14,
                color: ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.mastodon : "currentColor",
                "aria-hidden": "true",
                focusable: "false"
              }
            )
          ]
        }
      )
    ] });
  }
  if ("card" in state) {
    const { card } = state;
    const displayBody = maxBodyLength && card.contentText.length > maxBodyLength ? `${card.contentText.slice(0, maxBodyLength).trim()}\u2026` : card.contentText;
    const useHtmlBody = showBody && (!maxBodyLength || card.contentText.length <= maxBodyLength);
    const footerMeta = [
      showFavorites ? { label: "Likes", value: compactNumber(card.favorites) } : null,
      showReblogs ? { label: "Reposts", value: compactNumber(card.reblogs) } : null,
      showReplies ? { label: "Replies", value: compactNumber(card.replies) } : null
    ].filter((item) => Boolean(item?.value && item.value !== "0"));
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      EmbedCard,
      {
        provider: showBranding ? "Mastodon" : "",
        href: linkBehavior !== "none" ? url : void 0,
        author: showAuthor ? card.authorName : void 0,
        subtitle: showHandle && card.authorHandle ? `@${card.authorHandle}` : void 0,
        timestamp: showDate ? card.createdAt : void 0,
        body: showBody && !useHtmlBody ? displayBody : void 0,
        bodyHtml: useHtmlBody ? card.contentHtml : void 0,
        media: card.media ? {
          type: card.media.type,
          url: card.media.url,
          poster: card.media.poster,
          alt: card.media.alt
        } : void 0,
        footerMeta,
        showCTA,
        ctaLabel: showCTA && linkBehavior === "cta" ? ctaLabel : void 0,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        linkBehavior,
        linkTarget,
        disableCard,
        width,
        maxWidth,
        className,
        style,
        theme,
        layout: cardLayout
      }
    );
  }
  return null;
};

// src/components/ThreadsEmbed.tsx
var import_react8 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var threadsScriptPromise = null;
var loadThreadsScript = () => {
  if (typeof document === "undefined") return Promise.resolve();
  if (!threadsScriptPromise) {
    threadsScriptPromise = new Promise((resolve) => {
      const existing = document.querySelector('script[src*="threads.net/embed.js"]');
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://www.threads.net/embed.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.body.appendChild(script);
    });
  }
  return threadsScriptPromise;
};
var cleanThreadsUrl = (rawUrl) => {
  try {
    const parsed = new URL(rawUrl);
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return rawUrl.split("?")[0];
  }
};
var ThreadsEmbed = ({
  url,
  width = "100%",
  maxWidth = 540,
  className,
  style,
  theme = "light",
  showCTA = true,
  ctaLabel = "View on Threads",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  ctaAlignment = "left",
  showBranding = true,
  disableCard = false,
  cardLayout
}) => {
  const [ready, setReady] = (0, import_react8.useState)(false);
  const containerRef = (0, import_react8.useRef)(null);
  const cleanedUrl = (0, import_react8.useMemo)(() => cleanThreadsUrl(url), [url]);
  const cardHover = getCardHoverStyles(theme);
  const ctaHover = getCtaHoverStyles(theme);
  const ctaBaseStyle = getCtaStyle(theme);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.threads : "currentColor";
  const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
  (0, import_react8.useEffect)(() => {
    let cancelled = false;
    loadThreadsScript().then(() => {
      if (cancelled) return;
      setReady(true);
      const win = window;
      win.instgrm?.Embeds?.process?.();
      win.threads?.Embed?.process?.();
    });
    return () => {
      cancelled = true;
    };
  }, []);
  (0, import_react8.useEffect)(() => {
    if (!ready || !containerRef.current) return;
    const win = window;
    win.instgrm?.Embeds?.process?.();
    win.threads?.Embed?.process?.();
    const container = containerRef.current;
    const syncLayout = () => {
      const iframe = container.querySelector("iframe");
      const blockquote = container.querySelector("blockquote");
      if (iframe) {
        iframe.style.width = "100%";
        iframe.style.maxWidth = "100%";
        iframe.style.display = "block";
        iframe.style.boxSizing = "border-box";
      }
      if (iframe && blockquote) {
        blockquote.style.display = "none";
      }
    };
    syncLayout();
    const observer = new MutationObserver(syncLayout);
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [ready, cleanedUrl]);
  (0, import_react8.useEffect)(() => {
    const metaPayload = {
      provider: "Threads",
      title: null,
      subtitle: null,
      author: null,
      handle: null,
      timestamp: null,
      body: null,
      media: null,
      href: cleanedUrl,
      width,
      maxWidth,
      theme,
      showCTA
    };
  }, [cleanedUrl, maxWidth, showCTA, theme, url, width]);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width,
        maxWidth,
        display: "grid",
        gap: 12,
        ...style
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
        "div",
        {
          style: {
            ...getCardContainerStyle(theme, disableCard)
          },
          onMouseEnter: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.hover.boxShadow;
            e.currentTarget.style.transform = cardHover.hover.transform;
          },
          onMouseLeave: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.rest.boxShadow;
            e.currentTarget.style.transform = cardHover.rest.transform;
          },
          children: [
            resolvedLayout === "classic" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(PlatformBranding, { provider: "Threads", theme }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "blockquote",
              {
                className: "text-post-media",
                "data-text-post-permalink": cleanedUrl,
                "data-text-post-version": "0",
                style: {
                  margin: 0,
                  padding: 0,
                  border: "none"
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  "a",
                  {
                    href: cleanedUrl,
                    style: {
                      ...getCtaStyle(theme),
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                      lineHeight: 1.1,
                      width: "100%"
                    },
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "View on Threads"
                  }
                )
              }
            ),
            resolvedLayout === "modern" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(PlatformBranding, { provider: "Threads", theme }),
            showCTA && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
              "a",
              {
                href: cleanedUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  ...ctaBaseStyle,
                  gap: 8,
                  justifySelf: ctaAlignment === "center" ? "center" : ctaAlignment === "right" ? "end" : "start",
                  backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.threads : ctaBaseStyle.backgroundColor,
                  borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.threads : ctaBaseStyle.borderColor,
                  color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                },
                onMouseEnter: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.threads;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.threads;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.hover.transform;
                },
                onMouseLeave: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.threads;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.threads;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.rest.transform;
                },
                children: [
                  ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(PlatformIcon, { platform: "threads", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" }),
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: ctaLabel }),
                  ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(PlatformIcon, { platform: "threads", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" })
                ]
              }
            )
          ]
        }
      )
    }
  );
};

// src/components/TruthSocialEmbed.tsx
var import_react9 = require("react");
var import_jsx_runtime13 = require("react/jsx-runtime");
var DEFAULT_PROXY2 = "/api/truthsocial-oembed";
var buildTruthSocialEmbedHtml = (statusUrl) => {
  const normalizedUrl = statusUrl.replace("/posts/", "/");
  const embedUrl = `${normalizedUrl.replace(/\/+$/, "")}/embed`;
  return `<iframe src="${embedUrl}" class="truthsocial-embed" style="max-width: 100%; border: 0" width="600" allowfullscreen="allowfullscreen"></iframe><script src="https://truthsocial.com/embed.js" async="async"></script>`;
};
var buildEmbedDocument2 = (html, id, theme) => {
  const borderColor = theme === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.08)";
  const background = theme === "dark" ? "#0b0b0c" : "#ffffff";
  return `<!doctype html><html><head><meta charset="utf-8"/><base target="_blank" />
<style>
html,body{margin:0;padding:0;background:transparent;width:100%;}
body { display: flex; flex-direction: column; align-items: flex-start; }
.truthsocial-embed, iframe, blockquote {
  max-width: 100% !important;
  width: 100% !important;
  min-width: 100% !important;
  border: 1px solid ${borderColor} !important;
  background: ${background} !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  margin: 0 !important;
}
</style></head><body>${html}
<script>
const report = () => {
    // Check for the rendered element
    const el = document.body.firstElementChild; 
    let height = 0;
    if (el) {
        height = el.offsetHeight || el.scrollHeight;
    } else {
        height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    // Add a small buffer for borders/shadows if needed, or stick to exact
    if (height > 0) {
        window.parent && window.parent.postMessage({ type: "truthsocial-embed-height", id: "${id}", height }, "*");
    }
};
// Poll for height changes as dynamic content might load
const delayReport = () => setTimeout(report, 200);
window.addEventListener("load", delayReport);
// Also setup Observer
if (window.ResizeObserver) {
  const observer = new ResizeObserver(() => {
     // debounce slightly
     requestAnimationFrame(report);
  });
  observer.observe(document.body);
  if (document.body.firstElementChild) {
      observer.observe(document.body.firstElementChild);
  }
} else {
  setInterval(report, 500);
}
// Initial report
report();
</script></body></html>`;
};
var TruthSocialEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  // Full width by default as requested
  maxHeight,
  theme = "light",
  linkTarget = "_blank",
  linkBehavior = "cta",
  showCTA = true,
  ctaLabel = "View on Truth Social",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  ctaAlignment = "left",
  showBranding = true,
  disableCard = false,
  className,
  style,
  oembedProxyUrl = DEFAULT_PROXY2,
  cardLayout
}) => {
  const reactId = (0, import_react9.useId)();
  const embedId = (0, import_react9.useMemo)(() => `truthsocial-${reactId.replace(/[^a-z0-9]/gi, "")}`, [reactId]);
  const [state, setState] = (0, import_react9.useState)({ status: "loading" });
  const [embedHeight, setEmbedHeight] = (0, import_react9.useState)(400);
  const cardHover = getCardHoverStyles(theme);
  const ctaHover = getCtaHoverStyles(theme);
  const ctaBaseStyle = getCtaStyle(theme);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? "currentColor" : theme === "dark" ? "#ffffff" : "#000000";
  const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
  (0, import_react9.useEffect)(() => {
    const onMessage = (event) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type !== "truthsocial-embed-height") return;
      if (data.id !== embedId) return;
      if (typeof data.height === "number" && data.height > 0) {
        const clamped = maxHeight ? Math.min(data.height, maxHeight) : data.height;
        setEmbedHeight(Math.min(Math.max(clamped, 200), 2e3));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [embedId, maxHeight]);
  (0, import_react9.useEffect)(() => {
    if (!url) {
      setState({ status: "error", error: "No URL provided." });
      return;
    }
    let cancelled = false;
    const fetchData = async () => {
      setState({ status: "loading" });
      try {
        const parsed = new URL(url);
        if (!parsed.hostname.includes("truthsocial.com")) {
          throw new Error("Invalid Truth Social URL.");
        }
        const html = buildTruthSocialEmbedHtml(url);
        if (cancelled) return;
        setState({ status: "ok", html });
      } catch (error) {
        if (cancelled) return;
        console.error("TruthSocial embed error:", error);
        setState({
          status: "error",
          error: error instanceof Error ? error.message : "Failed to load embed."
        });
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [url]);
  if (state.status !== "ok") {
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      EmbedCard,
      {
        provider: "Truth Social",
        href: url,
        status: state.status === "error" ? "error" : "loading",
        showCTA,
        ctaLabel,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        linkBehavior,
        linkTarget,
        className,
        style,
        disableCard,
        width,
        maxWidth,
        showBranding,
        layout: cardLayout
      }
    );
  }
  const srcDoc = buildEmbedDocument2(state.html || "", embedId, theme);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      className,
      style: {
        width,
        maxWidth,
        display: "grid",
        ...style
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
        "div",
        {
          style: {
            ...getCardContainerStyle(theme, disableCard)
          },
          onMouseEnter: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.hover.boxShadow;
            e.currentTarget.style.transform = cardHover.hover.transform;
          },
          onMouseLeave: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.rest.boxShadow;
            e.currentTarget.style.transform = cardHover.rest.transform;
          },
          children: [
            resolvedLayout === "classic" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(PlatformBranding, { provider: "Truth Social", theme }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "iframe",
              {
                title: "Truth Social embed",
                srcDoc,
                width: "100%",
                height: embedHeight,
                style: {
                  border: 0,
                  display: "block",
                  borderRadius: 12,
                  background: theme === "dark" ? "#000000" : "#ffffff",
                  width: "100%",
                  boxSizing: "border-box"
                },
                loading: "lazy",
                allowFullScreen: true
              }
            ),
            resolvedLayout === "modern" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(PlatformBranding, { provider: "Truth Social", theme }),
            showCTA && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              "a",
              {
                href: url,
                target: linkTarget,
                rel: linkTarget === "_blank" ? "noopener noreferrer" : void 0,
                style: {
                  ...ctaBaseStyle,
                  gap: 8,
                  justifySelf: ctaAlignment === "center" ? "center" : ctaAlignment === "right" ? "end" : "start",
                  backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.truthSocial : ctaBaseStyle.backgroundColor,
                  borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.truthSocial : ctaBaseStyle.borderColor,
                  color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                },
                onMouseEnter: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.truthSocial;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.truthSocial;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.hover.transform;
                },
                onMouseLeave: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.truthSocial;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.truthSocial;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.rest.transform;
                },
                children: [
                  ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(PlatformIcon, { platform: "truthSocial", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: ctaLabel }),
                  ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(PlatformIcon, { platform: "truthSocial", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" })
                ]
              }
            )
          ]
        }
      )
    }
  );
};

// src/components/LinkedInEmbed.tsx
var import_react10 = require("react");
var import_jsx_runtime14 = require("react/jsx-runtime");
var DEFAULT_HEIGHT = 670;
var buildLinkedInEmbedUrl = (rawUrl, collapsed) => {
  try {
    const parsed = new URL(rawUrl);
    if (!parsed.hostname.includes("linkedin.com")) return null;
    if (parsed.pathname.startsWith("/embed/")) {
      const embedUrl2 = new URL(parsed.toString());
      embedUrl2.searchParams.set("collapsed", collapsed ? "1" : "0");
      return embedUrl2.toString();
    }
    let urnType = "share";
    let postId = void 0;
    const urnMatch = rawUrl.match(/urn:li:(share|activity|ugcPost):(\d+)/);
    if (urnMatch) {
      urnType = urnMatch[1];
      postId = urnMatch[2];
    }
    if (!postId) {
      const activityMatch = rawUrl.match(/activity-(\d+)/);
      if (activityMatch) {
        urnType = "activity";
        postId = activityMatch[1];
      }
    }
    if (!postId) {
      const ugcMatch = rawUrl.match(/ugcPost-(\d+)/);
      if (ugcMatch) {
        urnType = "ugcPost";
        postId = ugcMatch[1];
      }
    }
    if (!postId) return null;
    const embedUrl = new URL(`https://www.linkedin.com/embed/feed/update/urn:li:${urnType}:${postId}`);
    embedUrl.searchParams.set("collapsed", collapsed ? "1" : "0");
    return embedUrl.toString();
  } catch {
    return null;
  }
};
var LinkedInEmbed = ({
  url,
  width = 504,
  maxWidth = "100%",
  height = DEFAULT_HEIGHT,
  collapsed = true,
  theme = "light",
  linkTarget = "_blank",
  linkBehavior = "cta",
  showCTA = true,
  ctaLabel = "View on LinkedIn",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  ctaAlignment = "left",
  showBranding = true,
  disableCard = false,
  iframeAlignment = "center",
  maxHeight,
  constrainWidthByEmbed = false,
  className,
  style,
  cardLayout
}) => {
  const embedUrl = (0, import_react10.useMemo)(() => buildLinkedInEmbedUrl(url, collapsed), [url, collapsed]);
  const cardHover = getCardHoverStyles(theme);
  const ctaHover = getCtaHoverStyles(theme);
  const ctaBaseStyle = getCtaStyle(theme);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.linkedin : "currentColor";
  const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
  const statusMessage = !url ? "No URL provided." : embedUrl ? void 0 : "Invalid LinkedIn post URL.";
  if (!embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      EmbedCard,
      {
        provider: "LinkedIn",
        href: url,
        status: "error",
        statusMessage,
        showCTA,
        ctaLabel,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        linkBehavior,
        linkTarget,
        className,
        style,
        disableCard,
        width,
        maxWidth,
        showBranding,
        theme,
        layout: cardLayout
      }
    );
  }
  const alignmentMargin = iframeAlignment === "center" ? "0 auto" : iframeAlignment === "right" ? "0 0 0 auto" : "0 auto 0 0";
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    "div",
    {
      className,
      style: {
        width: constrainWidthByEmbed ? "fit-content" : "100%",
        maxWidth: constrainWidthByEmbed ? width : maxWidth || "100%",
        display: "grid",
        ...style
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "div",
        {
          style: {
            ...getCardContainerStyle(theme, disableCard)
          },
          onMouseEnter: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.hover.boxShadow;
            e.currentTarget.style.transform = cardHover.hover.transform;
          },
          onMouseLeave: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.rest.boxShadow;
            e.currentTarget.style.transform = cardHover.rest.transform;
          },
          children: [
            resolvedLayout === "classic" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PlatformBranding, { provider: "LinkedIn", theme }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: {
              width: "100%",
              maxHeight,
              overflow: maxHeight ? "auto" : "visible"
            }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "iframe",
              {
                title: "LinkedIn embed",
                src: embedUrl,
                width: "100%",
                height,
                style: {
                  border: 0,
                  display: "block",
                  borderRadius: 12,
                  background: theme === "dark" ? "#000000" : "#ffffff",
                  width: "100%",
                  maxWidth: 504,
                  // Enforce LinkedIn's default width
                  margin: alignmentMargin,
                  // Apply alignment to the iframe itself
                  boxSizing: "border-box"
                },
                loading: "lazy",
                allowFullScreen: true
              }
            ) }),
            resolvedLayout === "modern" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PlatformBranding, { provider: "LinkedIn", theme }),
            showCTA && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "a",
              {
                href: url,
                target: linkTarget,
                rel: linkTarget === "_blank" ? "noopener noreferrer" : void 0,
                style: {
                  ...ctaBaseStyle,
                  gap: 8,
                  justifySelf: ctaAlignment === "center" ? "center" : ctaAlignment === "right" ? "end" : "start",
                  backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.linkedin : ctaBaseStyle.backgroundColor,
                  borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.linkedin : ctaBaseStyle.borderColor,
                  color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                },
                onMouseEnter: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.linkedin;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.linkedin;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.hover.transform;
                },
                onMouseLeave: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.linkedin;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.linkedin;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.rest.transform;
                },
                children: [
                  ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PlatformIcon, { platform: "linkedin", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: ctaLabel }),
                  ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PlatformIcon, { platform: "linkedin", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" })
                ]
              }
            )
          ]
        }
      )
    }
  );
};

// src/components/BilibiliEmbed.tsx
var import_react11 = require("react");
var import_jsx_runtime15 = require("react/jsx-runtime");
var BILIBILI_COLOR = "#00a1d6";
var parseBilibiliUrl = (rawUrl, fallbackPage) => {
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.toLowerCase();
    if (!host.includes("bilibili.com") && !host.includes("b23.tv")) {
      return null;
    }
    const bvidMatch = rawUrl.match(/BV[0-9A-Za-z]+/);
    const aidMatch = rawUrl.match(/av(\d+)/i);
    const bvid = parsed.searchParams.get("bvid") || (bvidMatch ? bvidMatch[0] : void 0);
    const aid = parsed.searchParams.get("aid") || (aidMatch ? aidMatch[1] : void 0);
    const cid = parsed.searchParams.get("cid") || void 0;
    const pageParam = parsed.searchParams.get("p") || parsed.searchParams.get("page");
    const parsedPage = pageParam ? Number(pageParam) : fallbackPage;
    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : fallbackPage;
    if (!bvid && !aid) return null;
    return { bvid, aid, cid, page };
  } catch {
    return null;
  }
};
var buildEmbedUrl = (ids, options) => {
  const url = new URL("https://player.bilibili.com/player.html");
  if (ids.bvid) {
    url.searchParams.set("bvid", ids.bvid);
  } else if (ids.aid) {
    url.searchParams.set("aid", ids.aid);
  }
  if (ids.cid) {
    url.searchParams.set("cid", ids.cid);
  }
  url.searchParams.set("page", String(ids.page));
  url.searchParams.set("autoplay", options.autoplay ? "1" : "0");
  url.searchParams.set("high_quality", options.highQuality ? "1" : "0");
  url.searchParams.set("danmaku", options.danmaku ? "1" : "0");
  return url.toString();
};
var BilibiliEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  height,
  aspectRatio = "16/9",
  autoplay = false,
  highQuality = true,
  danmaku = true,
  page = 1,
  theme = "light",
  showCTA = true,
  ctaLabel = "View on Bilibili",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  showBranding = true,
  disableCard = false,
  constrainWidthByEmbed = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  cardLayout
}) => {
  const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
  const ids = (0, import_react11.useMemo)(() => parseBilibiliUrl(url, page), [url, page]);
  const embedUrl = (0, import_react11.useMemo)(() => {
    if (!ids) return null;
    return buildEmbedUrl(ids, { autoplay, highQuality, danmaku });
  }, [ids, autoplay, highQuality, danmaku]);
  if (!embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      EmbedCard,
      {
        provider: "Bilibili",
        status: "error",
        statusMessage: "Invalid Bilibili URL",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: {
          ...style,
          "--embed-accent": BILIBILI_COLOR
        },
        layout: resolvedLayout
      }
    );
  }
  const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Bilibili" : "",
      media: {
        type: "iframe",
        url: embedUrl,
        height,
        aspectRatio: height ? void 0 : aspectRatio
      },
      width: "100%",
      maxWidth: cardMaxWidth,
      disableCard,
      theme,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      href: linkBehavior !== "none" ? url : void 0,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      className,
      style: {
        ...style,
        "--embed-accent": BILIBILI_COLOR
      },
      layout: resolvedLayout
    }
  );
};

// src/components/TikTokEmbed.tsx
var import_react12 = __toESM(require("react"));

// src/utils/tiktok.ts
async function fetchTikTokOembed(url) {
  const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
  const response = await fetch(oembedUrl);
  if (!response.ok) {
    throw new Error(`TikTok oEmbed API returned ${response.status}`);
  }
  return response.json();
}
function extractTikTokVideoId(url) {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const match = path.match(/\/video\/(\d+)/) || path.match(/\/v\/(\d+)/);
    if (match) return match[1] ?? null;
    return null;
  } catch {
    return null;
  }
}

// src/components/TikTokEmbed.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function TikTokEmbed({
  url,
  width,
  height,
  theme = "light",
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on TikTok",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  showAuthor = true,
  showTitle = true,
  // Defaults based on documentation
  controls = true,
  progressBar = true,
  playButton = true,
  volumeControl = true,
  fullscreenButton = true,
  timestamp = true,
  loop = false,
  autoPlay = false,
  musicInfo = false,
  description = false,
  rel = true,
  nativeContextMenu = true,
  closedCaption = true,
  cardLayout
}) {
  const [data, setData] = (0, import_react12.useState)(null);
  const [loading, setLoading] = (0, import_react12.useState)(true);
  const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
  const videoId = import_react12.default.useMemo(() => {
    return extractTikTokVideoId(url);
  }, [url]);
  (0, import_react12.useEffect)(() => {
    if (videoId) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    let mounted = true;
    fetchTikTokOembed(url).then((oembed) => {
      if (mounted) {
        setData(oembed);
      }
    }).catch((err) => {
      if (mounted) {
        console.warn("[TikTokEmbed] Failed to fetch oEmbed metadata (non-critical):", err);
      }
    });
    return () => {
      mounted = false;
    };
  }, [url, videoId]);
  if (videoId) {
    const queryParams = new URLSearchParams({
      music_info: musicInfo ? "1" : "0",
      description: description ? "1" : "0",
      controls: controls ? "1" : "0",
      progress_bar: progressBar ? "1" : "0",
      play_button: playButton ? "1" : "0",
      volume_control: volumeControl ? "1" : "0",
      fullscreen_button: fullscreenButton ? "1" : "0",
      timestamp: timestamp ? "1" : "0",
      loop: loop ? "1" : "0",
      autoplay: autoPlay ? "1" : "0",
      rel: rel ? "1" : "0",
      native_context_menu: nativeContextMenu ? "1" : "0",
      closed_caption: closedCaption ? "1" : "0"
    });
    const iframeSrc = `https://www.tiktok.com/player/v1/${videoId}?${queryParams.toString()}`;
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      EmbedCard,
      {
        provider: "TikTok",
        title: showTitle ? data?.title || "TikTok Video" : void 0,
        author: showAuthor ? data?.author_name || "TikTok User" : void 0,
        href: url,
        width,
        theme,
        ctaLabel,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        showBranding,
        showCTA,
        disableCard,
        maxWidth: width || "100%",
        layout: resolvedLayout,
        childrenPlacement: "media",
        children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
          "div",
          {
            className: "tiktok-iframe-container",
            style: {
              position: "relative",
              width: "100%"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("style", { dangerouslySetInnerHTML: {
                __html: `
                        .tiktok-iframe-container {
                            padding-top: 177.77%; /* Default mobile vertical (9:16) */
                        }
                        @media (min-width: 768px) {
                            .tiktok-iframe-container {
                                padding-top: 56.25%; /* Desktop horizontal (16:9) */
                            }
                        }
                    `
              } }),
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                "iframe",
                {
                  src: iframeSrc,
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "8px"
                  },
                  allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen",
                  title: "TikTok Player"
                }
              )
            ]
          }
        )
      }
    );
  }
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      EmbedCard,
      {
        provider: "TikTok",
        title: "Loading TikTok...",
        status: "loading",
        width,
        theme,
        disableCard,
        showBranding,
        layout: resolvedLayout
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    EmbedCard,
    {
      provider: "TikTok",
      title: "TikTok Video",
      status: "error",
      statusMessage: "Unable to load content (Invalid URL)",
      width,
      href: url,
      theme,
      disableCard,
      showBranding,
      layout: resolvedLayout
    }
  );
}

// src/components/FacebookEmbed.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function FacebookEmbed({
  url,
  width = "100%",
  maxWidth = 550,
  className,
  style,
  theme = "light",
  constrainWidthByEmbed = false,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Facebook",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  cardLayout
}) {
  const ctaHover = getCtaHoverStyles(theme);
  const ctaBaseStyle = getCtaStyle(theme);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.facebook : "currentColor";
  const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
  if (!url) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      EmbedCard,
      {
        provider: "Facebook",
        status: "error",
        statusMessage: "Invalid Facebook URL",
        theme,
        className,
        style,
        width,
        maxWidth,
        disableCard,
        layout: cardLayout
      }
    );
  }
  const isVideoUrl = url.includes("/videos/") || url.includes("/watch/") || url.includes("/live/") || url.includes("/reel/");
  const embedBaseUrl = isVideoUrl ? "https://www.facebook.com/plugins/video.php" : "https://www.facebook.com/plugins/post.php";
  const embedUrl = `${embedBaseUrl}?href=${encodeURIComponent(url)}&show_text=true&width=500`;
  const normalizedMaxWidth = typeof maxWidth === "string" && maxWidth.trim() === "100%" ? void 0 : maxWidth;
  const fallbackCardWidth = typeof normalizedMaxWidth === "number" ? `${normalizedMaxWidth}px` : normalizedMaxWidth || "500px";
  const cardMaxWidth = constrainWidthByEmbed ? typeof width === "number" ? `${width}px` : width === "100%" ? fallbackCardWidth : width : maxWidth;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    "div",
    {
      className,
      style: {
        width,
        maxWidth: cardMaxWidth,
        ...style
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
        "div",
        {
          style: {
            ...getCardContainerStyle(theme, disableCard)
          },
          children: [
            resolvedLayout === "classic" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PlatformBranding, { provider: "Facebook", theme }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
              "iframe",
              {
                src: embedUrl,
                width: "100%",
                style: {
                  border: "none",
                  minHeight: isVideoUrl ? void 0 : "500px",
                  aspectRatio: isVideoUrl ? "16/9" : void 0,
                  borderRadius: disableCard ? void 0 : "8px",
                  overflow: "hidden"
                },
                allowFullScreen: true,
                allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share",
                title: isVideoUrl ? "Facebook Video" : "Facebook Post"
              }
            ),
            resolvedLayout === "modern" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PlatformBranding, { provider: "Facebook", theme }),
            showCTA && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
              "a",
              {
                href: url,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  ...ctaBaseStyle,
                  gap: 8,
                  backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.facebook : ctaBaseStyle.backgroundColor,
                  borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.facebook : ctaBaseStyle.borderColor,
                  color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                },
                onMouseEnter: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.facebook;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.facebook;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.hover.transform;
                },
                onMouseLeave: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.facebook;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.facebook;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.rest.transform;
                },
                children: [
                  ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PlatformIcon, { platform: "facebook", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" }),
                  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: ctaLabel }),
                  ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PlatformIcon, { platform: "facebook", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" })
                ]
              }
            )
          ]
        }
      )
    }
  );
}

// src/components/YouTubeEmbed.tsx
var import_react13 = require("react");

// src/utils/youtube.ts
function extractYouTubeVideoId(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.replace("www.", "");
    if (hostname === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      return id || null;
    }
    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const vParam = url.searchParams.get("v");
      if (vParam) return vParam;
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts[0] === "shorts" && pathParts[1]) {
        return pathParts[1];
      }
      if (pathParts[0] === "embed" && pathParts[1]) {
        return pathParts[1];
      }
      if (pathParts[0] === "v" && pathParts[1]) {
        return pathParts[1];
      }
      if (pathParts[0] === "live" && pathParts[1]) {
        return pathParts[1];
      }
    }
  } catch {
    return null;
  }
  return null;
}
function normalizeYouTubeUrl(rawUrl) {
  const videoId = extractYouTubeVideoId(rawUrl);
  if (!videoId) return rawUrl;
  return `https://www.youtube.com/watch?v=${videoId}`;
}
async function fetchYouTubeData(videoId) {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const response = await fetch(oembedUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch video metadata");
  }
  let title = "";
  let authorName = "";
  let authorUrl = "";
  let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  try {
    const data = await response.json();
    title = data.title;
    authorName = data.author_name;
    authorUrl = data.author_url;
    thumbnailUrl = data.thumbnail_url;
  } catch (e) {
    console.error("[YouTubeEmbed] Failed to parse oEmbed:", e);
    throw new Error("Failed to parse video metadata");
  }
  return {
    id: videoId,
    title,
    authorName,
    authorUrl,
    thumbnailUrl,
    permalink: `https://www.youtube.com/watch?v=${videoId}`
  };
}

// src/components/YouTubeEmbed.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var apiLoadPromise = null;
var apiReadyCallbacks = [];
function loadYouTubeAPI() {
  if (apiLoadPromise) return apiLoadPromise;
  apiLoadPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    apiReadyCallbacks.push(resolve);
    const existingCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      existingCallback?.();
      apiReadyCallbacks.forEach((cb) => cb());
      apiReadyCallbacks.length = 0;
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  });
  return apiLoadPromise;
}
function YouTubePlayer({
  videoId,
  aspectRatio = "16/9",
  autoplay = false,
  onReady,
  onStateChange,
  onError
}) {
  const containerRef = (0, import_react13.useRef)(null);
  const playerRef = (0, import_react13.useRef)(null);
  const [isReady, setIsReady] = (0, import_react13.useState)(false);
  (0, import_react13.useEffect)(() => {
    let mounted = true;
    async function initPlayer() {
      await loadYouTubeAPI();
      if (!mounted || !containerRef.current) return;
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            setIsReady(true);
            onReady?.();
          },
          onStateChange: (event) => {
            onStateChange?.(event.data);
          },
          onError: (event) => {
            onError?.(event.data);
          }
        }
      });
    }
    initPlayer();
    return () => {
      mounted = false;
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, autoplay]);
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    "div",
    {
      style: {
        position: "relative",
        width: "100%",
        aspectRatio,
        backgroundColor: "#000",
        borderRadius: "8px",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          "div",
          {
            ref: containerRef,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }
          }
        ),
        !isReady && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          "div",
          {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              fontSize: "14px"
            },
            children: "Loading player..."
          }
        )
      ]
    }
  );
}
function YouTubeEmbed({
  url,
  showTitle = true,
  showAuthor = true,
  showMedia = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "Watch on YouTube",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = true,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  width = "100%",
  maxWidth = "100%",
  linkBehavior = "cta",
  linkTarget = "_blank",
  className,
  style,
  theme = "light",
  cardLayout
}) {
  const videoId = (0, import_react13.useMemo)(() => extractYouTubeVideoId(url), [url]);
  const [state, setState] = (0, import_react13.useState)({ status: "loading" });
  const link = (0, import_react13.useMemo)(() => normalizeYouTubeUrl(url), [url]);
  const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
  (0, import_react13.useEffect)(() => {
    if (!videoId) {
      setState({ status: "error", error: "Invalid YouTube URL." });
      return;
    }
    let cancelled = false;
    async function fetchVideo() {
      setState({ status: "loading" });
      try {
        const data = await fetchYouTubeData(videoId);
        if (cancelled) return;
        if (cancelled) return;
        setState({ status: "ok", data });
      } catch (error) {
        if (cancelled) return;
        setState({
          status: "error",
          error: error.message || "Failed to load video."
        });
      }
    }
    fetchVideo();
    return () => {
      cancelled = true;
    };
  }, [videoId, url]);
  if (state.status === "loading") {
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      EmbedCard,
      {
        provider: "YouTube",
        status: "loading",
        className,
        style: {
          ...style,
          "--embed-accent": "#FF0000"
        },
        width,
        maxWidth,
        disableCard,
        showBranding,
        theme,
        layout: resolvedLayout
      }
    );
  }
  if (state.status === "error") {
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      EmbedCard,
      {
        provider: "YouTube",
        status: "error",
        statusMessage: state.error,
        href: link,
        className,
        style: {
          ...style,
          "--embed-accent": "#FF0000"
        },
        width,
        maxWidth,
        disableCard,
        showBranding,
        theme,
        layout: resolvedLayout
      }
    );
  }
  const video = state.data;
  const cardHover = getCardHoverStyles(theme);
  const ctaHover = getCtaHoverStyles(theme);
  const ctaBaseStyle = getCtaStyle(theme);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.youtube : "currentColor";
  const mediaSection = showMedia && videoId ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    YouTubePlayer,
    {
      videoId,
      aspectRatio: "16/9"
    }
  ) : null;
  const brandingSection = showBranding ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: theme === "dark" ? "#ffffff" : "#FF0000",
        fontSize: "12px",
        fontWeight: 600
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
        "YouTube"
      ]
    }
  ) : null;
  const titleSection = showTitle && video.title ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "h3",
    {
      style: {
        margin: 0,
        fontSize: "15px",
        fontWeight: 600,
        color: theme === "dark" ? "#fff" : "#0f0f0f",
        lineHeight: 1.3
      },
      children: video.title
    }
  ) : null;
  const authorSection = showAuthor && video.authorName ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "p",
    {
      style: {
        margin: 0,
        fontSize: "13px",
        color: theme === "dark" ? "#aaa" : "#606060"
      },
      children: video.authorName
    }
  ) : null;
  const ctaSection = showCTA && linkBehavior === "cta" ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    "a",
    {
      href: link,
      target: linkTarget,
      rel: "noopener noreferrer",
      style: {
        ...ctaBaseStyle,
        backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.youtube : ctaBaseStyle.backgroundColor,
        borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.youtube : ctaBaseStyle.borderColor,
        color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color,
        gap: 8
      },
      onMouseEnter: (e) => {
        if (ctaUsePlatformColor) {
          e.currentTarget.style.backgroundColor = PLATFORM_COLORS.youtube;
          e.currentTarget.style.borderColor = PLATFORM_COLORS.youtube;
          e.currentTarget.style.color = "#ffffff";
        } else {
          e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
          e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
        }
        e.currentTarget.style.transform = ctaHover.hover.transform;
      },
      onMouseLeave: (e) => {
        if (ctaUsePlatformColor) {
          e.currentTarget.style.backgroundColor = PLATFORM_COLORS.youtube;
          e.currentTarget.style.borderColor = PLATFORM_COLORS.youtube;
          e.currentTarget.style.color = "#ffffff";
        } else {
          e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
          e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
        }
        e.currentTarget.style.transform = ctaHover.rest.transform;
      },
      children: [
        ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(PlatformIcon, { platform: "youtube", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children: ctaLabel }),
        ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(PlatformIcon, { platform: "youtube", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" })
      ]
    }
  ) : null;
  const metaSection = /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { style: { padding: 0, display: "grid", gap: 6 }, children: [
    brandingSection,
    titleSection,
    authorSection
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    {
      className,
      style: {
        width,
        maxWidth,
        ...style
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        "div",
        {
          style: {
            ...getCardContainerStyle(theme, disableCard)
          },
          onMouseEnter: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.hover.boxShadow;
            e.currentTarget.style.transform = cardHover.hover.transform;
          },
          onMouseLeave: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.rest.boxShadow;
            e.currentTarget.style.transform = cardHover.rest.transform;
          },
          children: resolvedLayout === "modern" ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
            mediaSection,
            metaSection,
            ctaSection
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
            metaSection,
            mediaSection,
            ctaSection
          ] })
        }
      )
    }
  );
}

// src/components/RumbleEmbed.tsx
var import_react14 = require("react");

// src/utils/rumble.ts
function isValidRumbleUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("rumble.com");
  } catch {
    return false;
  }
}
var normalizeEmbedId = (value) => {
  const trimmed = value.trim().replace(/[^a-zA-Z0-9]/g, "");
  if (!trimmed) return void 0;
  return trimmed.startsWith("v") ? trimmed : `v${trimmed}`;
};
function extractRumbleEmbedIdFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname.toLowerCase();
    const parts = urlObj.pathname.split("/").filter(Boolean);
    if (host.includes("player.rumble.com") || host.includes("s.rumble.com")) {
      if (parts[0]) return normalizeEmbedId(parts[0]);
      return void 0;
    }
    if (urlObj.pathname.startsWith("/embed/")) {
      if (parts[1]) return normalizeEmbedId(parts[1]);
      const vParam = urlObj.searchParams.get("v");
      if (vParam) return normalizeEmbedId(vParam);
    }
    return void 0;
  } catch {
    return void 0;
  }
}
async function fetchRumbleVideoDataDirect(slugOrId) {
  const candidates = /* @__PURE__ */ new Set([slugOrId]);
  if (slugOrId.startsWith("v")) {
    candidates.add(slugOrId.slice(1));
  } else {
    candidates.add(`v${slugOrId}`);
  }
  const shards = ["u3", "u4", "u2", "u6", "u7", "u8", "u9", "u10", "u1", "u5"];
  for (const candidate of candidates) {
    for (const shard of shards) {
      const url = `https://rumble.com/embedJS/${shard}/?request=video&v=${candidate}`;
      try {
        const response = await fetch(url);
        if (!response.ok) continue;
        const text = await response.text();
        if (!text || text.trim() === "false") continue;
        try {
          const data = JSON.parse(text);
          if (data && data.u) return data;
        } catch {
          continue;
        }
      } catch {
        continue;
      }
    }
  }
  throw new Error("Direct Rumble fetch failed: No valid data found in shard sweep");
}

// src/components/RumbleEmbed.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
var RumbleEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  theme = "light",
  showTitle = true,
  showAuthor = true,
  showDate = true,
  showMedia = true,
  showBranding = true,
  ctaLabel = "Watch on Rumble",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  showDuration = false,
  showMeta = false,
  cardLayout
}) => {
  const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
  const [data, setData] = (0, import_react14.useState)(null);
  const [embedUrl, setEmbedUrl] = (0, import_react14.useState)(null);
  const [error, setError] = (0, import_react14.useState)(null);
  const [loading, setLoading] = (0, import_react14.useState)(true);
  const formatDuration = (seconds) => {
    if (!seconds) return void 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  (0, import_react14.useEffect)(() => {
    if (!url) {
      setError("No URL provided");
      setLoading(false);
      return;
    }
    if (!isValidRumbleUrl(url)) {
      setError("Invalid Rumble URL");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setEmbedUrl(null);
      try {
        const embedId = extractRumbleEmbedIdFromUrl(url);
        if (!embedId) {
          throw new Error("Rumble requires an embed URL.");
        }
        let videoData = null;
        try {
          videoData = await fetchRumbleVideoDataDirect(embedId);
        } catch (e) {
          console.warn("[Rumble] Metadata fetch failed.", e);
        }
        setEmbedUrl(`https://rumble.com/embed/${embedId}/?pub=4`);
        if (!videoData) {
          throw new Error("Failed to load Rumble metadata.");
        }
        setData({
          title: videoData.title,
          author_name: typeof videoData.author === "object" ? videoData.author.name : videoData.author,
          thumbnail_url: videoData.i,
          width: videoData.w,
          height: videoData.h,
          provider_name: "Rumble",
          provider_url: "https://rumble.com",
          embedId,
          // Extra fields
          fps: videoData.fps,
          w: videoData.w,
          h: videoData.h,
          duration: videoData.duration,
          pubDate: videoData.pubDate
        });
      } catch (e) {
        setError(e.message || "Failed to load Rumble content");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      EmbedCard,
      {
        provider: "Rumble",
        status: "loading",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style,
        layout: resolvedLayout
      }
    );
  }
  if (error || !data) {
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      EmbedCard,
      {
        provider: "Rumble",
        status: "error",
        statusMessage: error || "Unknown error",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style,
        href: url,
        layout: resolvedLayout
      }
    );
  }
  const mediaObj = embedUrl ? {
    type: "iframe",
    url: embedUrl,
    aspectRatio: "16/9",
    poster: void 0
  } : void 0;
  const footerMeta = [];
  if (showDuration && data.duration) {
    footerMeta.push({ label: "Duration", value: formatDuration(data.duration) || "" });
  }
  if (showMeta && data.fps) {
    footerMeta.push({ label: "FPS", value: Math.round(data.fps).toString() });
  }
  if (showMeta && data.w && data.h) {
    footerMeta.push({ label: "Res", value: `${data.w}x${data.h}` });
  }
  if (showDate && data.pubDate) {
  }
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    EmbedCard,
    {
      provider: "Rumble",
      title: showTitle ? data.title : void 0,
      author: showAuthor ? data.author_name : void 0,
      timestamp: showDate && data.pubDate ? new Date(data.pubDate).toLocaleDateString() : void 0,
      media: showMedia ? mediaObj : void 0,
      href: url,
      linkBehavior,
      linkTarget,
      showBranding,
      disableCard,
      width,
      maxWidth,
      theme,
      className,
      style: {
        ...style,
        "--embed-accent": "#85c742"
      },
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      footerMeta: footerMeta.length > 0 ? footerMeta : void 0,
      layout: resolvedLayout
    }
  );
};

// src/components/KickEmbed.tsx
var import_react15 = require("react");

// src/utils/kick.ts
var KICK_REGEX = /kick\.com\/([a-zA-Z0-9_]+)(?:\/videos\/([a-zA-Z0-9-]+)|\/clips\/([a-zA-Z0-9_]+))?/;
var matchKickUrl = (url) => {
  const match = url.match(KICK_REGEX);
  if (!match) return null;
  return {
    channel: match[1] || "",
    videoId: match[2],
    // Group 2 is video ID
    clipId: match[3]
    // Group 3 is clip ID
  };
};

// src/components/KickEmbed.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var KICK_COLOR = "#53FC18";
var KickEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  height = 480,
  // Default height in pixels if no aspectRatio
  theme = "light",
  showTitle = true,
  showAuthor = true,
  showDate = true,
  showThumbnail = true,
  showLiveBadge = true,
  showViews = true,
  showDescription = true,
  showCategory = true,
  showLanguage = true,
  showMature = true,
  showFollowers = true,
  showTags = true,
  showBody,
  showMedia,
  showBranding = true,
  showCTA = true,
  ctaLabel = "Watch on Kick",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  className,
  style,
  cardLayout
}) => {
  const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
  const [kickData, setKickData] = (0, import_react15.useState)(null);
  const [kickJson, setKickJson] = (0, import_react15.useState)(null);
  const [apiState, setApiState] = (0, import_react15.useState)({ loading: true, error: null });
  (0, import_react15.useEffect)(() => {
    if (!url) {
      setApiState((s) => ({ ...s, loading: false, error: "No URL provided" }));
      return;
    }
    const match = matchKickUrl(url);
    if (!match) {
      setApiState((s) => ({ ...s, loading: false, error: "Invalid Kick URL" }));
      return;
    }
    setKickData(match);
    fetchKickData(match);
  }, [url]);
  const fetchKickData = async (data) => {
    setApiState((s) => ({ ...s, loading: true, error: null }));
    try {
      let apiUrl = "";
      if (data.videoId) {
        apiUrl = `https://kick.com/api/v1/video/${data.videoId}`;
      } else if (data.clipId) {
        apiUrl = `https://kick.com/api/v2/clips/${data.clipId}`;
      } else if (data.channel) {
        apiUrl = `https://kick.com/api/v1/channels/${data.channel}`;
      }
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`Kick API Error: ${res.status}`);
      const json = await res.json();
      setKickJson(json);
      let newState = {};
      if (data.videoId) {
        const ls = json.livestream;
        newState.title = ls?.session_title || json.title || `Video ${data.videoId}`;
        newState.thumbnail = ls?.thumbnail || json.thumbnail_url;
        newState.streamUrl = json.source;
        newState.author = ls?.channel?.user?.username;
        newState.authorImage = ls?.channel?.user?.profilepic;
        newState.views = json.views;
        newState.followers = ls?.channel?.followersCount;
        newState.date = new Date(json.created_at).toLocaleDateString();
        newState.isLive = false;
        newState.category = ls?.categories?.[0]?.name;
        newState.language = ls?.language;
        newState.isMature = ls?.is_mature;
        newState.description = ls?.channel?.user?.bio;
        newState.tags = ls?.tags?.map((t) => t.name || t) || [];
      } else if (data.clipId) {
        const clip = json.clip;
        newState.title = clip.title;
        newState.thumbnail = clip.thumbnail_url;
        newState.streamUrl = clip.clip_url || clip.video_url;
        newState.author = clip.creator?.username;
        newState.authorImage = clip.creator?.profile_picture;
        newState.views = clip.views;
        newState.date = new Date(clip.created_at).toLocaleDateString();
        newState.isLive = false;
        newState.category = clip.category?.name;
        newState.isMature = clip.is_mature;
        newState.tags = [];
      } else if (data.channel) {
        newState.title = json.livestream?.session_title || `${json.user?.username}'s Channel`;
        newState.thumbnail = json.livestream?.thumbnail?.url || json.banner_image?.url;
        newState.isLive = json.livestream?.is_live || false;
        newState.views = json.livestream?.viewer_count;
        newState.followers = json.followers_count;
        newState.date = newState.isLive ? void 0 : "Offline";
        newState.description = json.livestream?.session_title || json.user?.bio || json.chatroom?.description;
        newState.category = json.recent_categories?.[0]?.name || json.livestream?.categories?.[0]?.name;
        newState.language = json.livestream?.language;
        newState.isMature = json.livestream?.is_mature;
        newState.tags = json.livestream?.tags?.map((t) => t.name || t) || [];
        if (newState.isLive) {
        } else if (json.playback_url) {
          newState.streamUrl = json.playback_url;
        }
        newState.author = json.user?.username;
        newState.authorImage = json.user?.profile_pic;
      }
      setApiState({
        loading: false,
        error: null,
        ...newState
      });
    } catch (e) {
      console.error("Kick Fetch Error:", e);
      setApiState((s) => ({ ...s, loading: false, error: e.message }));
    }
  };
  let media;
  const resolvedShowBody = showBody ?? showDescription;
  const resolvedShowMedia = showMedia ?? showThumbnail;
  if (apiState.streamUrl && resolvedShowMedia) {
    media = {
      type: "video",
      url: apiState.streamUrl,
      poster: showThumbnail ? apiState.thumbnail : void 0,
      aspectRatio: "16/9",
      autoPlay: false
    };
  } else {
    if (kickData) {
      let embedSrc = `https://player.kick.com/${kickData.channel}`;
      const params = new URLSearchParams();
      if (kickData.videoId) params.set("video", kickData.videoId);
      else if (kickData.clipId) params.set("clip", kickData.clipId);
      params.set("autoplay", "true");
      params.set("muted", "true");
      if (Array.from(params).length > 0) embedSrc += `?${params.toString()}`;
      if (resolvedShowMedia) {
        media = {
          type: "iframe",
          url: embedSrc,
          poster: showThumbnail ? apiState.thumbnail : void 0,
          aspectRatio: "16/9"
        };
      }
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className, style: { ...style, display: "flex", flexDirection: "column", gap: 12 }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Kick" : "",
      title: showTitle ? apiState.title || kickData?.channel : void 0,
      author: showAuthor ? apiState.author : void 0,
      body: resolvedShowBody ? apiState.description : void 0,
      timestamp: showDate && !apiState.isLive ? apiState.date : void 0,
      theme,
      width,
      maxWidth,
      status: apiState.loading ? "loading" : "ok",
      style: { "--embed-accent": KICK_COLOR },
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      showCTA,
      href: url,
      media,
      disableCard,
      showBranding,
      badges: [
        ...showLiveBadge && apiState.isLive ? [{ label: "LIVE", tone: "alert" }] : [],
        ...showMature && apiState.isMature ? [{ label: "18+", tone: "alert" }] : [],
        ...showViews && apiState.views ? [{ label: `${apiState.views.toLocaleString()} ${apiState.isLive ? "viewers" : "views"}` }] : [],
        ...showFollowers && apiState.followers && !apiState.isLive ? [{ label: `${apiState.followers.toLocaleString()} followers` }] : [],
        ...showCategory && apiState.category ? [{ label: apiState.category, tone: "muted" }] : [],
        ...showLanguage && apiState.language ? [{ label: apiState.language.toUpperCase(), tone: "muted" }] : []
      ],
      footerChildren: showTags && apiState.tags && apiState.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: apiState.tags.map((tag, i) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { style: {
        display: "inline-flex",
        alignItems: "center",
        fontSize: "0.75rem",
        fontWeight: 500,
        lineHeight: 1,
        padding: "5px 10px",
        borderRadius: 9999,
        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
        color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
        border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
        transition: "all 0.2s ease",
        cursor: "default"
      }, children: tag }, i)) }),
      layout: resolvedLayout
    }
  ) });
};

// src/components/DailymotionEmbed.tsx
var import_react16 = require("react");

// src/utils/dailymotion.ts
function isValidDailymotionUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("dailymotion.com") || urlObj.hostname.includes("dai.ly");
  } catch {
    return false;
  }
}
function extractVideoId(url) {
  if (!url) return void 0;
  try {
    const urlObj = new URL(url);
    const videoMatch = urlObj.pathname.match(/\/video\/([a-zA-Z0-9]+)/);
    if (videoMatch) return videoMatch[1];
    if (urlObj.hostname.includes("dai.ly")) {
      const shortMatch = urlObj.pathname.match(/^\/([a-zA-Z0-9]+)/);
      if (shortMatch) return shortMatch[1];
    }
    return void 0;
  } catch {
    return void 0;
  }
}
async function fetchDailymotionJsonp(videoId) {
  const fields = [
    "id",
    "title",
    "description",
    "owner.screenname",
    "thumbnail_url",
    "width",
    "height",
    "duration"
  ].join(",");
  const apiUrl = `https://api.dailymotion.com/video/${videoId}?fields=${fields}`;
  try {
    const data = await fetchJsonp(apiUrl);
    const ownerName = data["owner.screenname"] || "Dailymotion User";
    const width = data.width || 480;
    const height = data.height || 270;
    return {
      type: "video",
      version: "1.0",
      provider_name: "Dailymotion",
      provider_url: "https://www.dailymotion.com",
      title: data.title,
      description: data.description,
      author_name: ownerName,
      author_url: `https://www.dailymotion.com/${ownerName}`,
      width,
      height,
      html: `<iframe frameborder="0" width="${width}" height="${height}" src="https://www.dailymotion.com/embed/video/${data.id}" allowfullscreen></iframe>`,
      thumbnail_url: data.thumbnail_url,
      thumbnail_width: width,
      // Approximate
      thumbnail_height: height
    };
  } catch (e) {
    throw new Error(`Dailymotion JSONP fetch failed: ${e.message}`);
  }
}
async function fetchDailymotionData(url, useProxy = true) {
  const oembedUrl = `https://www.dailymotion.com/services/oembed?url=${encodeURIComponent(url)}`;
  if (!useProxy) {
    const videoId = extractVideoId(url);
    if (videoId) {
      try {
        const data = await fetchDailymotionJsonp(videoId);
        return data;
      } catch (e) {
        console.warn("[Dailymotion] JSONP fetch failed", e);
        throw e;
      }
    }
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3e3);
    const response = await fetch(oembedUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.warn("[Dailymotion] Direct fetch failed, falling back to proxy.", e);
  }
  const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(oembedUrl)}`;
  const proxyResponse = await fetch(proxyUrl);
  if (!proxyResponse.ok) {
    throw new Error(`Failed to fetch Dailymotion oEmbed via proxy: ${proxyResponse.status}`);
  }
  const text = await proxyResponse.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Failed to parse Dailymotion oEmbed response: ${text}`);
  }
}

// src/components/DailymotionEmbed.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var truncateText2 = (text, maxLength) => {
  if (!text) return void 0;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};
var DailymotionEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  theme = "light",
  showTitle = true,
  showAuthor = true,
  showBody = true,
  bodyMaxLength = 100,
  showMedia = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "Watch on Dailymotion",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  autoPlay = false,
  clickToPlay = true,
  cardLayout
}) => {
  const [data, setData] = (0, import_react16.useState)(null);
  const [error, setError] = (0, import_react16.useState)(null);
  const [loading, setLoading] = (0, import_react16.useState)(true);
  const [hasClicked, setHasClicked] = (0, import_react16.useState)(false);
  const cardHover = getCardHoverStyles(theme);
  const ctaHover = getCtaHoverStyles(theme);
  const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
  (0, import_react16.useEffect)(() => {
    if (!url) {
      setError("No URL provided");
      setLoading(false);
      return;
    }
    if (!isValidDailymotionUrl(url)) {
      setError("Invalid Dailymotion URL");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const oembedData = await fetchDailymotionData(url);
        setData(oembedData);
      } catch (e) {
        console.error("[DailymotionEmbed] Failed to fetch data:", e);
        setError(e.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  (0, import_react16.useEffect)(() => {
    setHasClicked(false);
  }, [url]);
  const palette2 = theme === "dark" ? {
    border: "rgba(255, 255, 255, 0.1)",
    mediaBg: "rgba(255, 255, 255, 0.05)",
    card: "#1c1c1e",
    text: "#ffffff",
    muted: "#86868b"
  } : {
    border: "rgba(0, 0, 0, 0.08)",
    mediaBg: "rgba(0, 0, 0, 0.03)",
    card: "#ffffff",
    text: "#1d1d1f",
    muted: "#86868b"
  };
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      EmbedCard,
      {
        provider: "Dailymotion",
        status: "loading",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style,
        layout: resolvedLayout
      }
    );
  }
  if (error || !data) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      EmbedCard,
      {
        provider: "Dailymotion",
        status: "error",
        statusMessage: error || "Unknown error",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style,
        href: url,
        layout: resolvedLayout
      }
    );
  }
  const videoId = extractVideoId(url);
  const aspectRatio = `${data.width}/${data.height}`;
  const bodyText = showBody ? truncateText2(data.description, bodyMaxLength) : void 0;
  const shouldShowIframe = !clickToPlay || hasClicked || autoPlay;
  const embedUrl = videoId ? `https://www.dailymotion.com/embed/video/${videoId}?autoplay=${hasClicked || autoPlay ? "1" : "0"}&mute=${hasClicked || autoPlay ? "1" : "0"}&queue-enable=false&ui-highlight=00aaff` : void 0;
  if (shouldShowIframe && embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      EmbedCard,
      {
        provider: "Dailymotion",
        title: showTitle ? data.title : void 0,
        author: showAuthor ? data.author_name : void 0,
        body: bodyText,
        media: showMedia ? {
          type: "iframe",
          url: embedUrl,
          aspectRatio
          // We don't pass poster here to prevent EmbedCard from adding its own click-to-play overlay
          // We want the iframe to load immediately since we already handled the click
        } : void 0,
        href: url,
        linkBehavior,
        linkTarget,
        showBranding,
        showCTA,
        disableCard,
        width,
        maxWidth,
        theme,
        className,
        style: {
          ...style,
          "--embed-accent": "#00aaff"
        },
        ctaLabel,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        layout: resolvedLayout
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "div",
    {
      style: {
        width,
        maxWidth,
        ...getCardContainerStyle(theme, disableCard),
        ...style,
        "--embed-accent": "#00aaff"
      },
      className,
      onMouseEnter: (e) => {
        if (disableCard) return;
        e.currentTarget.style.boxShadow = cardHover.hover.boxShadow;
        e.currentTarget.style.transform = cardHover.hover.transform;
      },
      onMouseLeave: (e) => {
        if (disableCard) return;
        e.currentTarget.style.boxShadow = cardHover.rest.boxShadow;
        e.currentTarget.style.transform = cardHover.rest.transform;
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { padding: disableCard ? 0 : 0, display: "flex", flexDirection: "column", gap: 12 }, children: [
        resolvedLayout === "modern" && showMedia && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
          "div",
          {
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setHasClicked(true);
            },
            style: {
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              border: `1px solid ${palette2.border}`,
              backgroundColor: palette2.mediaBg,
              cursor: "pointer"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                "img",
                {
                  src: data.thumbnail_url,
                  alt: data.title,
                  style: {
                    display: "block",
                    width: "100%",
                    height: "auto"
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    backgroundColor: "#00aaff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    zIndex: 2
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "white", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: "M8 5v14l11-7z" }) })
                }
              )
            ]
          }
        ),
        showBranding && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(PlatformBranding, { provider: "Dailymotion", theme }),
        showTitle && data.title && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: {
          fontSize: "1.125rem",
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: "-0.02em",
          color: palette2.text
        }, children: data.title }),
        showAuthor && data.author_name && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: {
          fontSize: "0.875rem",
          color: palette2.muted,
          fontWeight: 400
        }, children: data.author_name }),
        bodyText && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: {
          fontSize: "0.9375rem",
          color: palette2.text,
          lineHeight: 1.5,
          opacity: 0.85
        }, children: bodyText }),
        resolvedLayout === "classic" && showMedia && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
          "div",
          {
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setHasClicked(true);
            },
            style: {
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              border: `1px solid ${palette2.border}`,
              backgroundColor: palette2.mediaBg,
              cursor: "pointer"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                "img",
                {
                  src: data.thumbnail_url,
                  alt: data.title,
                  style: {
                    display: "block",
                    width: "100%",
                    height: "auto"
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    backgroundColor: "#00aaff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    zIndex: 2
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "white", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: "M8 5v14l11-7z" }) })
                }
              )
            ]
          }
        ),
        showCTA && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
        }, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
          "a",
          {
            href: url,
            target: linkTarget,
            rel: linkTarget === "_blank" ? "noopener noreferrer" : void 0,
            style: {
              ...getCtaStyle(theme),
              gap: 8,
              backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.dailymotion : getCtaStyle(theme).backgroundColor,
              borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.dailymotion : getCtaStyle(theme).borderColor,
              color: ctaUsePlatformColor ? "#ffffff" : getCtaStyle(theme).color
            },
            onMouseEnter: (e) => {
              if (ctaUsePlatformColor) {
                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.dailymotion;
                e.currentTarget.style.borderColor = PLATFORM_COLORS.dailymotion;
                e.currentTarget.style.color = "#ffffff";
              } else {
                e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
              }
              e.currentTarget.style.transform = ctaHover.hover.transform;
            },
            onMouseLeave: (e) => {
              if (ctaUsePlatformColor) {
                e.currentTarget.style.backgroundColor = PLATFORM_COLORS.dailymotion;
                e.currentTarget.style.borderColor = PLATFORM_COLORS.dailymotion;
                e.currentTarget.style.color = "#ffffff";
              } else {
                e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
              }
              e.currentTarget.style.transform = ctaHover.rest.transform;
            },
            children: [
              ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                PlatformIcon,
                {
                  platform: "dailymotion",
                  size: 14,
                  color: ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.dailymotion : "currentColor",
                  "aria-hidden": "true",
                  focusable: "false"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { children: ctaLabel }),
              ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                PlatformIcon,
                {
                  platform: "dailymotion",
                  size: 14,
                  color: ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.dailymotion : "currentColor",
                  "aria-hidden": "true",
                  focusable: "false"
                }
              )
            ]
          }
        ) })
      ] })
    }
  );
};

// src/components/OdyseeEmbed.tsx
var import_react17 = require("react");

// src/utils/odysee.ts
function isValidOdyseeUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === "odysee.com" || urlObj.hostname === "www.odysee.com";
  } catch {
    return false;
  }
}
function extractEmbedUrl(html) {
  if (!html) return void 0;
  const srcMatch = html.match(/src="([^"]+)"/);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }
  return void 0;
}
function parseOdyseeUrl(url) {
  if (!url) return { channelName: null, videoName: null };
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== "odysee.com" && urlObj.hostname !== "www.odysee.com") {
      return { channelName: null, videoName: null };
    }
    const pathSegments = urlObj.pathname.split("/").filter((segment) => segment !== "");
    let channelName = null;
    let videoName = null;
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0] || "";
      if (firstSegment.startsWith("@")) {
        channelName = firstSegment.substring(1);
        if (pathSegments.length > 1) {
          videoName = pathSegments[1] || null;
        }
      } else {
        videoName = firstSegment;
      }
    }
    return { channelName, videoName };
  } catch {
    return { channelName: null, videoName: null };
  }
}
async function fetchOdyseeData(url) {
  const { videoName, channelName } = parseOdyseeUrl(url);
  if (!videoName || !channelName) {
    throw new Error("Invalid Odysee URL format");
  }
  const cleanVideoName = decodeURIComponent((videoName || "").split(":")[0] || "").replace(/'/g, "\\'");
  const cleanChannelName = decodeURIComponent((channelName || "").split(":")[0] || "").replace(/'/g, "\\'");
  const sql = `SELECT claim_id, name, title, description, thumbnail_url, sd_hash, duration, frame_height, frame_width 
                 FROM claim 
                 WHERE name = '${cleanVideoName}' 
                 AND publisher_id IN (SELECT claim_id FROM claim WHERE name = '@${cleanChannelName}') 
                 ORDER BY release_time DESC 
                 LIMIT 1`;
  const chainqueryUrl = `https://chainquery.lbry.com/api/sql?query=${encodeURIComponent(sql)}`;
  try {
    const response = await fetch(chainqueryUrl);
    if (!response.ok) {
      throw new Error(`Chainquery failed with status ${response.status}`);
    }
    const json = await response.json();
    if (!json.success || !json.data || json.data.length === 0) {
      console.error("[Odysee] No video found in Chainquery for:", { cleanVideoName, cleanChannelName });
      throw new Error("Video not found");
    }
    const data = json.data[0];
    const streamUrl = `https://player.odycdn.com/v6/streams/${data.claim_id}/${data.sd_hash}.mp4`;
    const m3u8Url = `https://player.odycdn.com/v6/streams/${data.claim_id}/${data.sd_hash}/master.m3u8`;
    return {
      title: data.title,
      description: data.description,
      author_name: cleanChannelName,
      // Chainquery doesn't give display name, use handle
      author_url: `https://odysee.com/@${cleanChannelName}`,
      thumbnail_url: data.thumbnail_url,
      thumbnail_width: data.frame_width,
      thumbnail_height: data.frame_height,
      html: `<iframe src="https://odysee.com/$/embed/@${cleanChannelName}/${cleanVideoName}" allowfullscreen></iframe>`,
      // Fallback HTML
      version: "1.0",
      provider_name: "Odysee",
      provider_url: "https://odysee.com",
      type: "video",
      width: data.frame_width,
      height: data.frame_height,
      // Custom fields for our player
      stream_url: streamUrl,
      hls_url: m3u8Url,
      claim_id: data.claim_id
    };
  } catch (error) {
    console.error("[Odysee] Error fetching data:", error);
    throw error;
  }
}

// src/components/OdyseeEmbed.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var truncateText3 = (text, maxLength) => {
  if (!text) return void 0;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};
var ODYSEE_COLOR = "#e50914";
var OdyseeEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  theme = "light",
  showTitle = true,
  showAuthor = true,
  showBody = false,
  // Odysee oEmbed doesn't provide description
  bodyMaxLength = 100,
  showMedia = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "Watch on Odysee",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  autoPlay = false,
  clickToPlay = true,
  cardLayout
}) => {
  const [data, setData] = (0, import_react17.useState)(null);
  const [error, setError] = (0, import_react17.useState)(null);
  const [loading, setLoading] = (0, import_react17.useState)(true);
  (0, import_react17.useEffect)(() => {
    if (!url) {
      setError("No URL provided");
      setLoading(false);
      return;
    }
    if (!isValidOdyseeUrl(url)) {
      setError("Invalid Odysee URL");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const oembedData = await fetchOdyseeData(url);
        setData(oembedData);
      } catch (e) {
        console.error("[OdyseeEmbed] Failed to fetch data:", e);
        setError(e.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  const palette2 = theme === "dark" ? {
    border: "rgba(255, 255, 255, 0.1)",
    mediaBg: "rgba(255, 255, 255, 0.05)",
    card: "#1c1c1e",
    text: "#ffffff",
    muted: "#86868b"
  } : {
    border: "rgba(0, 0, 0, 0.08)",
    mediaBg: "rgba(0, 0, 0, 0.03)",
    card: "#ffffff",
    text: "#1d1d1f",
    muted: "#86868b"
  };
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      EmbedCard,
      {
        provider: "Odysee",
        status: "loading",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style,
        layout: cardLayout
      }
    );
  }
  if (error || !data) {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      EmbedCard,
      {
        provider: "Odysee",
        status: "error",
        statusMessage: error || "Unknown error",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style,
        href: url,
        layout: cardLayout
      }
    );
  }
  const aspectRatio = `${data.width}/${data.height}`;
  let embedUrl = extractEmbedUrl(data.html);
  if (embedUrl) {
    try {
      const urlObj = new URL(embedUrl);
      if (autoPlay) {
        urlObj.searchParams.set("autoplay", "true");
      }
      embedUrl = urlObj.toString();
    } catch (e) {
    }
  }
  const playbackUrl = data.hls_url || data.stream_url;
  if (playbackUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      EmbedCard,
      {
        provider: "Odysee",
        title: showTitle ? data.title : void 0,
        author: showAuthor ? data.author_name : void 0,
        body: showBody ? truncateText3(data.description, bodyMaxLength) : void 0,
        media: showMedia ? {
          type: "video",
          url: playbackUrl,
          poster: data.thumbnail_url,
          aspectRatio,
          controls: true,
          // MediaPlayer handles this
          autoPlay
        } : void 0,
        href: url,
        linkBehavior,
        linkTarget,
        showBranding,
        showCTA,
        disableCard,
        width,
        maxWidth,
        theme,
        className,
        style: {
          ...style,
          "--embed-accent": ODYSEE_COLOR
        },
        ctaLabel,
        ctaLabelIcon,
        ctaLabelIconPosition,
        ctaUsePlatformColor,
        ctaUsePlatformIconColor,
        layout: cardLayout
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    EmbedCard,
    {
      provider: "Odysee",
      title: showTitle ? data.title : void 0,
      author: showAuthor ? data.author_name : void 0,
      body: showBody ? truncateText3(data.description, bodyMaxLength) : void 0,
      media: showMedia && embedUrl ? {
        type: "iframe",
        url: embedUrl,
        aspectRatio,
        poster: data.thumbnail_url
      } : void 0,
      href: url,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      disableCard,
      width,
      maxWidth,
      theme,
      className,
      style: {
        ...style,
        "--embed-accent": ODYSEE_COLOR
      },
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      layout: cardLayout
    }
  );
};

// src/components/ArchiveOrgEmbed.tsx
var import_react18 = require("react");

// src/utils/archive.ts
var ARCHIVE_REGEX = /archive\.org\/(?:details|embed|download)\/([^\/\?#]+)/;
var matchArchiveUrl = (url) => {
  const match = url.match(ARCHIVE_REGEX);
  return match ? match[1] || null : null;
};
var cleanDescription = (html) => {
  if (!html) return "";
  let text = html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/div>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]+>/g, "");
  text = text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ").replace(/[ \t]{2,}/g, " - ");
  return text.trim();
};
var jsonpCounter = 0;
var fetchJsonp2 = (url) => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return reject(new Error("JSONP only works in browser"));
    }
    const callbackName = "archive_cb_" + ++jsonpCounter + "_" + Math.round(1e5 * Math.random());
    window[callbackName] = (data) => {
      delete window[callbackName];
      try {
        document.body.removeChild(script);
      } catch (e) {
      }
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}&callback=${callbackName}`;
    script.onerror = (e) => {
      delete window[callbackName];
      try {
        document.body.removeChild(script);
      } catch (e2) {
      }
      reject(new Error("Script load error"));
    };
    document.body.appendChild(script);
  });
};
var formatBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
var fetchArchiveData = async (id) => {
  try {
    const url = `https://archive.org/details/${id}?output=json`;
    const json = await fetchJsonp2(url);
    const metadata = json.metadata || {};
    const title = Array.isArray(metadata.title) ? metadata.title[0] : metadata.title;
    const description = Array.isArray(metadata.description) ? metadata.description[0] : metadata.description;
    const creator = Array.isArray(metadata.creator) ? metadata.creator[0] : metadata.creator;
    const date = metadata.date || metadata.publicdate || metadata.addeddate;
    const views = json.item && json.item.downloads ? json.item.downloads : metadata.views || metadata.downloads;
    let reviewCount;
    let rating;
    if (json.reviews && json.reviews.info) {
      reviewCount = parseInt(json.reviews.info.num_reviews, 10);
      rating = parseFloat(json.reviews.info.avg_rating);
    }
    let mediaFile = null;
    let mediaType = "video";
    let posterFile = null;
    let fileSize = 0;
    let filesArray = [];
    if (json.files) {
      if (Array.isArray(json.files)) {
        filesArray = json.files;
      } else {
        filesArray = Object.keys(json.files).map((key) => ({
          name: key.startsWith("/") ? key.slice(1) : key,
          ...json.files[key]
        }));
      }
    }
    if (filesArray.length > 0) {
      const vid = filesArray.find(
        (f) => (f.format === "MPEG4" || f.name.endsWith(".mp4")) && !f.name.endsWith("_512kb.mp4")
      );
      if (vid) {
        mediaFile = vid.name;
        mediaType = "video";
        fileSize = parseInt(vid.size, 10);
      } else {
        const aud = filesArray.find(
          (f) => f.format === "VBR MP3" || f.name.endsWith(".mp3")
        );
        if (aud) {
          mediaFile = aud.name;
          mediaType = "audio";
          fileSize = parseInt(aud.size, 10);
        }
      }
      const img = filesArray.find(
        (f) => f.format === "JPEG" || f.format === "PNG" || f.name.endsWith(".jpg") || f.format === "Item Image"
      );
      if (img) posterFile = img.name;
    }
    if (!mediaFile) return null;
    return {
      title: title || id,
      description: cleanDescription(description || ""),
      creator: creator || "Internet Archive",
      uploadDate: date,
      mediaUrl: mediaFile,
      mediaType,
      posterUrl: posterFile ? `https://archive.org/download/${id}/${posterFile}` : void 0,
      streamUrl: `https://archive.org/download/${id}/${mediaFile}`,
      views: views ? parseInt(views, 10) : void 0,
      size: fileSize ? formatBytes(fileSize) : void 0,
      reviewCount,
      rating
    };
  } catch (e) {
    console.error("Archive fetch error:", e);
    return null;
  }
};

// src/components/ArchiveOrgEmbed.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var truncateText4 = (text, maxLength) => {
  if (!text) return void 0;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};
var ARCHIVE_COLOR = "#333333";
var formatNumber = (num) => {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num.toString();
};
var ArchiveOrgEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  theme = "light",
  showTitle = true,
  showAuthor = true,
  showBody = false,
  showDate = true,
  showViews = true,
  showSize = true,
  showReviews = true,
  bodyMaxLength = 100,
  showMedia = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Archive.org",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  autoPlay = false,
  cardLayout
}) => {
  const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
  const [data, setData] = (0, import_react18.useState)(null);
  const [error, setError] = (0, import_react18.useState)(null);
  const [loading, setLoading] = (0, import_react18.useState)(true);
  (0, import_react18.useEffect)(() => {
    if (!url) {
      setError("No URL provided");
      setLoading(false);
      return;
    }
    const id = matchArchiveUrl(url);
    if (!id) {
      setError("Invalid Archive.org URL");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const archiveData = await fetchArchiveData(id);
        if (archiveData) {
          setData(archiveData);
        } else {
          setError("Failed to load metadata");
        }
      } catch (e) {
        console.error("[ArchiveOrgEmbed] Failed to fetch data:", e);
        setError(e.message || "Failed to load item");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      EmbedCard,
      {
        provider: "Archive.org",
        status: "loading",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style,
        layout: resolvedLayout
      }
    );
  }
  if (error || !data) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      EmbedCard,
      {
        provider: "Archive.org",
        status: "error",
        statusMessage: error || "Unknown error",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style,
        href: url,
        layout: resolvedLayout
      }
    );
  }
  const formattedDate = showDate && data.uploadDate ? new Date(data.uploadDate).toLocaleDateString(void 0, { year: "numeric", month: "long", day: "numeric" }) : void 0;
  const footerMeta = [];
  if (showViews && data.views !== void 0) footerMeta.push({ label: "Views", value: formatNumber(data.views) });
  if (showSize && data.size) footerMeta.push({ label: "Size", value: data.size });
  if (showReviews && data.reviewCount !== void 0) {
    footerMeta.push({ label: "Reviews", value: data.reviewCount.toString() });
    if (data.rating) footerMeta.push({ label: "Rating", value: data.rating.toFixed(1) + "\u2605" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    EmbedCard,
    {
      provider: "Archive.org",
      title: showTitle ? data.title : void 0,
      author: showAuthor ? data.creator : void 0,
      timestamp: formattedDate,
      body: showBody ? truncateText4(data.description, bodyMaxLength) : void 0,
      media: showMedia && data.streamUrl ? {
        type: "video",
        // MediaPlayer handles both audio and video
        url: data.streamUrl,
        poster: data.posterUrl,
        aspectRatio: data.mediaType === "audio" ? void 0 : "16/9",
        controls: true,
        autoPlay
      } : void 0,
      footerMeta: footerMeta.length > 0 ? footerMeta : void 0,
      href: url,
      linkBehavior,
      linkTarget,
      showBranding,
      disableCard,
      width,
      maxWidth,
      theme,
      className,
      style: {
        ...style,
        "--embed-accent": ARCHIVE_COLOR
      },
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      showCTA,
      layout: resolvedLayout
    }
  );
};

// src/components/TwitchEmbed.tsx
var import_react19 = require("react");

// src/utils/twitch.ts
var TWITCH_GQL_ENDPOINT = "https://gql.twitch.tv/gql";
var TWITCH_REGEX = /twitch\.tv\/(?:videos\/(\d+)|([a-zA-Z0-9_]+)(?:\/clip\/([a-zA-Z0-9-]+))?)|clips\.twitch\.tv\/([a-zA-Z0-9-]+)/;
var matchTwitchUrl = (url) => {
  const match = url.match(TWITCH_REGEX);
  if (!match) return null;
  const [_, videoId, channel, clipSlugFromChannel, clipSlugDirect] = match;
  if (videoId) {
    return { videoId };
  }
  if (clipSlugFromChannel || clipSlugDirect) {
    return { clipSlug: clipSlugFromChannel || clipSlugDirect };
  }
  if (channel) {
    return { channel };
  }
  return null;
};
var STREAM_QUERY = `
query StreamMetadata($channelLogin: String!) {
  user(login: $channelLogin) {
    id
    login
    displayName
    profileImageURL(width: 150)
    description
    stream {
      id
      title
      viewersCount
      game {
        name
      }
      type
      tags {
        tagName
        localizedName
      }
      isMature
    }
    followers {
      totalCount
    }
  }
}
`;
var VIDEO_QUERY = `
query VideoMetadata($videoId: ID!) {
  video(id: $videoId) {
    id
    title
    previewThumbnailURL(width: 640, height: 360)
    viewCount
    publishedAt
    lengthSeconds
    owner {
      login
      displayName
      profileImageURL(width: 150)
    }
    game {
      name
    }
  }
}
`;
var CLIP_QUERY = `
query ClipMetadata($slug: ID!) {
  clip(slug: $slug) {
    id
    slug
    title
    viewCount
    createdAt
    durationSeconds
    thumbnailURL
    broadcaster {
      login
      displayName
      profileImageURL(width: 150)
    }
    game {
      name
    }
  }
}
`;
var fetchTwitchData = async (data, clientId) => {
  if (!clientId) {
    throw new Error("Twitch client ID is required.");
  }
  let operationName = "";
  let query = "";
  let variables = {};
  if (data.videoId) {
    operationName = "VideoMetadata";
    query = VIDEO_QUERY;
    variables = { videoId: data.videoId };
  } else if (data.clipSlug) {
    operationName = "ClipMetadata";
    query = CLIP_QUERY;
    variables = { slug: data.clipSlug };
  } else if (data.channel) {
    operationName = "StreamMetadata";
    query = STREAM_QUERY;
    variables = { channelLogin: data.channel };
  }
  const res = await fetch(TWITCH_GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Client-Id": clientId,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables,
      operationName
    })
  });
  if (!res.ok) {
    throw new Error(`Twitch GQL Error: ${res.status}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Twitch GQL Error");
  }
  return json.data;
};

// src/components/TwitchEmbed.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
var TWITCH_COLOR = "#9146FF";
var TwitchEmbed = ({
  url,
  clientId,
  width = "100%",
  maxWidth = "100%",
  height = 480,
  theme = "light",
  showViews = true,
  showFollowers = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "Watch on Twitch",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  className,
  style,
  cardLayout
}) => {
  const resolvedLayout = useCardLayout(cardLayout) ?? "modern";
  const [twitchData, setTwitchData] = (0, import_react19.useState)(null);
  const [apiState, setApiState] = (0, import_react19.useState)({ loading: true, error: null });
  (0, import_react19.useEffect)(() => {
    if (!url) {
      setApiState((s) => ({ ...s, loading: false, error: "No URL provided" }));
      return;
    }
    const match = matchTwitchUrl(url);
    if (!match) {
      setApiState((s) => ({ ...s, loading: false, error: "Invalid Twitch URL" }));
      return;
    }
    setTwitchData(match);
    if (!clientId) {
      setApiState((s) => ({ ...s, loading: false, error: null }));
      return;
    }
    fetchData(match);
  }, [url, clientId]);
  const fetchData = async (data) => {
    setApiState((s) => ({ ...s, loading: true, error: null }));
    try {
      if (!clientId) {
        setApiState((s) => ({ ...s, loading: false, error: null }));
        return;
      }
      const result = await fetchTwitchData(data, clientId);
      let newState = {};
      if (data.videoId && result.video) {
        const v = result.video;
        newState.title = v.title;
        newState.thumbnail = v.previewThumbnailURL;
        newState.views = v.viewCount;
        newState.author = v.owner?.displayName;
        newState.authorImage = v.owner?.profileImageURL;
        newState.date = new Date(v.publishedAt).toLocaleDateString();
        newState.category = v.game?.name;
        newState.isLive = false;
      } else if (data.clipSlug && result.clip) {
        const c = result.clip;
        newState.title = c.title;
        newState.thumbnail = c.thumbnailURL;
        newState.views = c.viewCount;
        newState.author = c.broadcaster?.displayName;
        newState.authorImage = c.broadcaster?.profileImageURL;
        newState.date = new Date(c.createdAt).toLocaleDateString();
        newState.category = c.game?.name;
        newState.isLive = false;
      } else if (data.channel && result.user) {
        const u = result.user;
        const s = u.stream;
        newState.author = u.displayName;
        newState.authorImage = u.profileImageURL;
        newState.description = u.description;
        newState.followers = u.followers?.totalCount;
        if (s) {
          newState.isLive = true;
          newState.title = s.title;
          newState.views = s.viewersCount;
          newState.category = s.game?.name;
          newState.isMature = s.isMature;
        } else {
          newState.isLive = false;
          newState.date = "Offline";
          newState.title = `${u.displayName}'s Channel`;
        }
      } else {
        throw new Error("Content not found");
      }
      setApiState({
        loading: false,
        error: null,
        ...newState
      });
    } catch (e) {
      console.error("Twitch Fetch Error:", e);
      setApiState((s) => ({ ...s, loading: false, error: e.message }));
    }
  };
  let media;
  if (twitchData) {
    const parent = typeof window !== "undefined" ? window.location.hostname : "localhost";
    let embedSrc = "";
    if (twitchData.videoId) {
      embedSrc = `https://player.twitch.tv/?video=${twitchData.videoId}&parent=${parent}&autoplay=false`;
    } else if (twitchData.clipSlug) {
      embedSrc = `https://clips.twitch.tv/embed?clip=${twitchData.clipSlug}&parent=${parent}&autoplay=false`;
    } else if (twitchData.channel) {
      embedSrc = `https://player.twitch.tv/?channel=${twitchData.channel}&parent=${parent}&autoplay=false`;
    }
    if (embedSrc) {
      media = {
        type: "iframe",
        url: embedSrc,
        aspectRatio: "16/9"
        // No poster = iframe loads immediately without click-to-play overlay
      };
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className, style: { ...style, display: "flex", flexDirection: "column", gap: 12 }, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Twitch" : "",
      title: apiState.title || twitchData?.channel,
      author: apiState.author,
      body: apiState.description,
      timestamp: apiState.isLive ? void 0 : apiState.date,
      theme,
      width,
      maxWidth,
      status: apiState.loading ? "loading" : "ok",
      style: { "--embed-accent": TWITCH_COLOR },
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      showCTA,
      href: url,
      media,
      disableCard,
      showBranding,
      badges: [
        ...apiState.isLive ? [{ label: "LIVE", tone: "alert" }] : [],
        ...apiState.isMature ? [{ label: "18+", tone: "alert" }] : [],
        ...showViews && apiState.views ? [{ label: `${apiState.views.toLocaleString()} ${apiState.isLive ? "viewers" : "views"}` }] : [],
        ...showFollowers && apiState.followers && !apiState.isLive ? [{ label: `${apiState.followers.toLocaleString()} followers` }] : [],
        ...apiState.category ? [{ label: apiState.category, tone: "muted" }] : []
      ],
      layout: resolvedLayout
    }
  ) });
};

// src/components/TumblrEmbed.tsx
var import_react20 = require("react");

// src/utils/tumblr.ts
function isValidTumblrUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return hostname === "www.tumblr.com" || hostname === "tumblr.com" || hostname.endsWith(".tumblr.com");
  } catch {
    return false;
  }
}
function parseTumblrUrl(url) {
  const defaultResult = {
    blogName: "",
    postId: "",
    originalUrl: url,
    isValid: false
  };
  if (!isValidTumblrUrl(url)) {
    return defaultResult;
  }
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    const pathname = urlObj.pathname;
    const pathParts = pathname.split("/").filter((p) => p !== "");
    if (hostname === "www.tumblr.com" || hostname === "tumblr.com") {
      if (pathParts.length >= 2) {
        const blogName = pathParts[0] || "";
        const postId = pathParts[1] || "";
        const slug = pathParts[2];
        if (/^\d+$/.test(postId)) {
          return {
            blogName,
            postId,
            slug,
            originalUrl: url,
            isValid: true
          };
        }
      }
    }
    if (hostname.endsWith(".tumblr.com") && hostname !== "www.tumblr.com") {
      const blogName = hostname.replace(".tumblr.com", "");
      if (pathParts[0] === "post" && pathParts[1]) {
        const postId = pathParts[1];
        const slug = pathParts[2];
        if (/^\d+$/.test(postId)) {
          return {
            blogName,
            postId,
            slug,
            originalUrl: url,
            isValid: true
          };
        }
      }
    }
    return defaultResult;
  } catch {
    return defaultResult;
  }
}
function getTumblrApiUrl(blogName, postId) {
  return `https://${blogName}.tumblr.com/api/read/json?id=${postId}`;
}
function parseTumblrJsonp(responseText) {
  const trimmed = responseText.trim();
  const patterns = [
    /^var tumblr_api_read = (.+);?\s*$/s,
    /var tumblr_api_read\s*=\s*(\{[\s\S]*\})\s*;?\s*$/,
    /var tumblr_api_read\s*=\s*(.+?);?\s*$/s
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch {
        continue;
      }
    }
  }
  console.error("[TumblrUtils] Failed to parse JSONP. Response starts with:", trimmed.substring(0, 100));
  throw new Error("Invalid Tumblr API response format");
}
function extractPostData(apiResponse, originalUrl) {
  try {
    const data = apiResponse;
    if (!data.posts || data.posts.length === 0) {
      return null;
    }
    const post = data.posts[0];
    if (!post) return null;
    const blog = data.tumblelog || {};
    let photos;
    if (post.type === "photo") {
      if (post.photos && post.photos.length > 0) {
        photos = post.photos.map((p) => ({
          url: p["photo-url-1280"] || "",
          width: p.width || 0,
          height: p.height || 0
        }));
      } else if (post["photo-url-1280"] || post["photo-url-500"]) {
        photos = [{
          url: post["photo-url-1280"] || post["photo-url-500"] || "",
          width: 0,
          height: 0
        }];
      }
    }
    let videoUrl;
    let videoPoster;
    const body = post["regular-body"] || "";
    const npfMatch = body.match(/data-npf='([^']+)'/i);
    if (npfMatch && npfMatch[1]) {
      try {
        const npfData = JSON.parse(npfMatch[1]);
        if (npfData.type === "video") {
          videoUrl = npfData.media?.url || npfData.url;
          if (npfData.poster && npfData.poster.length > 0) {
            videoPoster = npfData.poster[0]?.url;
          }
        }
      } catch {
      }
    }
    if (!videoUrl) {
      const videoSrcMatch = body.match(/<source\s+src="([^"]+\.mp4[^"]*)"[^>]*>/i);
      if (videoSrcMatch) {
        const src = videoSrcMatch[1];
        if (src) videoUrl = src.replace(/\\/g, "");
      }
      const posterMatch = body.match(/poster="([^"]+)"/i);
      if (posterMatch) {
        const poster = posterMatch[1];
        if (poster) videoPoster = poster.replace(/\\/g, "");
      }
    }
    return {
      blogTitle: blog.title || blog.name || "",
      blogName: blog.name || "",
      blogDescription: blog.description,
      avatarUrl: blog.avatar_url_512 || blog.avatar_url_128,
      postId: post.id || "",
      postType: post.type || "regular",
      title: post["regular-title"],
      body: post["regular-body"],
      date: post.date || "",
      timestamp: post["unix-timestamp"] || 0,
      noteCount: parseInt(post["note-count"] || "0", 10),
      tags: post.tags || [],
      slug: post.slug,
      postUrl: originalUrl,
      photos,
      videoUrl,
      videoPoster,
      videoEmbed: post["video-player"],
      quoteText: post["quote-text"],
      quoteSource: post["quote-source"],
      linkUrl: post["link-url"],
      linkTitle: post["link-text"]
    };
  } catch (e) {
    console.error("[TumblrUtils] Error extracting post data:", e);
    return null;
  }
}
function formatTumblrDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return dateString;
  }
}
function formatNoteCount(count) {
  if (count >= 1e6) {
    return `${(count / 1e6).toFixed(1)}M`;
  }
  if (count >= 1e3) {
    return `${(count / 1e3).toFixed(1)}K`;
  }
  return count.toString();
}

// src/components/TumblrEmbed.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var TUMBLR_COLOR = "#001935";
var TumblrEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  theme = "light",
  showAvatar = true,
  showTitle = true,
  showBody = true,
  showMedia = true,
  showAuthor = true,
  showDate = true,
  showNotes = true,
  showTags = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Tumblr",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  cardLayout
}) => {
  const [loading, setLoading] = (0, import_react20.useState)(true);
  const [error, setError] = (0, import_react20.useState)(null);
  const [postData, setPostData] = (0, import_react20.useState)(null);
  const urlInfo = (0, import_react20.useMemo)(() => parseTumblrUrl(url), [url]);
  (0, import_react20.useEffect)(() => {
    if (!url) {
      setError("No URL provided");
      setLoading(false);
      return;
    }
    if (!isValidTumblrUrl(url)) {
      setError("Invalid Tumblr URL");
      setLoading(false);
      return;
    }
    if (!urlInfo.isValid) {
      setError("Could not parse Tumblr URL");
      setLoading(false);
      return;
    }
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = getTumblrApiUrl(urlInfo.blogName, urlInfo.postId);
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Accept": "text/javascript, application/javascript"
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        const text = await response.text();
        const jsonData = parseTumblrJsonp(text);
        const data = extractPostData(jsonData, url);
        if (!data) {
          throw new Error("Post not found");
        }
        setPostData(data);
        setLoading(false);
      } catch (e) {
        console.error("[TumblrEmbed] Error fetching post:", e);
        setError(e instanceof Error ? e.message : "Failed to load post");
        setLoading(false);
      }
    };
    fetchPost();
  }, [url, urlInfo]);
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      EmbedCard,
      {
        provider: "Tumblr",
        status: "loading",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: {
          ...style,
          "--embed-accent": TUMBLR_COLOR
        },
        layout: cardLayout
      }
    );
  }
  if (error || !postData) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      EmbedCard,
      {
        provider: "Tumblr",
        status: "error",
        statusMessage: error || "Failed to load post",
        theme,
        width,
        maxWidth,
        disableCard,
        href: url,
        className,
        style: {
          ...style,
          "--embed-accent": TUMBLR_COLOR
        },
        layout: cardLayout
      }
    );
  }
  let mediaUrl;
  let mediaPoster;
  let mediaType;
  if (postData.videoUrl) {
    mediaUrl = postData.videoUrl;
    mediaPoster = postData.videoPoster;
    mediaType = "video";
  } else if (postData.photos && postData.photos.length > 0 && postData.photos[0]) {
    mediaUrl = postData.photos[0].url;
    mediaType = "image";
  } else if (postData.body) {
    const imgMatch = postData.body.match(/src="([^"]+\.(gif|jpg|jpeg|png|webp)[^"]*)"/i);
    if (imgMatch) {
      mediaUrl = imgMatch[1];
      mediaType = "image";
    }
  }
  let description = "";
  if (postData.body) {
    const tempDiv = postData.body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    description = tempDiv.substring(0, 300);
    if (tempDiv.length > 300) {
      description += "...";
    }
  } else if (postData.quoteText) {
    description = `"${postData.quoteText}"`;
    if (postData.quoteSource) {
      description += ` \u2014 ${postData.quoteSource.replace(/<[^>]+>/g, "")}`;
    }
  } else if (postData.linkTitle) {
    description = postData.linkTitle;
  }
  const tagBadges = showTags && postData.tags.length > 0 ? postData.tags.slice(0, 5).map((tag) => ({
    label: `#${tag}`,
    tone: "muted"
  })) : void 0;
  const footerMeta = [];
  if (showNotes && postData.noteCount > 0) {
    footerMeta.push({
      label: "Notes",
      value: formatNoteCount(postData.noteCount)
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Tumblr" : "",
      title: showTitle && postData.title ? postData.title : void 0,
      subtitle: showAuthor ? postData.blogTitle : void 0,
      author: showAuthor ? postData.blogName : void 0,
      timestamp: showDate ? formatTumblrDate(postData.date) : void 0,
      body: showBody ? description : void 0,
      media: showMedia && mediaUrl ? { type: mediaType || "image", url: mediaUrl } : void 0,
      badges: tagBadges,
      footerMeta: footerMeta.length > 0 ? footerMeta : void 0,
      href: linkBehavior !== "none" ? postData.postUrl : void 0,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      disableCard,
      width,
      maxWidth,
      theme,
      status: "ok",
      className,
      style: {
        ...style,
        "--embed-accent": TUMBLR_COLOR
      },
      layout: cardLayout
    }
  );
};

// src/components/PinterestEmbed.tsx
var import_react21 = require("react");

// src/utils/pinterest.ts
function isValidPinterestUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return hostname.includes("pinterest.") || hostname === "pin.it";
  } catch {
    return false;
  }
}
function parsePinterestUrl(url) {
  const defaultResult = {
    pinId: "",
    originalUrl: url,
    isValid: false
  };
  if (!isValidPinterestUrl(url)) {
    return defaultResult;
  }
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((p) => p !== "");
    const pinIndex = pathParts.indexOf("pin");
    const nextPart = pathParts[pinIndex + 1];
    if (pinIndex !== -1 && nextPart) {
      const pinId = nextPart;
      if (/^\d+$/.test(pinId)) {
        return {
          pinId,
          originalUrl: url,
          isValid: true
        };
      }
    }
    return defaultResult;
  } catch {
    return defaultResult;
  }
}
function getPinterestApiUrl(pinId, callbackName) {
  return `https://widgets.pinterest.com/v3/pidgets/pins/info/?pin_ids=${pinId}&sub=2&base_scheme=https&callback=${callbackName}`;
}
function fetchPinterestData(pinId) {
  return new Promise((resolve, reject) => {
    const callbackName = `pinterest_callback_${Math.random().toString(36).substr(2, 9)}`;
    const script = document.createElement("script");
    window[callbackName] = (response) => {
      cleanup();
      if (response && response.status === "success" && response.data && response.data[0]) {
        const pin = response.data[0];
        const data = {
          id: pin.id,
          title: pin.title || pin.rich_metadata?.title,
          description: pin.description || pin.rich_metadata?.description,
          text: pin.text,
          link: pin.link,
          images: pin.images,
          dominantColor: pin.dominant_color,
          pinner: {
            fullName: pin.pinner?.full_name || "Pinterest User",
            username: pin.pinner?.username,
            profileUrl: pin.pinner?.profile_url,
            avatarUrl: pin.pinner?.image_small_url
          },
          stats: {
            saves: pin.aggregated_pin_data?.aggregated_stats?.saves || 0,
            comments: pin.comment_count || 0
          },
          isVideo: pin.is_video || false
        };
        resolve(data);
      } else {
        reject(new Error(response?.message || "Failed to fetch Pinterest data"));
      }
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("Network error loading Pinterest script"));
    };
    function cleanup() {
      delete window[callbackName];
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    }
    script.src = getPinterestApiUrl(pinId, callbackName);
    document.body.appendChild(script);
  });
}
function getBestImage(images) {
  if (!images) return null;
  if (images["originals"]) return images["originals"];
  const sizes = ["564x", "474x", "236x"];
  for (const size of sizes) {
    if (images[size]) return images[size];
  }
  const keys = Object.keys(images);
  const firstKey = keys[0];
  if (keys.length > 0 && firstKey) {
    const img = images[firstKey];
    return img || null;
  }
  return null;
}
function formatCount(count) {
  if (count >= 1e6) {
    return (count / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1e3) {
    return (count / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return count.toString();
}

// src/components/PinterestEmbed.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var PINTEREST_COLOR = "#E60023";
var PinterestEmbed = ({
  url,
  width = "100%",
  maxWidth = 450,
  // Pinterest cards are usually vertical and narrower
  theme = "light",
  showDescription = true,
  showMedia = true,
  showAuthor = true,
  showStats = true,
  showSaves = true,
  showBranding = true,
  showCTA = true,
  ctaLabel = "View on Pinterest",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  constrainImageWidth = false,
  imageAlignment = "center",
  imageMaxWidth,
  disableCard = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  cardLayout
}) => {
  const [loading, setLoading] = (0, import_react21.useState)(true);
  const [error, setError] = (0, import_react21.useState)(null);
  const [pinData, setPinData] = (0, import_react21.useState)(null);
  const urlInfo = (0, import_react21.useMemo)(() => parsePinterestUrl(url), [url]);
  (0, import_react21.useEffect)(() => {
    if (!url) {
      setError("No URL provided");
      setLoading(false);
      return;
    }
    if (!isValidPinterestUrl(url)) {
      setError("Invalid Pinterest URL");
      setLoading(false);
      return;
    }
    if (!urlInfo.isValid) {
      setError("Could not parse Pinterest URL");
      setLoading(false);
      return;
    }
    const fetchPin = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPinterestData(urlInfo.pinId);
        setPinData(data);
        setLoading(false);
      } catch (e) {
        console.error("[PinterestEmbed] Error fetching pin:", e);
        setError(e instanceof Error ? e.message : "Failed to load pin");
        setLoading(false);
      }
    };
    fetchPin();
  }, [url, urlInfo]);
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      EmbedCard,
      {
        provider: "Pinterest",
        status: "loading",
        theme,
        width,
        maxWidth,
        disableCard,
        showCTA,
        className,
        style: {
          ...style,
          "--embed-accent": PINTEREST_COLOR
        },
        layout: cardLayout
      }
    );
  }
  if (error || !pinData) {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      EmbedCard,
      {
        provider: "Pinterest",
        status: "error",
        statusMessage: error || "Failed to load pin",
        theme,
        width,
        maxWidth,
        disableCard,
        href: url,
        className,
        showCTA,
        style: {
          ...style,
          "--embed-accent": PINTEREST_COLOR
        },
        layout: cardLayout
      }
    );
  }
  const bestImage = getBestImage(pinData.images);
  const footerMeta = [];
  if (showStats) {
    if (showSaves && pinData.stats.saves > 0) {
      footerMeta.push({
        label: "Saves",
        value: formatCount(pinData.stats.saves)
      });
    }
    if (pinData.stats.comments > 0) {
      footerMeta.push({
        label: "Comments",
        value: formatCount(pinData.stats.comments)
      });
    }
  }
  const badges = [];
  if (pinData.isVideo) {
    badges.push({ label: "Video", tone: "accent" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Pinterest" : "",
      title: showDescription && pinData.title ? pinData.title : void 0,
      subtitle: showAuthor ? pinData.pinner.fullName : void 0,
      author: showAuthor ? pinData.pinner.username : void 0,
      body: showDescription ? pinData.description || pinData.text : void 0,
      media: showMedia && bestImage ? {
        type: "image",
        url: bestImage.url,
        maxWidth: constrainImageWidth ? imageMaxWidth ?? maxWidth : void 0,
        align: imageAlignment
        // Allow clicking image to open pin if user wants
      } : void 0,
      badges: badges.length > 0 ? badges : void 0,
      footerMeta: footerMeta.length > 0 ? footerMeta : void 0,
      href: linkBehavior !== "none" ? url : void 0,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      disableCard,
      width,
      maxWidth,
      theme,
      status: "ok",
      className,
      style: {
        ...style,
        "--embed-accent": PINTEREST_COLOR
      },
      layout: cardLayout
    }
  );
};

// src/components/TelegramEmbed.tsx
var import_react22 = require("react");

// src/utils/telegram.ts
function isValidTelegramUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === "t.me" || urlObj.hostname === "telegram.me" || urlObj.hostname === "www.t.me" || urlObj.hostname === "www.telegram.me";
  } catch {
    return false;
  }
}
function extractTelegramPostData(url) {
  if (!url) return void 0;
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    if (pathParts.length >= 2) {
      const postId = pathParts[pathParts.length - 1];
      const channel = pathParts[pathParts.length - 2];
      if (!postId || !channel) return void 0;
      if (!/^\d+$/.test(postId)) return void 0;
      return `${channel}/${postId}`;
    }
    return void 0;
  } catch {
    return void 0;
  }
}

// src/components/TelegramEmbed.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var TelegramEmbed = ({
  url,
  width = 700,
  maxWidth,
  accentColor,
  dark = false,
  className,
  style,
  showComments = true,
  disableCard = false,
  showCTA = true,
  ctaLabel = "View on Telegram",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  ctaAlignment = "left",
  embedAlignment = "center",
  showBranding = true,
  constrainWidthByEmbed = false,
  cardLayout
}) => {
  const containerRef = (0, import_react22.useRef)(null);
  const [error, setError] = (0, import_react22.useState)(null);
  const [loaded, setLoaded] = (0, import_react22.useState)(false);
  const themeValue = dark ? "dark" : "light";
  const cardHover = getCardHoverStyles(themeValue);
  const ctaHover = getCtaHoverStyles(themeValue);
  const ctaBaseStyle = getCtaStyle(themeValue);
  const ctaIconColor = ctaUsePlatformColor ? "#ffffff" : ctaUsePlatformIconColor ? PLATFORM_COLORS.telegram : "currentColor";
  const resolvedLayout = useCardLayout(cardLayout) ?? "classic";
  (0, import_react22.useEffect)(() => {
    if (!url) {
      setError("No URL provided");
      return;
    }
    if (!isValidTelegramUrl(url)) {
      setError("Invalid Telegram URL");
      return;
    }
    const postData = extractTelegramPostData(url);
    if (!postData) {
      setError("Could not extract Telegram post data");
      return;
    }
    setError(null);
    setLoaded(false);
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-post", postData);
    script.setAttribute("data-width", "100%");
    if (accentColor) {
      const color = accentColor.replace("#", "");
      script.setAttribute("data-color", color);
    }
    if (dark) {
      script.setAttribute("data-dark", "1");
    }
    if (!showComments) {
      script.setAttribute("data-comments", "0");
    }
    script.onload = () => {
      setLoaded(true);
    };
    script.onerror = () => {
      setError("Failed to load Telegram widget script");
    };
    container.appendChild(script);
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [url, accentColor, dark, showComments]);
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      EmbedCard,
      {
        provider: "Telegram",
        status: "error",
        statusMessage: error,
        width,
        maxWidth,
        className,
        style,
        disableCard,
        layout: cardLayout
      }
    );
  }
  const alignmentStyles = {
    left: "flex-start",
    center: "center",
    right: "flex-end"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "div",
    {
      className,
      style: {
        width: "100%",
        maxWidth: constrainWidthByEmbed ? width : maxWidth || "100%",
        display: "grid",
        ...style
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
        "div",
        {
          style: {
            ...getCardContainerStyle(themeValue, disableCard)
          },
          onMouseEnter: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.hover.boxShadow;
            e.currentTarget.style.transform = cardHover.hover.transform;
          },
          onMouseLeave: (e) => {
            if (disableCard) return;
            e.currentTarget.style.boxShadow = cardHover.rest.boxShadow;
            e.currentTarget.style.transform = cardHover.rest.transform;
          },
          children: [
            resolvedLayout === "classic" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(PlatformBranding, { provider: "Telegram", theme: dark ? "dark" : "light" }),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              "div",
              {
                style: {
                  width: "100%",
                  display: "flex",
                  justifyContent: alignmentStyles[embedAlignment]
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
                  "div",
                  {
                    ref: containerRef,
                    style: {
                      width,
                      maxWidth: maxWidth || "100%",
                      display: "flex",
                      justifyContent: "center",
                      boxSizing: "border-box"
                    }
                  }
                )
              }
            ),
            resolvedLayout === "modern" && showBranding && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(PlatformBranding, { provider: "Telegram", theme: dark ? "dark" : "light" }),
            showCTA && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
              "a",
              {
                href: url,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  ...ctaBaseStyle,
                  gap: 8,
                  justifySelf: ctaAlignment === "center" ? "center" : ctaAlignment === "right" ? "end" : "start",
                  backgroundColor: ctaUsePlatformColor ? PLATFORM_COLORS.telegram : ctaBaseStyle.backgroundColor,
                  borderColor: ctaUsePlatformColor ? PLATFORM_COLORS.telegram : ctaBaseStyle.borderColor,
                  color: ctaUsePlatformColor ? "#ffffff" : ctaBaseStyle.color
                },
                onMouseEnter: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.telegram;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.telegram;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.hover.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.hover.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.hover.transform;
                },
                onMouseLeave: (e) => {
                  if (ctaUsePlatformColor) {
                    e.currentTarget.style.backgroundColor = PLATFORM_COLORS.telegram;
                    e.currentTarget.style.borderColor = PLATFORM_COLORS.telegram;
                    e.currentTarget.style.color = "#ffffff";
                  } else {
                    e.currentTarget.style.backgroundColor = ctaHover.rest.backgroundColor;
                    e.currentTarget.style.borderColor = ctaHover.rest.borderColor;
                  }
                  e.currentTarget.style.transform = ctaHover.rest.transform;
                },
                children: [
                  ctaLabelIconPosition === "before" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(PlatformIcon, { platform: "telegram", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" }),
                  /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: ctaLabel }),
                  ctaLabelIconPosition === "after" && ctaLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(PlatformIcon, { platform: "telegram", size: 14, color: ctaIconColor, "aria-hidden": "true", focusable: "false" })
                ]
              }
            )
          ]
        }
      )
    }
  );
};

// src/components/SpotifyEmbed.tsx
var import_react23 = require("react");

// src/utils/spotify.ts
function isValidSpotifyUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("spotify.com");
  } catch {
    return false;
  }
}
function parseSpotifyUrl(url) {
  const defaultResult = {
    id: "",
    type: "track",
    // Default
    isValid: false,
    originalUrl: url
  };
  if (!isValidSpotifyUrl(url)) {
    return defaultResult;
  }
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((p) => p !== "");
    const cleanPathParts = pathParts.filter((part) => !part.match(/^intl-[a-z]{2}$/));
    if (cleanPathParts.length >= 2) {
      const type = cleanPathParts[0];
      const id = cleanPathParts[1];
      const allowedTypes = ["track", "album", "playlist", "artist", "show", "episode", "user"];
      if (allowedTypes.includes(type) && id) {
        return {
          id,
          type,
          isValid: true,
          originalUrl: url
        };
      }
    }
    if (pathParts[0] === "embed" && pathParts.length >= 3) {
      const type = pathParts[1];
      const id = pathParts[2] || "";
      if (id) {
        return {
          id,
          type,
          isValid: true,
          originalUrl: url
        };
      }
      return defaultResult;
    }
    return defaultResult;
  } catch {
    return defaultResult;
  }
}
function getSpotifyEmbedUrl(url, theme = "light") {
  const info = parseSpotifyUrl(url);
  if (!info.isValid) return null;
  const themeParam = theme === "dark" ? "&theme=0" : "";
  return `https://open.spotify.com/embed/${info.type}/${info.id}?utm_source=generator${themeParam}`;
}

// src/components/SpotifyEmbed.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
var SPOTIFY_COLOR = "#1DB954";
var SpotifyEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  height,
  theme = "light",
  showBranding = true,
  showCTA = true,
  ctaLabel = "Open in Spotify",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  constrainWidthByEmbed = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  cardLayout
}) => {
  const urlInfo = (0, import_react23.useMemo)(() => parseSpotifyUrl(url), [url]);
  const embedUrl = (0, import_react23.useMemo)(() => getSpotifyEmbedUrl(url, theme), [url, theme]);
  const defaultHeight = (0, import_react23.useMemo)(() => {
    if (height) return height;
    if (urlInfo.type === "track") return 152;
    return 352;
  }, [height, urlInfo.type]);
  if (!embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      EmbedCard,
      {
        provider: "Spotify",
        status: "error",
        statusMessage: "Invalid Spotify URL",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: {
          ...style,
          "--embed-accent": SPOTIFY_COLOR
        },
        layout: cardLayout
      }
    );
  }
  const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Spotify" : "",
      media: {
        type: "iframe",
        url: embedUrl,
        height: defaultHeight,
        aspectRatio: void 0,
        // We specify fixed height
        frame: false,
        rounded: true,
        iframeRadius: 12,
        background: theme === "dark" ? "#121212" : "#ffffff"
      },
      width: "100%",
      maxWidth: cardMaxWidth,
      disableCard,
      theme,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      href: linkBehavior !== "none" ? url : void 0,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      className,
      style: {
        ...style,
        "--embed-accent": SPOTIFY_COLOR
      },
      layout: cardLayout
    }
  );
};

// src/components/AppleMusicEmbed.tsx
var import_react24 = require("react");

// src/utils/appleMusic.ts
function isValidAppleMusicUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("music.apple.com");
  } catch {
    return false;
  }
}
function parseAppleMusicUrl(url) {
  const defaultResult = {
    id: "",
    type: "song",
    country: "",
    isValid: false,
    originalUrl: url
  };
  if (!isValidAppleMusicUrl(url)) return defaultResult;
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((p) => p !== "");
    if (pathParts.length >= 3) {
      const country = pathParts[0] || "";
      const typeRaw = pathParts[1] || "";
      let type = "song";
      const id = pathParts[pathParts.length - 1];
      type = typeRaw;
      const finalId = id || "";
      const songId = urlObj.searchParams.get("i");
      if (songId) {
        type = "song";
      }
      return {
        id: finalId,
        type,
        country,
        isValid: true,
        originalUrl: url
      };
    }
    return defaultResult;
  } catch {
    return defaultResult;
  }
}
function getAppleMusicEmbedUrl(url, theme = "light") {
  if (!isValidAppleMusicUrl(url)) return null;
  try {
    const urlObj = new URL(url);
    urlObj.hostname = "embed.music.apple.com";
    urlObj.searchParams.set("theme", theme);
    return urlObj.toString();
  } catch {
    return null;
  }
}

// src/components/AppleMusicEmbed.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var APPLE_MUSIC_COLOR = "#fa243c";
var AppleMusicEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  height,
  theme = "light",
  showBranding = true,
  showCTA = true,
  ctaLabel = "Listen on Apple Music",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  constrainWidthByEmbed = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  cardLayout
}) => {
  const urlInfo = (0, import_react24.useMemo)(() => parseAppleMusicUrl(url), [url]);
  const embedUrl = (0, import_react24.useMemo)(() => getAppleMusicEmbedUrl(url, theme), [url, theme]);
  const defaultHeight = (0, import_react24.useMemo)(() => {
    if (height) return height;
    if (urlInfo.type === "song") return 150;
    if (urlInfo.type === "album") return 450;
    if (urlInfo.type === "playlist") return 450;
    return 450;
  }, [height, urlInfo.type]);
  if (!embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      EmbedCard,
      {
        provider: "Apple Music",
        status: "error",
        statusMessage: "Invalid Apple Music URL",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: {
          ...style,
          "--embed-accent": APPLE_MUSIC_COLOR
        },
        layout: cardLayout
      }
    );
  }
  const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Apple Music" : "",
      media: {
        type: "iframe",
        url: embedUrl,
        height: defaultHeight
      },
      width: "100%",
      maxWidth: cardMaxWidth,
      disableCard,
      theme,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      href: linkBehavior !== "none" ? url : void 0,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      className,
      style: {
        ...style,
        "--embed-accent": APPLE_MUSIC_COLOR
      },
      layout: cardLayout
    }
  );
};

// src/components/DeezerEmbed.tsx
var import_react25 = require("react");

// src/utils/deezer.ts
function isValidDeezerUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("deezer.com");
  } catch {
    return false;
  }
}
function parseDeezerUrl(url) {
  const defaultResult = {
    id: "",
    type: "track",
    isValid: false,
    originalUrl: url
  };
  if (!isValidDeezerUrl(url)) return defaultResult;
  try {
    const urlObj = new URL(url);
    let pathParts = urlObj.pathname.split("/").filter((p) => p !== "");
    const firstPart = pathParts[0] || "";
    if (pathParts.length > 0 && firstPart.length === 2 && !["track", "album", "playlist", "artist"].includes(firstPart)) {
      pathParts.shift();
    }
    if (pathParts.length >= 2) {
      const type = pathParts[0] || "";
      const id = pathParts[1] || "";
      const allowedTypes = ["track", "album", "playlist", "artist", "podcast", "episode"];
      if (allowedTypes.includes(type)) {
        return {
          id,
          type,
          isValid: true,
          originalUrl: url
        };
      }
    }
    return defaultResult;
  } catch {
    return defaultResult;
  }
}
function getDeezerEmbedUrl(url, theme = "light") {
  const info = parseDeezerUrl(url);
  if (!info.isValid) return null;
  const themeSegment = theme === "dark" ? "dark" : "light";
  if (info.type === "artist") {
    return `https://widget.deezer.com/widget/${themeSegment}/artist/${info.id}/top_tracks`;
  }
  return `https://widget.deezer.com/widget/${themeSegment}/${info.type}/${info.id}`;
}

// src/components/DeezerEmbed.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var DEEZER_COLOR = "#ef5466";
var DeezerEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  height,
  theme = "light",
  showBranding = true,
  showCTA = true,
  ctaLabel = "Listen on Deezer",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  constrainWidthByEmbed = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  cardLayout
}) => {
  const urlInfo = (0, import_react25.useMemo)(() => parseDeezerUrl(url), [url]);
  const embedUrl = (0, import_react25.useMemo)(() => getDeezerEmbedUrl(url, theme), [url, theme]);
  const defaultHeight = (0, import_react25.useMemo)(() => {
    if (height) return height;
    if (urlInfo.type === "track") return 150;
    if (urlInfo.type === "album" || urlInfo.type === "playlist") return 380;
    return 300;
  }, [height, urlInfo.type]);
  if (!embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      EmbedCard,
      {
        provider: "Deezer",
        status: "error",
        statusMessage: "Invalid Deezer URL",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: {
          ...style,
          "--embed-accent": DEEZER_COLOR
        },
        layout: cardLayout
      }
    );
  }
  const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Deezer" : "",
      media: {
        type: "iframe",
        url: embedUrl,
        height: defaultHeight
      },
      width: "100%",
      maxWidth: cardMaxWidth,
      disableCard,
      theme,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      href: linkBehavior !== "none" ? url : void 0,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      className,
      style: {
        ...style,
        "--embed-accent": DEEZER_COLOR
      },
      layout: cardLayout
    }
  );
};

// src/components/TidalEmbed.tsx
var import_react26 = require("react");

// src/utils/tidal.ts
function isValidTidalUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("tidal.com");
  } catch {
    return false;
  }
}
function parseTidalUrl(url) {
  const defaultResult = {
    id: "",
    type: "track",
    isValid: false,
    originalUrl: url
  };
  if (!isValidTidalUrl(url)) return defaultResult;
  try {
    const urlObj = new URL(url);
    let pathParts = urlObj.pathname.split("/").filter((p) => p !== "");
    if (pathParts[0] === "browse") {
      pathParts.shift();
    }
    if (pathParts.length >= 2) {
      const type = pathParts[0];
      const id = pathParts[1] || "";
      const allowedTypes = ["track", "album", "playlist", "video", "artist"];
      if (allowedTypes.includes(type)) {
        return {
          id,
          type,
          isValid: true,
          originalUrl: url
        };
      }
    }
    return defaultResult;
  } catch {
    return defaultResult;
  }
}
function getTidalEmbedUrl(url) {
  const info = parseTidalUrl(url);
  if (!info.isValid) return null;
  if (info.type === "artist") {
    return null;
  }
  let embedType = info.type + "s";
  if (info.type === "video") embedType = "videos";
  return `https://embed.tidal.com/${embedType}/${info.id}`;
}

// src/components/TidalEmbed.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var TIDAL_COLOR = "#000000";
var TidalEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  height,
  theme = "light",
  showBranding = true,
  showCTA = true,
  ctaLabel = "Listen on Tidal",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  constrainWidthByEmbed = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  cardLayout
}) => {
  const urlInfo = (0, import_react26.useMemo)(() => parseTidalUrl(url), [url]);
  const embedUrl = (0, import_react26.useMemo)(() => getTidalEmbedUrl(url), [url]);
  const defaultHeight = (0, import_react26.useMemo)(() => {
    if (height) return height;
    if (urlInfo.type === "track") return 152;
    if (urlInfo.type === "album" || urlInfo.type === "playlist") return 352;
    return 300;
  }, [height, urlInfo.type]);
  const mediaAspectRatio = urlInfo.type === "video" ? "16/9" : void 0;
  if (!embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      EmbedCard,
      {
        provider: "Tidal",
        status: "error",
        statusMessage: urlInfo.type === "artist" ? "Tidal artist embeds are not supported yet" : "Invalid Tidal URL",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: {
          ...style,
          "--embed-accent": TIDAL_COLOR
        },
        layout: cardLayout
      }
    );
  }
  const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Tidal" : "",
      media: {
        type: "iframe",
        url: embedUrl,
        height: urlInfo.type === "video" ? void 0 : defaultHeight,
        aspectRatio: mediaAspectRatio
      },
      width: "100%",
      maxWidth: cardMaxWidth,
      disableCard,
      theme,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      href: linkBehavior !== "none" ? url : void 0,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      className,
      style: {
        ...style,
        "--embed-accent": TIDAL_COLOR
      },
      layout: cardLayout
    }
  );
};

// src/components/SoundCloudEmbed.tsx
var import_react27 = require("react");

// src/utils/soundcloud.ts
function isValidSoundCloudUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("soundcloud.com") || urlObj.hostname.includes("on.soundcloud.com");
  } catch {
    return false;
  }
}
function parseSoundCloudUrl(url) {
  const defaultResult = {
    type: "track",
    isValid: false,
    originalUrl: url
  };
  if (!isValidSoundCloudUrl(url)) return defaultResult;
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((p) => p !== "");
    if (pathParts.length >= 2 && pathParts[1] === "sets") {
      return {
        type: "playlist",
        isValid: true,
        originalUrl: url
      };
    }
    return {
      type: "track",
      isValid: true,
      originalUrl: url
    };
  } catch {
    return defaultResult;
  }
}
function getSoundCloudEmbedUrl(url, options) {
  if (!isValidSoundCloudUrl(url)) return null;
  const encodedUrl = encodeURIComponent(url);
  const color = options?.color ?? "ff5500";
  const autoPlay = options?.autoPlay ? "true" : "false";
  return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=${color}&auto_play=${autoPlay}&show_teaser=true`;
}

// src/components/SoundCloudEmbed.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var SOUNDCLOUD_COLOR = "#ff5500";
var SoundCloudEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  height,
  theme = "light",
  showBranding = true,
  showCTA = true,
  ctaLabel = "Listen on SoundCloud",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  constrainWidthByEmbed = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  autoPlay = false,
  cardLayout
}) => {
  const urlInfo = (0, import_react27.useMemo)(() => parseSoundCloudUrl(url), [url]);
  const embedUrl = (0, import_react27.useMemo)(
    () => getSoundCloudEmbedUrl(url, { autoPlay }),
    [url, autoPlay]
  );
  const defaultHeight = (0, import_react27.useMemo)(() => {
    if (height) return height;
    if (urlInfo.type === "playlist") return 450;
    return 166;
  }, [height, urlInfo.type]);
  if (!embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
      EmbedCard,
      {
        provider: "SoundCloud",
        status: "error",
        statusMessage: "Invalid SoundCloud URL",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: {
          ...style,
          "--embed-accent": SOUNDCLOUD_COLOR
        },
        layout: cardLayout
      }
    );
  }
  const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "SoundCloud" : "",
      media: {
        type: "iframe",
        url: embedUrl,
        height: defaultHeight
      },
      width: "100%",
      maxWidth: cardMaxWidth,
      disableCard,
      theme,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      href: linkBehavior !== "none" ? url : void 0,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      className,
      style: {
        ...style,
        "--embed-accent": SOUNDCLOUD_COLOR
      },
      layout: cardLayout
    }
  );
};

// src/components/ApplePodcastsEmbed.tsx
var import_react28 = require("react");

// src/utils/applePodcasts.ts
function isValidApplePodcastsUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("podcasts.apple.com");
  } catch {
    return false;
  }
}
function parseApplePodcastsUrl(url) {
  const defaultResult = {
    id: "",
    type: "show",
    country: "",
    isValid: false,
    originalUrl: url
  };
  if (!isValidApplePodcastsUrl(url)) return defaultResult;
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((p) => p !== "");
    if (pathParts.length >= 2) {
      const country = pathParts[0];
      const idMatch = urlObj.pathname.match(/\/id(\d+)/);
      const id = idMatch ? idMatch[1] : "";
      const episodeId = urlObj.searchParams.get("i");
      return {
        id: episodeId || id || "",
        type: episodeId ? "episode" : "show",
        country: country || "",
        isValid: true,
        originalUrl: url
      };
    }
    return defaultResult;
  } catch {
    return defaultResult;
  }
}
function getApplePodcastsEmbedUrl(url, theme = "light") {
  if (!isValidApplePodcastsUrl(url)) return null;
  try {
    const urlObj = new URL(url);
    urlObj.hostname = "embed.podcasts.apple.com";
    if (theme) {
      urlObj.searchParams.set("theme", theme);
    }
    return urlObj.toString();
  } catch {
    return null;
  }
}

// src/components/ApplePodcastsEmbed.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var APPLE_PODCASTS_COLOR = "#a24bdc";
var ApplePodcastsEmbed = ({
  url,
  width = "100%",
  maxWidth = "100%",
  height,
  theme = "light",
  showBranding = true,
  showCTA = true,
  ctaLabel = "Listen on Apple Podcasts",
  ctaLabelIcon = true,
  ctaLabelIconPosition = "before",
  ctaUsePlatformColor = false,
  ctaUsePlatformIconColor = false,
  disableCard = false,
  constrainWidthByEmbed = false,
  className,
  style,
  linkBehavior = "cta",
  linkTarget = "_blank",
  cardLayout
}) => {
  const urlInfo = (0, import_react28.useMemo)(() => parseApplePodcastsUrl(url), [url]);
  const embedUrl = (0, import_react28.useMemo)(() => getApplePodcastsEmbedUrl(url, theme), [url, theme]);
  const defaultHeight = (0, import_react28.useMemo)(() => {
    if (height) return height;
    if (urlInfo.type === "episode") return 175;
    return 450;
  }, [height, urlInfo.type]);
  if (!embedUrl) {
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      EmbedCard,
      {
        provider: "Apple Podcasts",
        status: "error",
        statusMessage: "Invalid Apple Podcasts URL",
        theme,
        width,
        maxWidth,
        disableCard,
        className,
        style: {
          ...style,
          "--embed-accent": APPLE_PODCASTS_COLOR
        },
        layout: cardLayout
      }
    );
  }
  const cardMaxWidth = constrainWidthByEmbed ? width : maxWidth;
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    EmbedCard,
    {
      provider: showBranding ? "Apple Podcasts" : "",
      media: {
        type: "iframe",
        url: embedUrl,
        height: defaultHeight
      },
      width: "100%",
      maxWidth: cardMaxWidth,
      disableCard,
      theme,
      ctaLabel,
      ctaLabelIcon,
      ctaLabelIconPosition,
      ctaUsePlatformColor,
      ctaUsePlatformIconColor,
      href: linkBehavior !== "none" ? url : void 0,
      linkBehavior,
      linkTarget,
      showBranding,
      showCTA,
      className,
      style: {
        ...style,
        "--embed-accent": APPLE_PODCASTS_COLOR
      },
      layout: cardLayout
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppleMusicEmbed,
  ApplePodcastsEmbed,
  ArchiveOrgEmbed,
  BilibiliEmbed,
  BlueskyEmbed,
  CardLayoutProvider,
  DailymotionEmbed,
  DeezerEmbed,
  EmbedCard,
  FacebookEmbed,
  InstagramEmbed,
  KickEmbed,
  LinkedInEmbed,
  MastodonEmbed,
  MediaPlayer,
  OdyseeEmbed,
  PinterestEmbed,
  PlatformIcon,
  RedditEmbed,
  RumbleEmbed,
  SoundCloudEmbed,
  SpotifyEmbed,
  TelegramEmbed,
  ThreadsEmbed,
  TidalEmbed,
  TikTokEmbed,
  TruthSocialEmbed,
  TumblrEmbed,
  TwitchEmbed,
  XEmbed,
  YouTubeEmbed
});
