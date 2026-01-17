import React from "react";
import { PlatformIcon, PlatformIconName } from "./PlatformIcons";

export const PROVIDER_TO_PLATFORM: Record<string, PlatformIconName> = {
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

export const PLATFORM_COLORS: Record<PlatformIconName, string> = {
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

export type PlatformBrandingProps = {
  provider: string;
  theme: "light" | "dark";
  iconSize?: number;
  hideProviderTitle?: boolean;
  icon?: React.ReactNode;
};

export function PlatformBranding({
  provider,
  theme,
  iconSize = 16,
  hideProviderTitle = false,
  icon
}: PlatformBrandingProps) {
  if (!provider) return null;
  const normalizedProvider = provider.toLowerCase().trim();
  const platformId = PROVIDER_TO_PLATFORM[normalizedProvider];
  const resolvedIcon = icon ?? (platformId ? (
    <PlatformIcon
      platform={platformId}
      size={iconSize}
      color={
        theme === "dark"
          ? "#ffffff"
          : platformId === "truthSocial"
            ? "currentColor"
            : PLATFORM_COLORS[platformId]
      }
      aria-label={provider}
    />
  ) : null);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
        opacity: 0.8
      }}
    >
      {resolvedIcon}
      {!hideProviderTitle && <span>{provider}</span>}
    </div>
  );
}
