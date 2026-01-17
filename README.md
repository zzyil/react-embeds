# react-social-embeds

[![npm version](https://img.shields.io/npm/v/react-social-embeds.svg)](https://www.npmjs.com/package/react-social-embeds)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)



Unified React components for embedding social media and streaming content. One component per platform with consistent styling, theming, and TypeScript support.

<a href="https://zzyil.github.io/react-embeds/" target="_blank" rel="noreferrer">▶️ Live Demo</a> | <a href="https://www.npmjs.com/package/react-social-embeds" target="_blank" rel="noreferrer">📦 npm</a> | <a href="https://github.com/zzyil/react-embeds" target="_blank" rel="noreferrer">⛓️‍💥 GitHub Repo</a>  

### <a href="https://x.com/listentovv" target="_blank" rel="noreferrer">Follow me on 𝕏</a>  

## Installation

```bash
npm install react-social-embeds
```

### Peer Dependencies

```bash
npm install react react-dom
# Optional - for HLS/DASH video streaming:
npm install hls.js dashjs
```

| Dependency | Version | Required |
|------------|---------|----------|
| react | ≥18 | Yes |
| react-dom | ≥18 | Yes |
| hls.js | ≥1.0 | No (for HLS streams) |
| dashjs | ≥4.0 | No (for DASH streams) |

## Quick Start

```tsx
import { YouTubeEmbed, XEmbed, SpotifyEmbed } from "react-social-embeds";

function App() {
  return (
    <div>
      <YouTubeEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
      <XEmbed url="https://x.com/elonmusk/status/123456789" theme="dark" />
      <SpotifyEmbed url="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" />
    </div>
  );
}
```

## Supported Platforms

### Social Media
| Component | Platform |
|-----------|----------|
| `XEmbed` | X (Twitter) |
| `InstagramEmbed` | Instagram |
| `FacebookEmbed` | Facebook |
| `ThreadsEmbed` | Threads |
| `BlueskyEmbed` | Bluesky |
| `MastodonEmbed` | Mastodon |
| `TruthSocialEmbed` | Truth Social |
| `LinkedInEmbed` | LinkedIn |
| `RedditEmbed` | Reddit |
| `TumblrEmbed` | Tumblr |
| `PinterestEmbed` | Pinterest |
| `TelegramEmbed` | Telegram |

### Video
| Component | Platform |
|-----------|----------|
| `YouTubeEmbed` | YouTube |
| `TikTokEmbed` | TikTok |
| `TwitchEmbed` | Twitch |
| `KickEmbed` | Kick |
| `RumbleEmbed` | Rumble |
| `DailymotionEmbed` | Dailymotion |
| `OdyseeEmbed` | Odysee |
| `BilibiliEmbed` | Bilibili |
| `ArchiveOrgEmbed` | Archive.org |

### Audio
| Component | Platform |
|-----------|----------|
| `SpotifyEmbed` | Spotify |
| `AppleMusicEmbed` | Apple Music |
| `ApplePodcastsEmbed` | Apple Podcasts |
| `SoundCloudEmbed` | SoundCloud |
| `DeezerEmbed` | Deezer |
| `TidalEmbed` | Tidal |

## Common Props

All embed components share these common props:

```tsx
interface CommonProps {
  url: string;                    // Required: Content URL
  theme?: "light" | "dark";       // Color theme (default: "light")
  width?: string | number;        // Container width
  maxWidth?: string | number;     // Maximum width
  showBranding?: boolean;         // Show platform branding (default: true)
  showCTA?: boolean;              // Show call-to-action button (default: true)
  ctaLabel?: string;              // CTA button text
  disableCard?: boolean;          // Remove card styling
  linkBehavior?: "card" | "title" | "cta" | "none";
  linkTarget?: "_blank" | "_self";
}
```

## Core Components

### EmbedCard

Base component used by all embeds. Use directly for custom embeds:

```tsx
import { EmbedCard } from "react-social-embeds";

<EmbedCard
  provider="Custom"
  title="My Custom Embed"
  author="Author Name"
  body="Description text"
  href="https://example.com"
  theme="dark"
  media={{ type: "image", url: "https://example.com/image.jpg" }}
/>
```

### MediaPlayer

Custom video player with HLS/DASH support:

```tsx
import { MediaPlayer } from "react-social-embeds";

<MediaPlayer
  src="https://example.com/stream.m3u8"
  poster="https://example.com/poster.jpg"
  autoPlay={false}
/>
```

Supports:
- Native video (MP4, WebM)
- HLS streams (.m3u8) via hls.js
- DASH streams (.mpd) via dashjs

## Theming

All components support light and dark themes:

```tsx
<YouTubeEmbed url={videoUrl} theme="dark" />
```

Use CSS variables for custom styling:

```css
.my-embed {
  --embed-accent: #ff6b6b;
  --embed-bg: #1a1a1a;
}
```

## Layout Modes

Control layout with the `CardLayoutProvider`:

```tsx
import { CardLayoutProvider, YouTubeEmbed } from "react-social-embeds";

<CardLayoutProvider layout="modern">
  <YouTubeEmbed url={url} />
</CardLayoutProvider>
```

Layouts: `"classic"` (metadata first) | `"modern"` (media first)

## TypeScript

All components export their prop types:

```tsx
import { YouTubeEmbed, YouTubeEmbedProps } from "react-social-embeds";
import { EmbedCardProps, MediaPlayerProps } from "react-social-embeds";
```

## License

MIT
